import React, { useEffect } from 'react';
import css from './Posts.module.css';
import {useDispatch, useSelector} from 'react-redux'
import { fetch_post_action } from '../../Redux/Reducers/fetchPost_reducer';
import PostCard from './PostCard';
import socket from '../../API CHANGESTREAMS/socket';
import { useOverlayContext } from '../../Hooks/overlay';



export default function Posts() {
  const overlay = useOverlayContext();
  const posts = useSelector((state)=>{
    return state.posts.posts
  }) 
  
  const dispatch = useDispatch();

  useEffect(()=>{
    socket.socket.on('post_UPDATE',()=>{
      dispatch(fetch_post_action());
    })
    dispatch(fetch_post_action());
  },[dispatch])



  const showPopUpScreen = ()=>{
    overlay.setOverlay('CreatePostPopUp')
    overlay.setShowOverlay(true);
  }
  

  return (
    <div className={css.main}>
      <div className={css.createPost_div}>
        <img src={`http://localhost:8000/plus.png`} className={css.createPost_btn} onClick={showPopUpScreen} alt='createpost'/>
      </div>
      <div className={css.postsScreen_div}>
        {posts.map((post,key)=>{
            return <PostCard post={post} key={key}/>
        })}
      </div>
    </div>
  )
}
