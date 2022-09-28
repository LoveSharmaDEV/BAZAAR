

const ADD_TO_ACTIVE_CHAT='ADD_TO_ACTIVE_CHAT';
const REMOVE_FROM_ACTIVE_CHAT='REMOVE_FROM_ACTIVE_CHAT';
const FETCH_ACTIVE_CHAT= 'FETCH_ACTIVE_CHAT';
const FETCH_ACTIVE_CHAT_SUCCESS= 'FETCH_ACTIVE_CHAT_SUCCESS';
const FETCH_ACTIVE_CHAT_FAILURE= 'FETCH_ACTIVE_CHAT_FAILURE';


export const addtoActiveChat=(message)=>{
    return {
        type:ADD_TO_ACTIVE_CHAT,
        payload: message
    }
}


export const removefromActiveChat = (conversationID=>{
    return {
        type: REMOVE_FROM_ACTIVE_CHAT,
        payload:conversationID
    }
})



const initState={
    conversation:null,
    loading:true,
    error:false
};

export const fetchActiveChat_reducer = (state=initState, action)=>{
    switch(action.type)
    {
        case ADD_TO_ACTIVE_CHAT:
                state.conversation.message.push(action.payload);
                return{
                    ...state
                }
        case REMOVE_FROM_ACTIVE_CHAT:
                return{
                    conversation:undefined,
                    loading:true,
                    error:false
                }
        case FETCH_ACTIVE_CHAT:
                return{
                    conversation:undefined,
                    loading:true,
                    error:false
                }
        case FETCH_ACTIVE_CHAT_SUCCESS:
            return{
                conversation:action.payload,
                loading:false,
                error:false
            }
        case FETCH_ACTIVE_CHAT_FAILURE:
            return{
                conversation:undefined,
                loading:false,
                error:true
            }
        default:{
            return state
        }
    }
}