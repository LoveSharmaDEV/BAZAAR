import React, { useEffect } from 'react';
import css from './Posts.module.css';
import {useDispatch, useSelector} from 'react-redux'
import { fetch_post_action } from '../../Redux/Reducers/fetchPost_reducer';
import PostCard from './PostCard';
import { useChatSocketContext } from '../../Hooks/chatSocket';
import { useOverlayContext } from '../../Hooks/overlay';



export default function Posts(props) {
  const overlay = useOverlayContext();
  const chatSocket = useChatSocketContext();
  const posts = useSelector((state)=>{
    return state.posts.posts
  }) 
  
  const dispatch = useDispatch();

  useEffect(()=>{
    chatSocket.socket.on('post_UPDATE',()=>{
      dispatch(fetch_post_action());
    })
    dispatch(fetch_post_action());
  },[dispatch,chatSocket.socket])



  const showPopUpScreen = ()=>{
    overlay.setOverlay('CreatePostPopUp')
    overlay.setShowOverlay(true);
  }
  
  useEffect(()=>{
    props.setrightNavBarVisibility(true);
    props.setleftNavBarVisibility(true);
    props.settopNavBarVisibility(true);
    props.setEcomNavBarVisibility(false);
  },[props])

  return (
    <div className={css.main}>
      <div className={css.createPost_div}>
        <img src={`http://localhost:8000/plus.png`} className={css.createPost_btn} onClick={showPopUpScreen} alt='createpost'/>
      </div>
      <div className={css.postsScreen_div}>
        {
          posts.map((post,key)=>{
              console.log(post)
              return <PostCard post={post} key={key}/>
          })
        }
      </div>
    </div>
  )
}
