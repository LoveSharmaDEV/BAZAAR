import makeRequest from '../../Commons/makeRequest'

const FETCH_POST = "FETCH_POST";
const FETCH_POST_SUCCESS = "FETCH_POST_SUCCESS";
const FETCH_POST_FAILURE = "FETCH_POST_FAILURE";
const ADD_TO_POST = "ADD_TO_POST";
const REMOVE_POST = "REMOVE_POST";

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



export const fetch_post_action = ()=>{

    return async (dispatch)=>{
        try{
            dispatch({
                type:FETCH_POST
            })
            const response = await makeRequest('http://localhost:8000/fetch/post', {},"GET");
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

const initState={
    loading:true,
    posts:[]
};
export const fetchPost_reducer = (state=initState, action)=>{
    switch(action.type)
    {
        case FETCH_POST:
            
                return{
                    ...state,
                    loading:true
                }
            
        case FETCH_POST_SUCCESS:
            
                return{
                    ...state,
                    loading:false,
                    posts:action.payload
                }
            
        case FETCH_POST_FAILURE:
            
                return{
                    ...state,
                    loading:false,
                }
        case ADD_TO_POST:
            var object = {};
            action.payload.forEach(function(value, key){
                object[key] = value;
            });
            object.postPic = action.payload.get('image');

            return{
                    loading:false,
                    posts: [object,...state.posts]
                }
            
        case REMOVE_POST:
            return{
                ...state,
                posts: [...state.posts.filter((post)=>{
                    return post.store._id!==action.payload
                })]
            }
        default:{
            return state

        }
        
    }

}

