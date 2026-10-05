from pydantic import Field,BaseModel
from typing import Annotated


class Token():
    jwt_token:Annotated[str,Field(title="JWT Token ", description="Token for authentication")]
    type:Annotated[str,Field(title="Bearer",description="Whoever holds this token will get the grant to access servcies")]="Bearer"