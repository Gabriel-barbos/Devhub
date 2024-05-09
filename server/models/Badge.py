from typing import List, Optional
import uuid
from pydantic import BaseModel, EmailStr

class Badge (BaseModel):
    id: int
    name: str
    imagePath: Optional[str] = None

class UpdateBadge(BaseModel):
    name: List[str]
