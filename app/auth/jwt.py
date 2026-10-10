from jose import jwt 
from dotenv import load_dotenv
import os 
from fastapi import HTTPException
from datetime import datetime,timezone,timedelta
from app.services.models import Token




class JWTTokens():
    def __init__(self):
        self.SECRET_KEY=os.getenv("SECRET_KEY")
        self.ALGO="HS256"

    def encode(self,user_id):
        token=jwt.encode({"sub":user_id , "exp":datetime.now(timezone.utc)+timedelta(minutes=10),"iat":datetime.now(timezone.utc)} , self.SECRET_KEY,algorithm=self.ALGO)
        return token

    def decode(self,token:Token):
        payload=jwt.decode(token,self.SECRET_KEY,algorithms=self.ALGO)
        return payload.get('sub')