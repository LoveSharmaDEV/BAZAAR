import React, { useEffect, useState } from 'react'
import CSS from './SearchResult.module.css'
import { useAuth } from '../../CONTEXT API CUSTOM HOOKS/AUTH_CUSTOM_HOOK';
import { useDispatch } from 'react-redux';
import { USER_PERSONALIZATION_API } from '../../MasterData/GlobalData';

/* JWT AUTHORIZED CALLS */
import AUTHORIZED_REQ  from '../../COMMON_UTILS/AUTHORIZED_REQUEST';

/* --> Maintains Redux State for all the posts of logged in user <--*/
import { APICALL_GETPOST } from '../../REDUX/REDUCERS/POSTS__REDUCER';
import { useNavigate } from 'react-router-dom';


export default function SearchResult(props) {
    const auth = useAuth(); 
    const {user,updateAuthUser} = auth;
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Maintain local state from the context
    const [follower, setFollower ]= useState(user?user.following:[]);

    const FollowAction = async (e)=>{
       const response = await AUTHORIZED_REQ(USER_PERSONALIZATION_API.NAV_FOLLOW_STORE, {storeId: `${e.target.dataset.storeid}`},{},'POST');
       if(response.data.errCode==="SUCCESS") {
           dispatch(APICALL_GETPOST());
           setFollower([...follower, e.target.dataset.storeid]);
       }
    }

    const UnFollowAction= async (e)=>{
        const response = await AUTHORIZED_REQ(USER_PERSONALIZATION_API.NAV_UNFOLLOW_STORE, {storeId: `${e.target.dataset.storeid}`},{},'POST');
        const newfollower = follower.filter((f)=>{
            return f.toString()!==e.target.dataset.storeid
        })
        if(response.data.errCode==="SUCCESS"){
            dispatch(APICALL_GETPOST());
            setFollower([...newfollower]);
        }
    }
    const NavigateToStore = ()=>{
        navigate(`/store/${props.store.storeName}`)
      }


    // USE EFFECT RUN SINGLE TIME
    useEffect(()=>{
        updateAuthUser();
    },[updateAuthUser])

  return (
    <div className={CSS.main}>
        <span>{props.store.storeName}</span>
        <div className={CSS.actions}>
            {
            user && !follower.includes(props.store._id) ?
                <button data-storeid={props.store._id} onClick={FollowAction}>FOLLOW</button>
                :
            user?<button data-storeid={props.store._id} onClick={UnFollowAction}>UNFOLLOW</button>
                :
                null
            }   
            <button onClick={NavigateToStore}>GO TO STORE</button>

        </div>
    </div>
  )
}
