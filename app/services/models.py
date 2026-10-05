from pydantic import Field,BaseModel,EmailStr
from typing import Annotated


class Token(BaseModel):
    jwt_token:Annotated[str,Field(title="JWT Token ", description="Token for authentication")]
    type:Annotated[str,Field(title="Bearer",description="Whoever holds this token will get the grant to access servcies")]="Bearer"


class LoginRequest(BaseModel):
    email:Annotated[EmailStr,Field(title="Valid user email")]
    password:Annotated[str,Field(title="User Password")]

