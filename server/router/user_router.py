
from fastapi import APIRouter, HTTPException,FastAPI, Depends, status,File, UploadFile
from models.User import User, UpdateUserInfo, UpdateUserCredentials
from utils.util import hash

from db_config import usersCollection
from serializer.user_serializer import convertUser, convertUsers
from bson import ObjectId
from controllers.UserController import UserController
app = FastAPI()

user_router = APIRouter(tags=['User'])

@user_router.get("/")
def home():
    return {"bomdia": "gente"}


#* User Routes
@user_router.get("/users")
def get_all_users():
    try:
        users = usersCollection.find()
        convertedUsers = convertUsers(users)

        if convertedUsers == []:
             raise HTTPException(status_code=500, detail="Nenhum usuário adicionado")
             
        return {"data": convertedUsers}
    except HTTPException as error:
         raise error
    

@user_router.get("/user/{username}")
def get_one_user(username: str):
    try:
        user = usersCollection.find_one({'username': username})

        if not user:
            return HTTPException(status_code=401, detail="Usuário não encontrado")
        
        convertedUser = convertUser(user)
        return {
             "message":"Usuário encontrado",
             "data" : convertedUser}
    except HTTPException(status_code=500, detail="Ocorreu um erro inesperado") as error:
         return error


@user_router.post("/user/register")
def register_user(user: User):
    try:
        #* Converter lista de Badges (Objetos) em um dicionario python 
        if user.badges != None:
             convertedBadgeList = []
             for badge in user.badges:
                convertedBadgeList.append(dict(badge))
             user.badges = convertedBadgeList
        

        if UserController.email_exists(user.email):
            return HTTPException(status_code=404, detail="Email já cadastrado")
        
        if UserController.username_exists(user.username):
            return HTTPException(status_code=404, detail="Username já cadastrado")
        
        #* hashing password
        user.password = hash(user.password)

        insert = usersCollection.insert_one(dict(user))
        if not insert:
            raise HTTPException(status_code=500, detail="Erro ao inserir")
        
        return HTTPException(status_code=201, detail="Usuario cadastrado com sucesso")
    except HTTPException(status_code=500, detail="Ocorreu um erro ao registrar usuário") as error:
        return error

#* Atualizar name, bio
@user_router.put("/user/update/{id}")
def update_user_info(id: str,user:UpdateUserInfo,current_user: str = Depends(UserController.get_current_user)):
        print(user)
        userUpdated = usersCollection.find_one_and_update({"_id": ObjectId(current_user["_id"])}, {"$set" : dict(user)})
        if not userUpdated:
            raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Erro ao atualizar informações")
        return HTTPException(status_code=200, detail="Atualizado com sucesso")


#* Atualizar email, senha
@user_router.put("/user/update-credentials/{id}")
def update_user_credentials(id: str,user:UpdateUserCredentials,current_user: str = Depends(UserController.get_current_user)):
        userUpdated = usersCollection.find_one_and_update({"_id": ObjectId(id)}, {"$set" : dict(user)})
        
        if not userUpdated:
            raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Erro ao atualizar credenciais")
        return HTTPException(status_code=200, detail="Atualizado com sucesso")


@user_router.delete("/user/delete/{id}")
def delete_user(id:str,current_user: str = Depends(UserController.get_current_user)):
   
     delete_user = usersCollection.find_one_and_delete({"_id":ObjectId(id)})
 
     if not delete_user:
         return HTTPException(status_code=500, detail="Erro ao deletar usuário")
     return {"message": "Usuário deletado com sucesso!"}


@user_router.get("/user/followers/")
def get_followers(current_user = Depends(UserController.get_current_user)):
    try:
        #* Busca o usuário pelo ID
        user = current_user
        if not user:
            raise HTTPException(status_code=404, detail="User not found")

        if user['followers'] == []:
                return HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Você ainda não segue ninguém!")
        
        return user['followers']
    except:
        return HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Ocorreu um erro inesperado ao consultar seguidores")


