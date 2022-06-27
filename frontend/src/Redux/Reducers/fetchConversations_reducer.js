import makeRequest from '../../Commons/makeRequest'

const FETCH_CONVERSATIONS = "FETCH_CONVERSATIONS";
const FETCH_CONVERSATIONS_SUCCESS = "FETCH_CONVERSATIONS_SUCCESS";
const FETCH_CONVERSATIONS_FAILURE = "FETCH_CONVERSATIONS_FAILURE";
const ADD_TO_CONVERSATION = "ADD_TO_CONVERSATION";


/*---------------------------------------------------ACTION CREATERS START----------------------------------------------------- */

export const add_to_conversation = (conversationID,message)=>{
    return {
        type:ADD_TO_CONVERSATION,
        payload: {conversationID,message}
    }
}

export const fetch_conversations = ()=>{

    return async (dispatch)=>{
        try{
            dispatch({
                type:FETCH_CONVERSATIONS
            })
            const response = await makeRequest('http://localhost:8000/fetch/conversations', {},"GET");
            if(response.data.errCode==="SUCCESS"){
                return dispatch({
                    type:FETCH_CONVERSATIONS_SUCCESS,
                    payload:response.data.conversations
                })
            }
        }
        catch(e){
            return{
                type:FETCH_CONVERSATIONS_FAILURE,
            }
        }

    }
}

/*---------------------------------------------------ACTION CREATERS END------------------------------------------------------- */


const initState={
    conversations:[],
    loading:false
};
export const fetch_conversation_reducer = (state=initState, action)=>{
    switch(action.type)
    {
        case FETCH_CONVERSATIONS:
                return{
                    conversations:[],
                    loading:true
                }
            
        case FETCH_CONVERSATIONS_SUCCESS:
                return{
                    loading:false,
                    conversations:action.payload
                }

        case FETCH_CONVERSATIONS_FAILURE:
            
                return{
                    ...state,
                    loading:false,
                }

        case ADD_TO_CONVERSATION:
            state.conversations[state.conversations.findIndex((obj)=> 
                {
                    return obj.conversationID===action.payload.conversationID
                })].message.push(action.payload.message)
                return{
                    ...state,
                    conversations:[...state.conversations],
                }
            
        default:{
            return state

        }
        
    }

}

