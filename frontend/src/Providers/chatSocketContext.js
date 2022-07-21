import { createContext } from "react";
import { useChatSocket } from '../Hooks/chatSocket';





export const chatSocketContext = createContext();

export const ChatSocketContextProvider = ({children})=>{
    
    const chatSocket = useChatSocket();

    return <chatSocketContext.Provider value={chatSocket}> {children} </chatSocketContext.Provider>
}