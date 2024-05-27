from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field
from pymongo import MongoClient
from bson.objectid import ObjectId
from typing import Optional
from datetime import datetime

class Message(BaseModel):
    id: Optional[str] = Field(alias="_id")
    from_user: str
    to_user: str
    content: str
    datetime: Optional[datetime] = None
    
class Config:
        allow_population_by_field_name = True
        json_encoders = {
            ObjectId: str,
            datetime: lambda dt: dt.isoformat() if dt else None,
        }