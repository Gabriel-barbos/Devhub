from fastapi.middleware.cors import CORSMiddleware

origins = [
    "http://localhost:3000",
    "http://localhost:8000",
]

def add_cors(app):
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["POST"],
        allow_headers=["Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Origin"],
    )
