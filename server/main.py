from typing import Union
from fastapi import FastAPI
from router.routes import router
from cors import add_cors
from controllers.UserController import UserController

app = FastAPI()
app.include_router(router)
add_cors(app)

@router.get("/home")
def read_root():
    return {"Hello": "World"}