@user_router.post("/user/add-follow/{idFollow}")
# * idFollow é o usuário q o current_user quer seguir
def follow(idFollow:str, current_user:str = Depends(UserController.get_current_user)):
    try:
        id = str(current_user['_id'])
        if idFollow == id:
            return HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                                detail="Você não pode se seguir")


        user = current_user

        #* Pegar os seguidores atuais no banco de dados e inserir o novo
        followingList = []
        if user['following'] != None:
            for follow in user['following']:
                if follow == idFollow:
                    return HTTPException(status_code=status.HTTP_406_NOT_ACCEPTABLE, detail="Usuário já está adicionado")
                followingList.append(follow)
        
        followingList.append(idFollow)

        updatedUser =  usersCollection.find_one_and_update({"_id": ObjectId(current_user['_id'])}, {"$set":{"following":followingList}})

        if not updatedUser:
            return HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                                detail="Erro ao adicionar seguidor")
        

        # * Atualizar lista de seguidores do USUÁRIO QUE FOI SEGUIDO (idFollow)
        userFollowed = usersCollection.find_one({"_id":ObjectId(idFollow)})
        userFollowedFollowersList = []

        if userFollowed['followers'] != [] and userFollowed['followers'] != None:
            for followerId in userFollowed['followers']:
                userFollowedFollowersList.append(followerId)

        userFollowedFollowersList.append(str(current_user['_id']))

        userFollowedUpdate = usersCollection.find_one_and_update({"_id": ObjectId(idFollow)}, {"$set":{"followers":userFollowedFollowersList}})
        if not userFollowedUpdate:
            return HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                                detail="Erro inesperado")
        

        return HTTPException(status_code=status.HTTP_200_OK,
                                detail="Seguidor adicionado!")
    except:
         return HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                                detail="Ocorreu um erro inesperado ao adicionar seguidor")
    

@user_router.post("/user/remove-follower/{idFollower}")
# * idFollower é a pessoa que o current user vai deixar de seguir
def unfollow(idFollower:str, current_user:str = Depends(UserController.get_current_user)):
    try:
                        #  * Retira um seguidor da lista do current user

        if current_user['following'] == []:
            return HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Nenhum seguidor para ser removido")
        
        #* Pegar os seguidores atuais no banco de dados e remover o que bate com o id atual
        currentUserFollowerList = []
        for follow in current_user['following']:
            currentUserFollowerList.append(follow)

        for follow in currentUserFollowerList:
            if follow == idFollower:
                currentUserFollowerList.remove(follow)


        updatedUser =  usersCollection.find_one_and_update({"_id": ObjectId(current_user['_id'])}, {"$set":{"following":currentUserFollowerList}})
        if not updatedUser:
            return HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Erro ao remover seguidor!")
        
        # * Atualizar lista de seguidores do USUÁRIO QUE NÃO É MAIS SEGUIDO (idFollower)
        userFollowed = usersCollection.find_one({"_id":ObjectId(idFollower)})

        followedUserList = []
        for followId in userFollowed['followers']:
            followedUserList.append(followId)

        for followId in followedUserList:
            if followId == str(current_user["_id"]):
                followedUserList.remove(followId)
        

        userFollowedUpdate = usersCollection.find_one_and_update({"_id": ObjectId(idFollower)}, {"$set":{"followers":followedUserList}})
        if not userFollowedUpdate:
            return HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                                detail="Erro inesperado")
        return HTTPException(status_code=status.HTTP_202_ACCEPTED, detail="Seguidor removido com sucesso!")
    except:
        return HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Erro inesperado ao remover seguidor")

@user_router.get("/feed")
# * O feed retorna todos os posts dos usuários q ele segue
def feed(current_user: str = Depends(UserController.get_current_user)):
    print(current_user)
    print("=================================")
    if current_user["following"] == None or current_user["following"] == []:
        return "sem seguidores"
    
    return "oi"