import { useContext, useEffect, useRef } from "react";
import { chatSocketContext } from "../CONTEXT API/CHATSOCKET_CONTEXT";
import socketIO from 'socket.io-client';
import { useAuth } from "./AUTH_CUSTOM_HOOK";
import { BACKEND_BASE } from "../MasterData/GlobalData";

export const  useChatSocketContext = ()=>{
    return useContext(chatSocketContext)
}

export const useChatSocket = ()=>{

    const auth = useAuth();
    const socketref = useRef()


    useEffect(()=>{
        socketref.current = socketIO(BACKEND_BASE,{transports:['websocket']});
        socketref.current.emit('userDetail',{userID: auth.user?auth.user._id:null});
    },[auth.user])

    return{
        socketref
    }
}