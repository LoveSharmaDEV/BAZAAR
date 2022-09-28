import { createContext } from "react";
import { useChatSocket } from '../CONTEXT API CUSTOM HOOKS/CHATSOCKET_CUSTOM_HOOK';





export const chatSocketContext = createContext();

export const ChatSocketContextProvider = ({children})=>{
    
    const chatSocket = useChatSocket();

    return <chatSocketContext.Provider value={chatSocket}> {children} </chatSocketContext.Provider>
}