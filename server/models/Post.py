from typing import Optional
from pydantic import BaseModel, EmailStr
from datetime import datetime

class Post (BaseModel):
    content: str
    media: Optional[str] = None
    author_username: Optional[str]=None
    countLikes: Optional[int]= None
    created_at: Optional[datetime]= None

class Article (BaseModel):
    author_username: str
    content: Optional[str] = None
    media: Optional[str]=None
    created_at: Optional[datetime]= None

class UpdatePost(BaseModel):
    author_username: str
    created_at: datetime
    content: str
    media: str
