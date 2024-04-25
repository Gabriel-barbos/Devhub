from typing import Union
from fastapi import FastAPI
from router.routes import router
from cors_config import add_cors


app = FastAPI()
app.include_router(router)
add_cors(app)

@router.get("/home")
def read_root():
    return {"Hello": "World"}


@app.get("/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}

