from fastapi import APIRouter, File, UploadFile, HTTPException
from fastapi.responses import FileResponse
import os

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

# rotas imagens:
IMAGES_DIRECTORY = "imagens"

@app.post("/upload/")
async def upload_image(file: UploadFile = File(...)):
    if not os.path.exists(IMAGES_DIRECTORY):
        os.makedirs(IMAGES_DIRECTORY)

        file_path = os.path.join(IMAGES_DIRECCTORY, file.filename)
        with open(file_path, "wb") as image:
            image.writer(await file.read())
            
        return {"filename": file.filename}
    

@app.get("/images/{filename}")
async def get_image(filename: str):
    file_path = os.path.join(IMAGES_DIRECTORY, filename)
    if os.path.exists(file_path):
        return FileResponse(file_path)
    else:
        raise HTTPException(status_code=404, detail="Imagem não encontrada")

@app.delete("/images/{filename}")
async def delete_image(filename: str):
    file_path = os.path.join(IMAGES_DIRECTORY, filename)
    if os.path.exists(file_path):
        os.remove(file_path)
        return {"message": f"Imagem {filename} excluída com sucesso."}
    else:
        raise HTTPException(status_code=404, detail="Imagem não encontrada")   