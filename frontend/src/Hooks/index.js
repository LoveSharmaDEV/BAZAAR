import { useCallback, useContext, useEffect, useState } from "react";
import { AuthContext } from "../Providers/authContext";
import socket from "../API CHANGESTREAMS/socket";
import axios from 'axios';


export const useAuth = ()=>{
    return useContext(AuthContext);
}


export const useProvideAuth=()=>{
    const [user, setUser]= useState(null);
    const [authLoading,setAuthLoading] = useState(false);



    /*------------------------------------------------------HELPER FUNCTIONS------------------------------------------------------------------*/
    const updateAuthUser = useCallback(async ()=>{
        let response;
        const accessToken = localStorage.getItem('accessToken');
        const refreshToken = localStorage.getItem('refreshToken');
        setAuthLoading(true);
        response = await axios.post('http://localhost:8000/verify',{accessToken});
        setAuthLoading(false);
        if(response.data.response==="SUCCESS")
        {
            setUser(response.data.user);
            socket.socket.emit('loginUser',{user:response.data.user});
        }
        else
        {
            response = await axios.post('http://localhost:8000/refresh',{refreshToken});
            if(response.data.errCode==="SUCCESS")
            {
                setUser(response.data.user);
                localStorage.setItem('accessToken',response.data.accessToken);
                socket.socket.emit('loginUser',{user:response.data.user});
            }
        }
    },[setUser]) 
    /*------------------------------------------------------HELPER FUNCTIONS------------------------------------------------------------------*/

    useEffect(()=>{
        updateAuthUser();
    },[updateAuthUser])

    const login = async (loginInfo) =>
    {
        setAuthLoading(true);
        const data = await axios.post('http://localhost:8000/login', loginInfo);
        setAuthLoading(false);
        if(data.data.errCode==="TOKENSGENERATED"){
            setUser(data.data.user);
            socket.socket.emit('loginUser',{user:data.data.user});
            localStorage.setItem("accessToken", data.data.accessToken);
            localStorage.setItem("refreshToken", data.data.refreshToken);
        }
        return data.data
    }

    const logout=()=>
    {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        setUser('');
    }
    return{
        user,
        setUser,
        login,
        logout,
        updateAuthUser,
        authLoading,
        setAuthLoading
    }
}