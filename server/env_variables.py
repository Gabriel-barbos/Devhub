import os 

from dotenv import find_dotenv, load_dotenv

dotenv_path = find_dotenv()

load_dotenv(dotenv_path)

DBPASSWORD = os.getenv("DBPASSWORD")
DBUSER = os.getenv("DBUSER")
DBCONNECTIONSTRING = os.getenv("DBCONNECTIONSTRING")
