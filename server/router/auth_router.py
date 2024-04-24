from fastapi import APIRouter, Depends, status, HTTPException, Response
from models.User import UserLogin, User
from db_config import usersCollection
from bson import ObjectId

router  = APIRouter(tags=['Authentication'])

