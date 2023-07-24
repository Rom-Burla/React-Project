import { toast } from "react-toastify";
import { removeUserAuth } from "../../auth/TokenManager";
import useAxios from "../../hooks/useAxios"
import { useNavigate } from "react-router-dom";

interface Props {
    forceUpdate: Function
    btnColor: string
}

function Logout({forceUpdate,btnColor}:Props){
    const navigate = useNavigate();
    const logOut=useAxios({
        method:'POST',
        url: 'user/logout',
        withCredentials: true
    })

    function handleClick(){
        logOut.sendData('','')
        if(logOut.response?.data){
          removeUserAuth()
          navigate('/')
          forceUpdate()
          toast.success(logOut.response.data)
        }
    }

    return(
        <>
        <button
         className={btnColor + ' fw-bolder text-decoration-none border-0 btn btn-link'}
         onClick={handleClick}
         >
            Logout
        </button>
        </>
    )
}

export default Logout