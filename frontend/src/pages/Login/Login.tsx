import { FormEvent, useCallback, useEffect, useState } from "react";
import Title from "../../components/Title";
import useAxios from "../../hooks/useAxios";
import { loginValidation } from "../../types/User";
import { useNavigate } from "react-router-dom";
import './Login.css'
import { setUserAuth } from "../../auth/TokenManager";

interface Props{
  forceUpdate:Function
}


function Login({forceUpdate}:Props) {
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const navigate = useNavigate()
const { response, sendData } = useAxios({
  method: "POST",
  url: "user/login",
  headers: {
    "Content-Type": "application/json",
  },
  data: { email, password },
  withCredentials: true,
});

   function handleBack(event: { preventDefault: () => void }) {
     event.preventDefault();
     navigate("/");
   }

function handleClean(){
  setEmail('')
  setPassword('')
}

function handleClick(e:FormEvent){
  e.preventDefault()
  if(!loginValidation(email,password,response)){
    return
  }
    sendData(
      `User with email ${email} logged in succesfully`,
      `There was an error while trying to login`
    )
}

useEffect(()=>{
  setUserAuth(
    response?.data.user._id,
    response?.data.user.biz,
    response?.data.user.admin,
    response?.data.user.favorites,
    response?.data.token
  );
  console.log(response);
  
  if(response?.data.user._id){
    navigate('/')
    forceUpdate()
  }
},[response?.data.user._id])

  return (
    <>
      <Title text="Login" />
      <form className="p-4">
        <div
          className="pb-2"
          style={{ width: "97.5%"}}
        >
          <input
            className="form-control mx-3"
            type="email"
            placeholder="test@gmail.com *"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div
          className="pb-2"
          style={{ width: "97.5%"}}
        >
          <input
            className="form-control mx-3"
            type="password"
            placeholder="Password *"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="d-flex pb-2">
          <input
            className="form-control mx-3"
            style={{ cursor: "pointer" }}
            placeholder="CANCEL"
            onClick={handleBack}
          />
          <div
            className="form-control mx-3 refresh"
            onClick={handleClean}
            style={{ cursor: "pointer" }}
          >
            <i className="bi bi-arrow-repeat"></i>
          </div>
        </div>
        <div className="d-flex pb-3">
          <button
            className="btn btn-primary form-control mx-3"
            onClick={handleClick}
          >Submit</button>
        </div>
      </form>
    </>
  );
  
    
}

export default Login