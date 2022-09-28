import { createContext } from "react";
import { useProvideAuth } from '../CONTEXT API CUSTOM HOOKS/AUTH_CUSTOM_HOOK';

const initialState = {
    user: null,
    setUser:()=>{},
    login: ()=>{},
    logout:()=>{},
    loading:true,
    updateAuthUser:()=>{},
    authLoading:false,
    setAuthLoading:()=>{}
}

export const AuthContext = createContext(initialState);

export const AuthProvider = ({children})=>{
    const auth = useProvideAuth();

    return <AuthContext.Provider value={auth} >{children}</AuthContext.Provider>
}