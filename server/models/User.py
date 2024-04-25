from typing import Optional
from pydantic import BaseModel, EmailStr


class User (BaseModel):
    username: EmailStr
    name: str
    email: EmailStr
    password: str
    imagePath: Optional[str] = None
    bio: Optional[str] = None

class UserLogin(BaseModel):
    username: EmailStr
    password: str

class Token(BaseModel):
    acess_token:str
    token_type:str

class TokenData(BaseModel):
    username: str | None = None
    