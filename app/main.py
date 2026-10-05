from fastapi import FastAPI,Request,Depends,HTTPException,Response
from app.services.otp import send_otp
from app.services.models import LoginRequest
from app.database import get_database
from pymongo import AsyncMongoClient
import os
from dotenv import load_dotenv
from fastapi.security import OAuth2PasswordBearer
from contextlib import asynccontextmanager
from app.services.jwt import JWTTokens





load_dotenv(override=True,dotenv_path="D:/Projects/AI Youtube Assistant/app/.env")





@asynccontextmanager
async def lifespan(app: FastAPI):

    client = AsyncMongoClient(
        os.getenv("MONGODB_URL")
    )
    
    app.state.mongo_client = client

    try:
        yield
    finally:
        await client.close()



app=FastAPI(title="AI Youtube Assistant",description="FARM Stack and Langchain based AI Assistant where user can chat with AI to get insights inside of an particular youtube video" ,version="1.0.0",lifespan=lifespan)

oauth2_scheme=OAuth2PasswordBearer(tokenUrl='/login')


async def get_database(request:Request):
    yield request.app.state.mongo_client["ai_youtube"]


@app.get('/')
def root():
    return {"Message":"Hello World"}



@app.post("/login")
async def login(user_data:LoginRequest,request:Request,response:Response,db=Depends(get_database)):
    user_email=user_data.email
    password=user_data.password

    user=await db['users'].find_one({'email':user_email})
    if not user or password!=user.get("password") :
        raise HTTPException(status_code=401,detail="User not found")
    token=JWTTokens()
    response.set_cookie(key="Token",value=token)
    return "Success"

   



@app.get('/otp')
def otp():
    send_otp("singharyan90827@gmail.com")
    return "OTP had sent"
