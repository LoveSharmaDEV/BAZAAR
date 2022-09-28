// IMPORT DEPENDENCIES
import AUTHORIZED_REQ from '../../COMMON_UTILS/AUTHORIZED_REQUEST'
import { POST_API } from '../../MasterData/GlobalData';


/*------------> ACTIONS <------------ */
const FETCH_POST = "FETCH_POST";
const FETCH_POST_SUCCESS = "FETCH_POST_SUCCESS";
const FETCH_POST_FAILURE = "FETCH_POST_FAILURE";
const ADD_TO_POST = "ADD_TO_POST";
const REMOVE_POST = "REMOVE_POST";
/*------------> ACTIONS <------------ */



/* -------------->ACTIONS DEFINITIONS<-------------- */
export const add_to_post = (post)=>{
    return {
        type: ADD_TO_POST,
        payload: post
    }
}

export const remove_post = (store)=>{
    return {
        type:REMOVE_POST,
        payload: store
    }
}

export const APICALL_GETPOST = ()=>{

    return async (dispatch)=>{
        try{
            dispatch({
                type:FETCH_POST
            })
            //await sleep(2000);            
            const response = await AUTHORIZED_REQ(POST_API.FETCH_POST, {},{},"POST");
            if(response.data.errCode==="SUCCESS"){
                dispatch({
                    type:FETCH_POST_SUCCESS,
                    payload:response.data.data
                })
            }
        }
        catch(e){
            dispatch({
                type:FETCH_POST_FAILURE,
            })
        }

    }
}
/* -------------->ACTIONS DEFINITIONS<-------------- */


/*--------------> INITIAL STATE <------------------- */
const initState={
    loading:false, // API STATE TRACKING FOR LOADING SCREEN
    error:false,  // API STATE TRACKING FOR LOADING SCREEN
    posts:[]
};
/*--------------> INITIAL STATE <------------------- */


/*-----------------> REDUCERS <--------------------- */
export const fetchPost_reducer = (state=initState, action)=>{
    switch(action.type)
    {
        case FETCH_POST:
            
                return{
                    ...state,
                    loading:true,
                    error:false
                }
            
        case FETCH_POST_SUCCESS:
            
                return{
                    ...state,
                    loading:false,
                    error:false,
                    posts:action.payload
                }
            
        case FETCH_POST_FAILURE:
            
                return{
                    ...state,
                    loading:false,
                    error:true
                }
        case ADD_TO_POST:
            return{
                    loading:false,
                    posts: [action.payload,...state.posts]
                }
            
        case REMOVE_POST:
            return{
                ...state,
                posts: [...state.posts.filter((post)=>{
                    return post._id!==action.payload
                })]
            }
        default:{
            return state

        }
        
    }

}
/*-----------------> REDUCERS <--------------------- */

/* HELPER AND TESTER FUNCTIONS */

// function sleep(ms) {
//     return new Promise(resolve => setTimeout(resolve, ms));
// }