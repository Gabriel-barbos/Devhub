from typing import Union
from fastapi import FastAPI
from router.user_router import user_router
from router.image_router import image_router
from cors import add_cors
from controllers.UserController import UserController

app = FastAPI()
app.include_router(user_router)
app.include_router(image_router)
add_cors(app)


