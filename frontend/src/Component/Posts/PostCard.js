import React, { useState } from 'react'
import css from './PostCard.module.css'
import likeIcon from '../../utils/heart.png'
import { useAuth } from '../../Hooks';
import { fetch_post_action } from '../../Redux/Reducers/fetchPost_reducer';
import makeRequest from '../../Commons/makeRequest';
import { useDispatch, useSelector} from 'react-redux';
import { fetch_chat_action } from '../../Redux/Reducers/fetchChat_reducer';
import { addtoActiveChat} from '../../Redux/Reducers/fetchActiveChats_reducer';
import ChatBox from '../ChatBox/ChatBox';


export default function PostCard(props) {
  const [showChatBox, setShowChatBox]=useState(false);
  const auth = useAuth(); 
  const {user} = auth;
  const dispatch = useDispatch();
  const activeChats = useSelector((state)=>{
    return state.activechats.activeChat
  })

  const UnFollowAction = async (e)=>{
    const response = await makeRequest('http://localhost:8000/unfollow/store', {storeId: `${props.post.store}`},'POST');
    if(response.data.errCode==="SUCCESS") dispatch(fetch_post_action());
  }

  const initiateChat = async (e)=>{
    const conversationID=`${user._id}#${props.post.store}`;
    if(activeChats){
      if(!activeChats.includes(conversationID)){
        dispatch(addtoActiveChat(conversationID));
        dispatch(fetch_chat_action());
        setShowChatBox(true);
      }
    }
  }
  


  return (
    <>
    {showChatBox?<ChatBox conversationID={`${user._id}#${props.post.store}`} setShowChatBox={setShowChatBox}/>:''}

    <div className={css.main}>
        <div className={css.postpic_div}>
            <img src={`http://localhost:8000/${props.post.postPic}`} alt='Img'/>
            <div className={css.productPic_Sliding_Name}>
              <span>
                {props.post.postName}
              </span>
            </div>
        </div>

        <div className={css.postdescription_div}>
          <div className={css.postDescription}>
              {props.post.postDescription}
          </div>
          <div className={css.post_Mid}>
            <span>Price:{props.post.postPrice} Rs</span>
            <img src={likeIcon} alt='like'/>
          </div>
          <div className={css.post_Footer}>
            <button> GO TO STORE</button>
            {
              user._id !== props.post.user
              ?
              <>              
                <button onClick={UnFollowAction} >UNFOLLOW</button>
                <button onClick={initiateChat}>CHAT</button>
              </>
              :
              null
            } 
          </div>
        </div>
    </div>
    </>
  )
}
