from pydantic import Field,BaseModel,EmailStr,HttpUrl
from typing import Annotated


class Token(BaseModel):
    jwt_token:Annotated[str,Field(title="JWT Token ", description="Token for authentication")]
    type:Annotated[str,Field(title="Bearer",description="Whoever holds this token will get the grant to access servcies")]="Bearer"


class LoginRequest(BaseModel):
    email:Annotated[EmailStr,Field(title="Valid user email")]
    password:Annotated[str,Field(title="User Password")]

class SignRequesst(BaseModel):
    email:Annotated[EmailStr,Field(title="Valid user email")]
    password:Annotated[str,Field(title="User Password")]

class Otp(BaseModel):
    otp:Annotated[str,Field(title="OTP digits",min_length=6,max_length=6)]


class Url(BaseModel):
    url:Annotated[HttpUrl,Field(title="Youtube url")]


class ChatQue(BaseModel):
    question:Annotated[str,Field(title="Question from users")]