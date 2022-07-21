import React, {useCallback, useEffect, useState } from 'react'
import css from './PostCard.module.css'
import { useAuth } from '../../Hooks';
import { fetch_post_action, remove_post } from '../../Redux/Reducers/fetchPost_reducer';
import makeRequest from '../../Commons/makeRequest';
import { useDispatch, useSelector} from 'react-redux';
import { addtoActiveChat} from '../../Redux/Reducers/fetchActiveChats_reducer';
import { Comments } from './Comments';
import { useOverlayContext } from '../../Hooks/overlay';
import { useNavigate } from 'react-router-dom';


export default function PostCard(props) {

  const [showCommentBox, setShowCommentBox] = useState(false);
  const [comment,setComment] = useState({post:null,user:null,comment:null});
  const [comments,setComments] = useState([]);
  const auth = useAuth(); 
  const overlay = useOverlayContext();
  const {user} = auth;
  const dispatch = useDispatch();
  const [imageIndex, setImageIndex] = useState(0);
  const navigate = useNavigate();


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
          overlay.setOverlay('Chat');
          overlay.setCustomChatProps({conversationID:response.data.conversationID,
            toUser : props.post.user, 
            toStore : props.post.store, 
            setShowChatBox: overlay.setShowOverlay})
          overlay.setShowOverlay(true);
        }
      }
      else{
        if(!activeChats.includes(response.data.conversationID)){
          dispatch(addtoActiveChat(response.data.conversationID))
          overlay.setOverlay('Chat');
          overlay.setCustomChatProps({conversationID:response.data.conversationID,
            toUser : props.post.user, 
            toStore : props.post.store, 
            setShowChatBox: overlay.setShowOverlay})
          overlay.setShowOverlay(true);
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
    if(response.data.errCode==='SUCCESS') setComments([...comments,{post:props.post._id,user:user,like:[],comment}]);  
  }

  const fetchComments = useCallback( async ()=>{
    const response = await makeRequest('http://localhost:8000/post/comment/fetch',
    {PostId:props.post._id},
    'POST');
    if(response.data.errCode==='SUCCESS'){
      setComments(response.data.comments)
    }
  },[props.post._id])

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


  const changePicForward = ()=>{
    setImageIndex((prev)=>{
        return (((prev+1)%props.post.postPic.length))
    })
  }

  const changePicBackward = ()=>{
      setImageIndex((prev)=>{
          return (prev-1)>0?((prev-1)%props.post.postPic.length):0;
      })
  }

  const NavigateToStore = ()=>{
    navigate(`/store/${props.post.store.storeName}`)
  }

  useEffect(()=>{
    fetchComments();
  },[fetchComments])

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
      <div className={css.main}>
        {/* ------------------------------------------------------------------------------- */}
          <div className={css.postpic_Outerdiv}>
              <img onClick={changePicBackward} src='http://localhost:8000/right.png' className={css.ProductCardBackward} alt='changePic'/>
              <div className={css.postpic_div}>
                  <img src={props.post.postPic[imageIndex]} alt='Img' onError={alternateImage}/>
                  <div className={css.productPic_Sliding_Name}>
                      <span>
                        {props.post.postName}
                      </span>
                  </div>
              </div>
              <img onClick={changePicForward} src='http://localhost:8000/right.png' className={css.ProductCardForward} alt='changePic'/>
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
                <img className={css.PostCard_Action_img} src='http://localhost:8000/price-tag.png' alt='ag'/>
                {props.post.postPrice} Rs
              </span>
              <button onClick={NavigateToStore}> <img src='http://localhost:8000/shop.png' alt=''/>Store</button>
              <button onClick={toggleCommentBox}> <img src='http://localhost:8000/comment.png' alt=''/> Comment</button>
            </div>

            <div className={css.PostCard_Action_div2}>

              {
                user._id !== props.post.user._id
                ?
                <>              
                  <button onClick={UnFollowAction} >
                    <img className={css.PostCard_Action_img} src='http://localhost:8000/unfollow.png' alt='' />
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
            </div>
          </div>
        {/* ------------------------------------------------------------------------------- */}

      </div>
    </div>
  )
}
