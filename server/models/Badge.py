from typing import Optional
import uuid
from pydantic import BaseModel, EmailStr

class Badge (BaseModel):
    name: str


