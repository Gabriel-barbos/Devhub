from typing import Union
from fastapi import FastAPI
from router.user_router import user_router
from router.image_router import image_router
from router.auth_router import auth_router
from router.post_router import post_router
from cors import add_cors
from controllers.UserController import UserController

app = FastAPI()
app.include_router(user_router)
app.include_router(post_router)
app.include_router(image_router)
app.include_router(auth_router)
add_cors(app)


