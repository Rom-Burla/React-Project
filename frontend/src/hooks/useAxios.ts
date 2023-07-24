import { useState, useEffect } from 'react';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { toast } from 'react-toastify';

axios.defaults.baseURL = 'http://localhost:3000/';

const useAxios = (axiosParams: AxiosRequestConfig) => {
  const [response, setResponse] = useState<AxiosResponse>();
  const [loading, setLoading] = useState(axiosParams.method === "GET" || axiosParams.method === "get");

  const fetchData = async (params: AxiosRequestConfig, msg:string, errorMsg: string) => {
    try {
      const result = await axios.request(params);
      setResponse(result);
      if(params.method?.toLowerCase()!=='get'){
        if(msg!==''){
        toast.success(msg)
        }
      }
    } catch( err ) {
      console.log(err);
      
        if(axios.isAxiosError(err)){
        if(err.response?.data.code === 11000){
          if(errorMsg!==''){
            toast.error(errorMsg)
            }
        }else if(err.response?.status===409){
        toast.error(`Email is already in database please enter another email`)
      }else if(err.response?.status === 401){
        if(err.config?.url!=='user/token'){
          toast.error(`User is not logged in`)
          }
        }else if(err.response?.status===400){
          toast.error(err.response?.data)
        }else if(params.method?.toLowerCase()!=='get'){
      toast.error(err.message as string)
      }}
    } finally {
      setLoading(false);
    }
  };

  const sendData = (msg:string,duplicateMsg:string) => {
    if(axiosParams.method==='DELETE'|| axiosParams.method === "delete"){
      fetchData(axiosParams,msg,duplicateMsg).then(()=>fetchData({method:'get',url:'buisness-card',headers:{
        "Content-Type": 'application/json'
      }},msg,duplicateMsg))
    }
    else{
    fetchData(axiosParams,msg,duplicateMsg)
    }
  }

  useEffect(() => {
    if(axiosParams.method === "GET" || axiosParams.method === "get"){
      fetchData(axiosParams,'','');
    }
  },[]);

  return { response, loading, sendData };
}

export default useAxios;