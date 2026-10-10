from fastapi import FastAPI,Request,Depends,HTTPException,Response
from fastapi.responses import RedirectResponse
from app.auth.otp import send_otp
from app.services.models import LoginRequest,SignRequesst,Otp
from app.database import get_database,get_redis
from pymongo import AsyncMongoClient
import os
from starlette.middleware.sessions import SessionMiddleware
from dotenv import load_dotenv
from contextlib import asynccontextmanager
from app.auth.jwt import JWTTokens
from fastapi.middleware.cors import CORSMiddleware
import redis.asyncio as redis
from app.services.pass_hash import hash_password,check_password
import secrets
# import base64
from datetime import datetime,timezone


load_dotenv(override=True,dotenv_path="D:/Projects/AI Youtube Assistant/app/.env")


@asynccontextmanager
async def lifespan(app: FastAPI):

    client = AsyncMongoClient(
        os.getenv("MONGODB_URL")
    )
    await client.admin.command("ping")
    app.state.mongo_client = client

    redisClient=redis.from_url(
        os.getenv("REDIS_URL"),decode_responses=True
    )
    await redisClient.ping()
    app.state.redis_client=redisClient

    try:
        yield
    finally:
        await redisClient.aclose()
        await client.close()



app=FastAPI(title="AI Youtube Assistant",description="FARM Stack and Langchain based AI Assistant where user can chat with AI to get insights inside of an particular youtube video" ,version="1.0.0",lifespan=lifespan)


origins=['http://localhost:5173',
         'http://localhost']


app.add_middleware(CORSMiddleware,
        allow_origins=origins,
        allow_methods=["*"],
        allow_credentials=True,
        allow_headers=["*"])

app.add_middleware(
    SessionMiddleware,
    secret_key=os.getenv("SECRET_KEY"),
    max_age=60
)


@app.get('/')
def root():
    return {"Message":"Hello World"}


@app.post('/register')
async def register(user_data:SignRequesst, request:Request,db=Depends(get_database),redis_client=Depends(get_redis)):
    user_email=user_data.email
    password=user_data.password
    temp_otp=send_otp(user_email)
    # user_secret="".join(str(secrets.randbelow(10)) for i in range(6))
    # request.session['user_secret']=user_secret
    request.session['get_email']=user_email
    await redis_client.hset(f"auth:{user_email}",mapping={'otp':temp_otp,"password":hash_password(password)})
    await redis_client.expire(f"auth:{user_email}",60)
    return "success"


@app.post("/login")
async def login(user_data:LoginRequest,request:Request,response:Response,db=Depends(get_database),redis_client=Depends(get_redis)):
    user_email=user_data.email
    password=user_data.password

    user=await db['users'].find_one({'email':user_email})
    dec_pass=check_password(password,user.get("password"))
    if not user or not dec_pass:
        raise HTTPException(status_code=401,detail="Invalid Credentails")
    request.session['get_email']=user_email
    await redis_client.hset(f"auth:{user_email}",mapping={"password":hash_password(password)})
    await redis_client.expire(f"auth:{user_email}",60)
    return "sucess"


@app.get('/get_tokens')
async def tokens(request:Request,response:Response,redis_client=Depends(get_redis)):
    session_email=request.session['get_email']
    if await redis_client.get("auth")==session_email:
        token=JWTTokens()
        response.set_cookie(key="Token",value=token,secure=False,samesite='lax')
        return "success"
    raise HTTPException(status_code=401,detail="Invalid Access")




@app.post('/otp')   
async def otp(request: Request,user_otp: Otp,redis_client=Depends(get_redis),db=Depends(get_database)):
    current_useremail = request.session["get_email"]
    redis_key = f"auth:{current_useremail}"
    redis_otp = await redis_client.hget(redis_key, "otp")

    user=await db['users'].find_one({'email':current_useremail})
    if user:
        raise HTTPException(status_code=401,detail="Users already exists")

    if user_otp.otp == redis_otp:
        current_password = await redis_client.hget(redis_key, "password")
        await db["users"].insert_one({
            "email": current_useremail,
            "password": current_password,
            "created_at":datetime.now(timezone.utc),
            "role": "user"
        })
        return "Sucess"
    raise HTTPException(status_code=401, detail="Invalid OTP")
