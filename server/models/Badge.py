from typing import List, Optional
import uuid
from pydantic import BaseModel, EmailStr

class Badge (BaseModel):
    name: str

class UpdateBadge(BaseModel):
    name: List[str]
