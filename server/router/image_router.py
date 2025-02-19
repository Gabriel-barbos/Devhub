
from fastapi import APIRouter,status, HTTPException,FastAPI, File, UploadFile, Depends

from db_config import usersCollection
from controllers.UserController import UserController

import random
from fastapi.responses import FileResponse
import os

app = FastAPI()



image_router = APIRouter(tags=['Image'])


# rotas imagens:
IMAGES_DIRECTORY = "imagens"
@image_router.put("/images/update")
async def upload_image(file: UploadFile = File(...), current_user: str = Depends(UserController.get_current_user)):
    if not os.path.exists(IMAGES_DIRECTORY):
        os.makedirs(IMAGES_DIRECTORY)
    
    filename = f"{random.randint(373, 373773)}{random.randint(373, 373773)}{file.filename}"

    file_path = os.path.join(IMAGES_DIRECTORY, filename)
    with open(file_path, "wb") as image:
        image.write(await file.read())


    insert = usersCollection.find_one_and_update({'email': current_user['email']},{"$set": {'imagePath':filename}})

    if not insert:
        return HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Erro ao atualizar imagem de perfil")
    return filename





@image_router.get("/images/{filename}")
async def get_image(filename: str,current_user: str = Depends(UserController.get_current_user)):
    file_path = os.path.join(IMAGES_DIRECTORY, filename)
    if os.path.exists(file_path):
        return FileResponse(file_path)
    else:
        raise HTTPException(status_code=404, detail="Imagem não encontrada")

@image_router.delete("/images/{filename}")
async def delete_image(filename: str):
    file_path = os.path.join(IMAGES_DIRECTORY, filename)
    if os.path.exists(file_path):
        os.remove(file_path)
        return {"mensagem": f"Imagem {filename} excluída com sucesso."}
    else:
        raise HTTPException(status_code=404, detail="Imagem não encontrada")
