import React, { useEffect, useState } from 'react'
import SearchResultCss from './SearchResult.module.css'
import { useAuth } from '../../Hooks/index';
import makeRequest  from '../../Commons/makeRequest';
import { useDispatch } from 'react-redux';
import { fetch_post_action } from '../../Redux/Reducers/fetchPost_reducer';


export default function SearchResult(props) {
    const auth = useAuth(); 
    const {user,updateAuthUser} = auth;
    const dispatch = useDispatch();
    // Maintain local state from the context
    const [follower, setFollower ]= useState(user?user.following:[]);

    const FollowAction = async (e)=>{
       const response = await makeRequest('http://localhost:8000/follow/store', {storeId: `${e.target.dataset.storeid}`},'POST');
       if(response.data.errCode==="SUCCESS") {
           dispatch(fetch_post_action());
           setFollower([...follower, e.target.dataset.storeid]);
       }
    }

    const UnFollowAction= async (e)=>{
        const response = await makeRequest('http://localhost:8000/unfollow/store', {storeId: `${e.target.dataset.storeid}`},'POST');
        const newfollower = follower.filter((f)=>{
            return f.toString()!==e.target.dataset.storeid
        })
        if(response.data.errCode==="SUCCESS"){
            dispatch(fetch_post_action());
            setFollower([...newfollower]);
        }
    }


    // USE EFFECT RUN SINGLE TIME
    useEffect(()=>{
        updateAuthUser();
    },[updateAuthUser])

  return (
    <div className={SearchResultCss.main}>
        {props.store.storeName}
        <div className={SearchResultCss.actions}>
            {
            user && !follower.includes(props.store._id) ?
                <button data-storeid={props.store._id} onClick={FollowAction}>FOLLOW</button>
                :
            user?<button data-storeid={props.store._id} onClick={UnFollowAction}>UNFOLLOW</button>
                :
                null
            }   
            <button>GO TO STORE</button>

        </div>
    </div>
  )
}
