from fastapi import APIRouter
from models.User import User
from db_config import usersCollection
router = APIRouter()

@router.get("/")
def home():
    return {"bomdia": "gente"}


#* User Routes
@router.get("/users")
def get_all_users():
    return {"todos os usuarios": "eu"}

@router.post("/user")
def create_user(user: User):
    usersCollection.insert_one(dict(user))
    return {user.model_dump_json()}