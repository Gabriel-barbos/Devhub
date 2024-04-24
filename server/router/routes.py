import random
from fastapi import APIRouter
from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.responses import FileResponse
import os
app = FastAPI()

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
def create_user(user: User, avatar: UploadFile = File(...)):
    usersCollection.insert_one(dict(user))
    
    return {user.model_dump_json()}

# rotas imagens:
IMAGES_DIRECTORY = "imagens"

async def upload_image(file: UploadFile = File(...)):
    if not os.path.exists(IMAGES_DIRECTORY):
        os.makedirs(IMAGES_DIRECTORY)

    filename = f"{random.randint(373, 373773)}{random.randint(373, 373773)}{file.filename}"

    file_path = os.path.join(IMAGES_DIRECTORY, filename)
    with open(file_path, "wb") as image:
        image.write(await file.read())

    return filename

@router.get("/images/{filename}")
async def get_image(filename: str):
    file_path = os.path.join(IMAGES_DIRECTORY, filename)
    if os.path.exists(file_path):
        return FileResponse(file_path)
    else:
        raise HTTPException(status_code=404, detail="Imagem não encontrada")

@router.delete("/images/{filename}")
async def delete_image(filename: str):
    file_path = os.path.join(IMAGES_DIRECTORY, filename)
    if os.path.exists(file_path):
        os.remove(file_path)
        return {"menssagem": f"Imagem {filename} excluída com sucesso."}
    else:
        raise HTTPException(status_code=404, detail="Imagem não encontrada")