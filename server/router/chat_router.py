from fastapi import APIRouter, Form, HTTPException, WebSocket
from datetime import datetime
from models.Message import Message
from db_config import messagesCollection as collection

chat_router = APIRouter(tags=['Chat'])

@chat_router.post("/chat/{username}/messages")
def create_message(username: str, from_user: str, content: str):
    try:
        message_dict = {
            "from_user": from_user,
            "to_user": username,
            "content": content,
            "datetime": datetime.utcnow()
        }
        result = collection.insert_one(message_dict)
        if result.inserted_id:
            created_message = collection.find_one({"_id": result.inserted_id})
            return {"message": "Mensagem criada"}
    except Exception as error:
            raise HTTPException(status_code=500, detail="A mensagem nao pode ser criada")
    

@chat_router.get("/chat/{from_username}/{to_username}/messages")
def get_messages(from_username: str, to_username: str):
    try:
        messages = collection.find({"$and": [{"from_user": from_username}, {"to_user": to_username}]}, {'_id': 0})
        result = []
        for message in messages:
            result.append(message)
        return result
    except Exception as error:
         raise HTTPException(status_code=500, detail="Ocorreu um erro ao buscar mensagens")
    
