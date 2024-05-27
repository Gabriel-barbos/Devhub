from fastapi import APIRouter,requests, HTTPException,FastAPI, Depends, status,File, UploadFile
from fastapi.middleware.cors import CORSMiddleware

from pydantic import BaseModel

@chat_router.post('/chat/{username}/messages')
async def create_message(username: str, from_username: str, to_username: str, content: str):
    # aqui a lógica de registrar mensagens no banco de dados
    # depois fazer a lógica dos sockets
