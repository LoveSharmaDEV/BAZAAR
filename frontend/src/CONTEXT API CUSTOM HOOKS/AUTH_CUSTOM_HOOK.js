import { useCallback, useContext, useEffect, useState } from "react";
import { AuthContext } from "../CONTEXT API/AUTH_CONTEXT";
import axios from 'axios';
import { AUTH_API } from "../MasterData/GlobalData";


export const useAuth = ()=>{
    return useContext(AuthContext);
}

export const useProvideAuth=()=>{
    const [user, setUser]= useState(null);
    const [authLoading,setAuthLoading] = useState(false);


    const updateAuthUser = useCallback(async ()=>{
        let response;
        const accessToken = localStorage.getItem('accessToken');
        const refreshToken = localStorage.getItem('refreshToken');
        setAuthLoading(true);
        response = await axios.post(AUTH_API.VERIFY_API,{accessToken});
        setAuthLoading(false);
        if(response.data.response==="SUCCESS")
        {
            setUser(response.data.user);
        }
        else
        {
            response = await axios.post(AUTH_API.REFRESH_API,{refreshToken});
            if(response.data.errCode==="SUCCESS")
            {
                setUser(response.data.user);
                localStorage.setItem('accessToken',response.data.accessToken);
            }
        }
    },[setUser]) 

    useEffect(()=>{
        updateAuthUser();
    },[updateAuthUser])

    const login = async (loginInfo) =>
    {
        setAuthLoading(true);
        const data = await axios.post(AUTH_API.LOGIN_API, loginInfo);
        setAuthLoading(false);
        if(data.data.errCode==="TOKENSGENERATED"){
            setUser(data.data.user);
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