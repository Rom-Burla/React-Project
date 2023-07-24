import jwt_decode,{ JwtPayload } from "jwt-decode";

const tokenKey = 'userAuth'

const setUserAuth = (id:string,biz:boolean,admin:boolean,favorites:string[],token:string)=>{
    if(id){
        const timeStamp = Date.now()
        const userAuth = {
            id,biz,admin,favorites,initial:timeStamp,expiry: timeStamp + 1000*60*60*24*1
        }
        localStorage.setItem(tokenKey,JSON.stringify(userAuth))
    }
    localStorage.setItem('jwt',token)
}

const getUserAuth = ()=>{
    const token = localStorage.getItem(tokenKey)
    return JSON.parse(token as string)
}
const getJwt=()=>{
      const token:string|null = localStorage.getItem('jwt')
      let decoded
      if(token){
    decoded = jwt_decode<JwtPayload>(token as string)
    }
    return decoded
}
const removeUserAuth=()=>{
    localStorage.removeItem(tokenKey)
    localStorage.removeItem('jwt')
}

export {setUserAuth, getUserAuth,removeUserAuth}
