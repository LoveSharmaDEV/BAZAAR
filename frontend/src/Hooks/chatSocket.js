import { useContext, useEffect, useState } from "react";
import { chatSocketContext } from "../Providers/chatSocketContext";
import socketIO from 'socket.io-client';
import { useAuth } from ".";
const ENDPOINT = 'http://localhost:8000';
const socket = socketIO(ENDPOINT,{transports:['websocket']});

export const  useChatSocketContext = ()=>{
    return useContext(chatSocketContext)
}

export const useChatSocket = ()=>{

    const auth = useAuth();


    useEffect(()=>{
        socket.emit('userDetail',{userID: auth.user?auth.user._id:null});
    })

    return{
        socket,
    }
}