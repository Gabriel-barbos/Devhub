from typing import Optional
from pydantic import BaseModel, EmailStr
from datetime import datetime

class User (BaseModel):
    username: str
    name: str
    email: EmailStr
    password: str
    imagePath: Optional[str] = None
    bio: Optional[str] = None

class UserLogin(BaseModel):
    username: EmailStr
    password: str

class UpdateUserInfo(BaseModel):
    name: Optional[str]  = None
    bio: Optional[str] = None


class UpdateUserCredentials(BaseModel):
    email: EmailStr
    password: str

# Esqueci a senha
class ForgotPassword(BaseModel):
    email: EmailStr

class ResetCode(BaseModel):
    email: EmailStr
    reset_code: str
    status: bool
    expired_in: Optional[datetime] = None