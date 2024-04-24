from typing import Optional
from pydantic import BaseModel, EmailStr


class User (BaseModel):
    username: str
    name: str
    email: EmailStr
    password: str
    imagePath: Optional[str]
    bio: Optional[str]

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class Token(BaseModel):
    acess_token:str
    token_type:str

class TokenData(BaseModel):
    username: str | None = None
    