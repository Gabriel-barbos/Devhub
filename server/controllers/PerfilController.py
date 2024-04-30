from fastapi import HTTPException
from pydantic import BaseModel
from pymongo import MongoClient, ReturnDocument
from utils.util import hash

client = MongoClient("mongodb://localhost:27017")
db = client.devhub
usersCollection = db['users']

class PerfilController:
    class PasswordChange(BaseModel):
        email: str
        current_password: str
        new_password: str
    async def change_password(password_change: PasswordChange):
        email = password_change.email
        current_password = password_change.current_password
        new_password = password_change.new_password

        user = usersCollection.find_one({"email": email})
        print(user)

        if not user:
            raise HTTPException(status_code=404, detail="Email não registrado.")

        if user["password"] != hash(current_password):
            raise HTTPException(status_code=400, detail=f"Senha atual incorreta.")
        
        result = usersCollection.find_one_and_update(
            {"email": email},
            {"$set": {"password": hash(new_password)}},
        )

        # raise HTTPException(status_code=404, detail="Email não registrado.")
        return email

