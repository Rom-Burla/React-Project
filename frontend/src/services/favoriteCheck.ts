import { getUserAuth, setUserAuth } from "../auth/TokenManager";

function favoriteCheck(){
    if(getUserAuth()){
    const favorites = getUserAuth().favorites
    return favorites
    }
}
function deleteFavorite(id:string|undefined){
    const favorites = getUserAuth().favorites
    const index = favorites.indexOf(id)
    if(index>-1){
        favorites.splice(index,1)
    }
    const user = getUserAuth()
    setUserAuth(user.id,user.biz,user.admin,favorites,localStorage.getItem('tokenT') as string)
}

function addFavorite(id:string|undefined){
    const favorite = id
    const favorites = getUserAuth().favorites
    favorites.push(favorite)
    const user = getUserAuth()
    setUserAuth(user.id,user.biz,user.admin,favorites,localStorage.getItem('tokenT') as string)
    
    
}
export {favoriteCheck,deleteFavorite,addFavorite}