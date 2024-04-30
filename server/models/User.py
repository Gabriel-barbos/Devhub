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

class UpdateUser(BaseModel):
    username: Optional[str]
    name: Optional[str]
    email: Optional[EmailStr]
    password: Optional[str]
    imagePath: Optional[str] = None
    bio: Optional[str] = None

# Esqueci a senha
class ForgotPassword(BaseModel):
    email: EmailStr

class ResetCode(BaseModel):
    email: EmailStr
    reset_code: str
    status: bool
    expired_in: Optional[datetime] = None