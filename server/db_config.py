
from env_variables import DBCONNECTIONSTRING
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi

# Create a new client and connect to the server
client = MongoClient("mongodb://localhost:27017", server_api=ServerApi('1'))

db = client.devhub

usersCollection = db['users']
codesCollection = db['codes']
postsCollection = db['posts']
badgesCollection = db['badges']

# Send a ping to confirm a successful connection
try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(e)








