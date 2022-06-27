const ADD_TO_ACTIVE_CHAT='ADD_TO_ACTIVE_CHAT';
const REMOVE_FROM_ACTIVE_CHAT='REMOVE_FROM_ACTIVE_CHAT';
const FETCH_ACTIVE_CHAT= 'FETCH_ACTIVE_CHAT'


export const addtoActiveChat=(conversationID)=>{
    return {
        type:ADD_TO_ACTIVE_CHAT,
        payload: conversationID
    }
}


export const removefromActiveChat = (conversationID=>{
    return {
        type: REMOVE_FROM_ACTIVE_CHAT,
        payload:conversationID
    }
})

const initState={
    activeChat:[]

};


export const fetchActiveChat_reducer = (state=initState, action)=>{
    switch(action.type)
    {
        case ADD_TO_ACTIVE_CHAT:
                return{
                    activeChat:[...state.activeChat,action.payload]
                }
        case REMOVE_FROM_ACTIVE_CHAT:
                return{
                    activeChat:state.activeChat.filter((chat)=>chat!==action.payload)
                }
        case FETCH_ACTIVE_CHAT:
                return{
                    activeChat: action.payload.map((chat)=>chat.conversationID)
                }
        default:{
            return state
        }
    }
}