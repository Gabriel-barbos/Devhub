from typing import Optional, List
from pydantic import BaseModel, EmailStr
from datetime import datetime





class Post (BaseModel):
    content: str
    media: Optional[str] = None
    author_username: Optional[str] =None
    likes: List[Optional[str]] = None
    likes_count: Optional[int] = 0
    countComments: Optional[int] = 0
    created_at: Optional[datetime]= None
    reply_to: Optional[str] = None


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
