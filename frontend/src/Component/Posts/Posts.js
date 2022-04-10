import React, { useEffect, useState } from 'react';
import CreatePostPopup from './CreatePostPopup';
import css from './Posts.module.css';
import {useDispatch, useSelector} from 'react-redux'
import { fetch_post_action } from '../../Redux/Reducers/fetchPost_reducer';
import PostCard from './PostCard';
import socket from '../../API CHANGESTREAMS/socket';



export default function Posts() {
  const[showPopUp, setPopUp] = useState(false);
  
  const posts = useSelector((state)=>{
    return state.posts
  }) 
  
  const dispatch = useDispatch();

  useEffect(()=>{
    socket.socket.on('post_UPDATE',()=>{
      dispatch(fetch_post_action());
    })
    dispatch(fetch_post_action());
  },[dispatch])



  const showPopUpScreen = ()=>{
    setPopUp(true);
  }
  

  return (
    <div className={css.main}>
      {
        showPopUp?
          <CreatePostPopup setPopUp={setPopUp}/>
          :
          null
      }
      <div className={css.createPost_div}>      
        <button className={css.createPost_btn} onClick={showPopUpScreen}>Create Post!!</button>
      </div>
      <div className={css.postsScreen_div}>
        {posts.posts.map((post,key)=>{
            return <PostCard post={post} key={key}/>
        })}
      </div>
    </div>
  )
}
