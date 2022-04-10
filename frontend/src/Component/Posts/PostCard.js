import React, {useState } from 'react'
import css from './PostCard.module.css'
import likeIcon from '../../utils/heart.png'
import { useAuth } from '../../Hooks';
import { fetch_post_action } from '../../Redux/Reducers/fetchPost_reducer';
import makeRequest from '../../Commons/makeRequest';
import { useDispatch, useSelector} from 'react-redux';
import { addtoActiveChat} from '../../Redux/Reducers/fetchActiveChats_reducer';
import ChatBox from '../ChatBox/ChatBox';


export default function PostCard(props) {
  const [showChatBox, setShowChatBox]=useState({
    show: false,
    conversationID:null
  });
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
    if(activeChats){
      let response = await makeRequest('http://localhost:8000/fetch/chatid', {toUser: props.post.user},'POST');
      if(response.data.errCode==='FAILURE'){
        let response = await makeRequest('http://localhost:8000/chatinit', {toUser: props.post.user},'POST');
        if(response.data.errCode==='SUCCESS'){
          dispatch(addtoActiveChat(response.data.conversation.conversationID))
          setShowChatBox({
            show:true,
            conversationID: response.data.conversation.conversationID
          });
        }
      }
      else{
        if(!activeChats.includes(response.data.conversationID)){
          dispatch(addtoActiveChat(response.data.conversationID))
          setShowChatBox({
            show:true,
            conversationID: response.data.conversationID
          });
        }
      }
    }
  }
  


  return (
    <>
    {showChatBox.show?<ChatBox conversationID={showChatBox.conversationID} toUser = {props.post.user} setShowChatBox={setShowChatBox}/>:null}

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
            <div className={css.post_Mid_img_div}>
              <img src={likeIcon} alt='like'/>
              <span>0</span>
            </div>
            <button>ADD STORE</button>

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
