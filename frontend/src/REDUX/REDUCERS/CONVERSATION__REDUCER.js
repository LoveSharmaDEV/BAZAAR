// IMPORT DEPENDECIES
import AUTHORIZED_REQ from '../../COMMON_UTILS/AUTHORIZED_REQUEST'
import { CHAT_API } from '../../MasterData/GlobalData';

/* --------------> ACTIONS <------------------ */
const FETCH_CONVERSATIONS = "FETCH_CONVERSATIONS";
const FETCH_CONVERSATIONS_SUCCESS = "FETCH_CONVERSATIONS_SUCCESS";
const FETCH_CONVERSATIONS_FAILURE = "FETCH_CONVERSATIONS_FAILURE";
const ADD_TO_CONVERSATION = "ADD_TO_CONVERSATION";
/* --------------> ACTIONS <------------------ */


/*-------------> ACTION CREATERS START <----------- */

export const add_to_conversation = (conversationID,message)=>{
    return {
        type:ADD_TO_CONVERSATION,
        payload: {conversationID,message}
    }
}

export const APICALL_GETCONVERSATION = ()=>{

    return async (dispatch)=>{
        try{
            dispatch({
                type:FETCH_CONVERSATIONS
            })
            //await sleep(2000);            
            const response = await AUTHORIZED_REQ(CHAT_API.CHAT_FETCH_CONVERSATION_API,{},{},"POST");
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

/*------------>ACTION CREATERS END<----------- */


/* ------------> DEFINE INITIAL STATE <--------*/
const initState={
    conversations:[],
    loading:false,
    error:false
};
/* ------------> DEFINE INITIAL STATE <--------*/



/* ----------------------> REDUCERS <------------------------- */
export const fetch_conversation_reducer = (state=initState, action)=>{
    switch(action.type)
    {
        case FETCH_CONVERSATIONS:
                return{
                    conversations:[],
                    loading:true,
                    error:false
                }
            
        case FETCH_CONVERSATIONS_SUCCESS:
                return{
                    loading:false,
                    error:false,
                    conversations:[...action.payload]
                }

        case FETCH_CONVERSATIONS_FAILURE:
            
                return{
                    ...state,
                    loading:false,
                    error:true
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
/* ----------------------> REDUCERS <------------------------- */


/* HELPER AND TESTER FUNCTIONS */
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}