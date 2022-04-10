import makeRequest from '../../Commons/makeRequest'

const FETCH_CHAT = "FETCH_CHAT";
const FETCH_CHAT_SUCCESS = "FETCH_CHAT_SUCCESS";
const FETCH_CHAT_FAILURE = "FETCH_CHAT_FAILURE";
const ADD_CHAT = "ADD_CHAT";

export const addchat = (message)=>{
    return {
        type:ADD_CHAT,
        payload: message
    }
}

export const fetch_chat_action = ()=>{

    return async (dispatch)=>{
        try{
            dispatch({
                type:FETCH_CHAT
            })
            const response = await makeRequest('http://localhost:8000/fetch/chat', {},"POST");
            if(response.data.errCode==="SUCCESS"){
                dispatch({
                    type:FETCH_CHAT_SUCCESS,
                    payload:response.data.data
                })
            }
        }
        catch(e){
            dispatch({
                type:FETCH_CHAT_FAILURE,
            })
        }

    }
}

const initState={
    loading:true,
    chats:[]
};
export const fetchChat_reducer = (state=initState, action)=>{
    switch(action.type)
    {
        case FETCH_CHAT:
            
                return{
                    ...state,
                    loading:true
                }
            
        case FETCH_CHAT_SUCCESS:
            
                return{
                    ...state,
                    loading:false,
                    chats:action.payload
                }

        case FETCH_CHAT_FAILURE:
            
                return{
                    ...state,
                    loading:false,
                }

        case ADD_CHAT:
                
                return{
                    
                }
            
        default:{
            return state

        }
        
    }

}

