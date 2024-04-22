# def create_server_connection(connection_string, db_name, collection_name):
#    client = MongoClient(connection_string)
#    return client[db_name][collection_name]

# connection = create_server_connection("mongodb://localhost:27017", "devhub", "user");


# userCollection = connection['user']
from env_variables import DBCONNECTIONSTRING
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi

# Create a new client and connect to the server
client = MongoClient(DBCONNECTIONSTRING, server_api=ServerApi('1'))

db = client.devhub

usersCollection = db['users']

# Send a ping to confirm a successful connection
try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(e)








