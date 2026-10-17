from fastapi import FastAPI,Request,Depends,HTTPException,Response,APIRouter
from fastapi.responses import RedirectResponse
from app.auth.otp import send_otp
from app.services.models import LoginRequest,SignRequesst,Otp,Url
from app.services.youtube import has_transcript
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
from urllib.parse import urlparse, parse_qs
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
async def login(user_data: LoginRequest,response: Response,db=Depends(get_database)):
    user_email = user_data.email
    password = user_data.password
    user = await db["users"].find_one({"email": user_email})
    if not user or not check_password(password, user.get("password")):
        raise HTTPException(
            status_code=401,
            detail="Invalid credentials"
        )
    token = JWTTokens() 
    jwt=token.encode(user_email)
    response.set_cookie(
        key="Token",value=jwt,httponly=True,secure=False,samesite="lax"
    )

    return {"message": "Login successful"}
    

@app.post('/otp')   
async def otp(response:Response,request: Request,user_otp: Otp,redis_client=Depends(get_redis),db=Depends(get_database)):
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
        token = JWTTokens() 
        jwt=token.encode(current_useremail)
        response.set_cookie(
            key="Token",value=jwt,httponly=True,secure=False,samesite="lax"
        )

        return {"message": "Login successful"}
        
    raise HTTPException(status_code=401, detail="Invalid OTP")


@app.get("/auth")
async def check_auth(request: Request,db=Depends(get_database)):
    jwt = request.cookies.get("Token")

    if not jwt:
        raise HTTPException(status_code=401, detail="Not authenticated")

    # Verify JWT signature and expiration here
    token=JWTTokens()
    payload = token.decode(jwt)
    user=await db['users'].find_one({'email':payload})
    if user:
        return  {"authenticated": True, "user": payload}

    raise HTTPException(status_code=401,detail='Invalid JWT Token')


@app.post("/youtube/check-transcript")
async def check_transcript(yt_url:Url,request:Request):
    url=str(yt_url.url)
    print(url)
    parsed = urlparse(str(url))
    if parsed.hostname in ("youtube.com", "www.youtube.com", "m.youtube.com"):
        video_id= parse_qs(parsed.query).get("v", [None])[0]

    elif parsed.hostname == "youtu.be":
        video_id= parsed.path.lstrip("/").split("/")[0] or None

    else:
        raise HTTPException(status_code=401,detail="Invalid url")

    return has_transcript(video_id)
    


