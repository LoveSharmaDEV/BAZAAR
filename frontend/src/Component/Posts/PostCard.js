import React, {useEffect, useState } from 'react'
import css from './PostCard.module.css'
import { useAuth } from '../../Hooks';
import { fetch_post_action, remove_post } from '../../Redux/Reducers/fetchPost_reducer';
import makeRequest from '../../Commons/makeRequest';
import { useDispatch, useSelector} from 'react-redux';
import { addtoActiveChat} from '../../Redux/Reducers/fetchActiveChats_reducer';
import ChatBox from '../ChatBox/ChatBox';
import { Comments } from './Comments';


export default function PostCard(props) {
  const [showChatBox, setShowChatBox]=useState({
    show: false,
    conversationID:null
  });
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [comment,setComment] = useState({post:null,user:null,comment:null});
  const [comments,setComments] = useState([]);

  const auth = useAuth(); 
  const {user} = auth;
  const dispatch = useDispatch();

  const activeChats = useSelector((state)=>{
    return state.activechats.activeChat
  })


  const UnFollowAction = async (e)=>{
    const response = await makeRequest('http://localhost:8000/unfollow/store', {storeId: `${props.post.store._id}`},'POST');
    if(response.data.errCode==="SUCCESS") dispatch(remove_post(props.post.store._id));
  }

  const initiateChat = async (e)=>{
    if(activeChats){
      let response = await makeRequest('http://localhost:8000/fetch/chatid', {toUser: props.post.user._id},'POST');
      if(response.data.errCode==='FAILURE'){
        let response = await makeRequest('http://localhost:8000/chatinit', {toUser: props.post.user._id},'POST');
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

  const alternateImage = (e)=>{
    e.target.src = URL.createObjectURL(props.post.postPic);
  }
  
  const toggleCommentBox= () => {
    if(showCommentBox){
      setShowCommentBox(false)
    }
    else{
      setShowCommentBox(true)
    }
    
  }

  const toggleLike = async ()=>{
    if(props.post.like.includes(user._id)){
      const response = await makeRequest('http://localhost:8000/post/togglelike',
      {PostId:props.post._id,action:'dislike'},
      'POST');
      if(response.data.errCode==='SUCCESS') dispatch(fetch_post_action())
    }
    else
    {
      const response = await makeRequest('http://localhost:8000/post/togglelike',
      {PostId:props.post._id,action:'like'},
      'POST');
      if(response.data.errCode==='SUCCESS') dispatch(fetch_post_action())
    }
  }

  const commentSubmit = async ()=>{
    const response = await makeRequest('http://localhost:8000/post/comment',
    {PostId:props.post._id,comment},
    'POST');
    if(response.data.errCode==='SUCCESS') setComments([...comments,{post:props.post._id,user:user._id,comment}]);  
  }

  const fetchComments = async ()=>{
    const response = await makeRequest('http://localhost:8000/post/comment/fetch',
    {PostId:props.post._id},
    'POST');
    if(response.data.errCode==='SUCCESS'){
      setComments(response.data.comments)
    }
  }

  const togglelikeComment = (commentID)=>{
    const index1 = comments.findIndex((comment)=>comment._id===commentID);
    if(comments[index1].like.includes(user._id)){
      let index2 = comments[index1].like.indexOf(user._id);
      if (index2 !== -1) {
        comments[index1].like.splice(index2, 1);
      }
    }else{
      comments[index1].like.push(user._id)
    }
    setComments([...comments])

  }

  useEffect(()=>{
    fetchComments();
  },[])

  return (
    <div className={css.PostCard}>
      {
        showCommentBox
        ?
        <div className={css.CommentBoxOverlay}>
          <div className={css.CommentBox}>
            <div className={css.CommentBoxHeader}>
              <img onClick={toggleCommentBox} src='http://localhost:8000/close.png' alt='Close'/>
            </div>
            <div className={css.CommentBoxBody}>
              {
                comments.map((c,key)=>{
                  return <Comments comment={c} togglelikeComment={togglelikeComment} key={key} />
                })
              }
            </div>
            <div className={css.CommentBoxFooter}>
              <input onChange={(e)=>{setComment(e.target.value)}} type='text'/>
              <button onClick={commentSubmit} className={css.button54}> Add Comment!</button>
            </div>
          </div>         
        </div>
        :
        null
      }
      {
        showChatBox.show
        ?
        <ChatBox conversationID={showChatBox.conversationID} toUser = {props.post.user} toStore = {props.post.store} setShowChatBox={setShowChatBox}/>
        :
        null
      }
      <div className={css.main}>
        {/* ------------------------------------------------------------------------------- */}
          
          <div className={css.postpic_div}>
              <img src={`http://localhost:8000/${props.post.postPic}`} alt='Img' 
              onError={alternateImage}/>
              <div className={css.productPic_Sliding_Name}>
                <span>
                  {props.post.postName}
                </span>
              </div>
          </div>

        {/* ------------------------------------------------------------------------------- */}
          <div className={css.PostCard_Content_div}>

            <div className={css.PostCard_StoreName_div}>
              <span>
                {
                  props.post.like.includes(user._id)?
                    <img onClick={toggleLike} className={css.PostCard_Action_img} src='http://localhost:8000/heart.png' alt='like'/> 
                  :
                    <img onClick={toggleLike} className={css.PostCard_Action_img} src='http://localhost:8000/emptyheart.png' alt='like'/>
                }
              </span>
              <span className={css.PostCard_Storename}>{props.post?.store?.storeName}</span>
            </div>

            <div className={css.PostCard_Description_div}>
                {props.post.postDescription}
            </div>

            <div className={css.PostCard_Action_div1}>
              <span>
                <img className={css.PostCard_Action_img} src='http://localhost:8000/tag.png' alt='tag'/>
                {props.post.postPrice} Rs
              </span>
              <button>Go To Store!!</button>
            </div>

            <div className={css.PostCard_Action_div2}>

              {
                user._id !== props.post.user._id
                ?
                <>              
                  <button onClick={UnFollowAction} >
                    <img className={css.PostCard_Action_img} src='http://localhost:8000/unfollow.png' alt='unfollow' />
                    unfollow
                  </button>
                  <button onClick={initiateChat}>
                    <img className={css.PostCard_Action_img} src='http://localhost:8000/chat.png' alt='chat' />
                    Chat
                  </button>
                </>
                :
                null
              } 
              <button onClick={toggleCommentBox}> Comment</button>
            </div>
          </div>
        {/* ------------------------------------------------------------------------------- */}

      </div>
    </div>
  )
}
