import React, { useEffect } from 'react'
import CSS from './SearchResult.module.css'
import { useAuth } from '../../CONTEXT API CUSTOM HOOKS/AUTH_CUSTOM_HOOK';
import { useDispatch, useSelector } from 'react-redux';
import { USER_PERSONALIZATION_API } from '../../MasterData/GlobalData';

/* JWT AUTHORIZED CALLS */
import AUTHORIZED_REQ  from '../../COMMON_UTILS/AUTHORIZED_REQUEST';

/* --> Maintains Redux State for all the posts of logged in user <--*/
import { APICALL_GETPOST } from '../../REDUX/REDUCERS/POSTS__REDUCER';
import { useNavigate } from 'react-router-dom';
import { APICALL_FETCH_FOLLOWERS, FOLLOW_STORE_ACTION, UNFOLLOW_STORE_ACTION } from '../../REDUX/REDUCERS/FOLLOW_REDUCER';


export default function SearchResult(props) {
    const auth = useAuth(); 

    const {user} = auth;

    const Follower = useSelector((state)=>{
        return state.follow
    })

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const FollowAction = async (e)=>{
        const response = await AUTHORIZED_REQ(USER_PERSONALIZATION_API.NAV_FOLLOW_STORE, {storeId: `${props.store._id}`},{},'POST');
        
        if(response.data.errCode==="SUCCESS") {
            dispatch(FOLLOW_STORE_ACTION(props.store));
            dispatch(APICALL_GETPOST());
        }
    }

    const UnFollowAction= async (e)=>{
        const response = await AUTHORIZED_REQ(USER_PERSONALIZATION_API.NAV_UNFOLLOW_STORE, {storeId: `${props.store._id}`},{},'POST');

        if(response.data.errCode==="SUCCESS"){
            dispatch(UNFOLLOW_STORE_ACTION(props.store));
            dispatch(APICALL_GETPOST());
        }
    }
    const NavigateToStore = ()=>{
        navigate(`/store/${props.store.storeName}`)
        }

    useEffect(()=>{
        dispatch(APICALL_FETCH_FOLLOWERS());
        dispatch(APICALL_GETPOST());
    },[dispatch])




  return (
    <div className={CSS.main}>
        <span>{props.store.storeName}</span>

        <div className={CSS.actions}>
            {
            user?
                Follower.Followers.filter((store)=>{ return store._id === props.store._id}).length===0 ?
                    <button  onClick={FollowAction}>FOLLOW</button>
                    :
                    <button  onClick={UnFollowAction}>UNFOLLOW</button>
            :
            null
            }   
            <button onClick={NavigateToStore}>GO TO STORE</button>

        </div>
    </div>
  )
}
