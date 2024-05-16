from fastapi import APIRouter,requests, HTTPException,FastAPI, Depends, status,File, UploadFile
from fastapi.middleware.cors import CORSMiddleware

from pydantic import BaseModel


chat_router = APIRouter(tags=['Chat'])

PRIVATE_KEY = "3ed0751a-b5ae-4b2c-8b6f-109afc5818b2"

class User(BaseModel):
    username: str
    password: str
    name: str

@chat_router.post('/authenticate')
async def authenticate(user: User):
    response = requests.put('https://api.chatengine.io/users/',
        data={
            "username": user.username,
            "secret": user.password,
            "first_name": user.name,
        },
        headers={ "Project-ID": PRIVATE_KEY }
    )
    return response.json()
