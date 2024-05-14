
from env_variables import DBCONNECTIONSTRING
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from serializer.badge_serializer import convertBadge,convertBadges
# Create a new client and connect to the server
client = MongoClient("mongodb://localhost:27017/", server_api=ServerApi('1'))

db = client.devhub

usersCollection = db['users']
codesCollection = db['codes']
postsCollection = db['posts']
badgesCollection = db['badges']
mylist = [
  { "_id": 1,"name": "JavaScript", "imagePath": "Apple st 652"},
  { "_id": 2,"name": "React", "imagePath": "Mountain 21"},
  { "_id": 3,"name": "PHP", "imagePath": "Valley 345"},
  { "_id": 4,"name": "SQL", "imagePath": "Ocean blvd 2"},
  { "_id": 5,"name": "NOSQL", "imagePath": "Green Grass 1"},
  { "_id": 6,"name": "PYTHON", "imagePath": "Sky st 331"},
  { "_id": 7,"name": "RUBY", "imagePath": "One way 98"},
  { "_id": 8,"name": "C", "imagePath": "Yellow Garden 2"},
  { "_id": 9,"name": "C#", "imagePath": "Park Lane 38"},
  { "_id": 10,"name": "C++", "imagePath": "Central st 954"},
  { "_id": 11,"name": "JAVA", "imagePath": "Main Road 989"},
  { "_id": 12,"name": "LARAVEL", "imagePath": "Sideway 1633"}
]
 
# Inserir badges predefinidos se não existirem
try:
   teste = badgesCollection.find()
   teste = convertBadges(teste)
   if not teste:
      x = badgesCollection.insert_many(mylist)
except:
    "deu ruim"

 

# Send a ping to confirm a successful connection
try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(e)








