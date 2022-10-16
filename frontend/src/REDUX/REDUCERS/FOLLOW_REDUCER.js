import AUTHORIZED_REQ from "../../COMMON_UTILS/AUTHORIZED_REQUEST";
import { USER_PERSONALIZATION_API } from "../../MasterData/GlobalData";

const FETCH_FOLLOWER = 'FETCH_TO_CART'
const FETCH_FOLLOWER_SUCCESS='FETCH_FOLLOWER_SUCCESS'
const FETCH_FOLLOWER_FAILURE = 'FETCH_FOLLOWER_FAILURE'
const FOLLOW_STORE = 'FOLLOW_STORE';
const UNFOLLOW_STORE='UNFOLLOW_STORE';

export const FOLLOW_STORE_ACTION = (store)=>{
    return {
        type:FOLLOW_STORE,
        payload:store
    }
    
}

export const UNFOLLOW_STORE_ACTION = (store)=>{
    return {
        type:UNFOLLOW_STORE,
        payload:store
    }
}

export const APICALL_FETCH_FOLLOWERS = ()=>{

    return async (dispatch)=>{

        try{
            dispatch({type:FETCH_FOLLOWER})
            const response = await AUTHORIZED_REQ(USER_PERSONALIZATION_API.FETCH_FOLLOWERS, {},{},'POST');
            if(response.data.errCode==='SUCCESS'){
                dispatch({
                    type:FETCH_FOLLOWER_SUCCESS,
                    payload:response.data.FollowersList
                })
            }
        }
        catch(e){
            dispatch({
                type:FETCH_FOLLOWER_FAILURE,
            })
        }

    }
}

/* ------> INITIAL STATE <------- */
const initState = {
    Followers:[],
    loading:false,
    error:false,
    success:false,
}
/* ------> INITIAL STATE <------- */

/* REDUCER */
export const FETCH_FOLLOWERS_REDUCER = (state=initState, action)=>{

    switch (action.type) {

        case FETCH_FOLLOWER:
        {
            return{
                ...state,
                loading:true,
                error:false,
                success:false,
            }
        }
        case FETCH_FOLLOWER_SUCCESS:
            {
                return{
                    ...state,
                    loading:false,
                    error:false,
                    success:true,
                    Followers:action.payload
                }
            }
        case FETCH_FOLLOWER_FAILURE:
            {
                return{
                    ...state,
                    loading:false,
                    error:true,
                    success:false,
                }
            }
        case FOLLOW_STORE:
        {
            return{
                ...state,
                Followers:[...state.Followers,action.payload]
            }   
        }
        case UNFOLLOW_STORE:
        {
            state.Followers = state.Followers.filter((f)=>{
                return f._id!==action.payload._id
            })
            return{
                ...state,
            }   
        }
        default:
            return state
    }

}