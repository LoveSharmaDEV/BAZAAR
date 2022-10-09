import React, {useState } from 'react'
import CSS from './PostCard.module.css'
import { useAuth } from '../../CONTEXT API CUSTOM HOOKS/AUTH_CUSTOM_HOOK';
import { APICALL_GETPOST, remove_post } from '../../REDUX/REDUCERS/POSTS__REDUCER';
import AUTHORIZED_REQ from '../../COMMON_UTILS/AUTHORIZED_REQUEST';
import { useDispatch, useSelector} from 'react-redux';
import { useOverlayContext } from '../../CONTEXT API CUSTOM HOOKS/OVERLAY_CUSTOM_HOOK';
import { useNavigate } from 'react-router-dom';
import { BACKEND_BASE, CHAT_API, POST_API} from '../../MasterData/GlobalData';
import { USER_PERSONALIZATION_API } from '../../MasterData/GlobalData';
import CommentCard from './CommentCard';


export default function PostCard(props) {

  const [showCommentBox, setShowCommentBox] = useState(false);
  const auth = useAuth(); 
  const overlay = useOverlayContext();
  const {user} = auth;
  const dispatch = useDispatch();
  const [imageIndex, setImageIndex] = useState(0);
  const navigate = useNavigate();


  const activeChats = useSelector((state)=>{
    return state.activechats
  })


  const UnFollowAction = async (e)=>{
    const response = await AUTHORIZED_REQ(USER_PERSONALIZATION_API.NAV_UNFOLLOW_STORE, {storeId: `${props.post.store._id}`},{},'POST');
    if(response.data.errCode==="SUCCESS") dispatch(remove_post(props.post.store._id));
  }

  const initiateChat = async (e)=>{
    if(!activeChats.conversation){
      /* ---------> DISPATCH FETCH ACTIVE CHAT <---------- */
      dispatch({type: 'FETCH_ACTIVE_CHAT'})
      const response = await AUTHORIZED_REQ(CHAT_API.CHAT_INIT_API,{ToUserID:props.post.user._id},{},'POST');
      if(response.data.errCode==='SUCCESS') dispatch({type:'FETCH_ACTIVE_CHAT_SUCCESS', payload:response.data.conversation})
      else dispatch({type:'FETCH_ACTIVE_CHAT_FAILURE'})
      /* ---------> DISPATCH FETCH ACTIVE CHAT <---------- */

      overlay.setOverlay('Chat');
      overlay.setCustomOverlayProps({conversationID:response.data.conversation.conversationID,
        toUser : props.post.user, 
        toStore : props.post.store, 
        setShowChatBox: overlay.setShowOverlay})
      overlay.setShowOverlay(true);
    }
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
      const response = await AUTHORIZED_REQ(POST_API.POST_TOGGLELIKE,
      {PostId:props.post._id,action:'dislike'},{},'POST');
      if(response.data.errCode==='SUCCESS') dispatch(APICALL_GETPOST())
    }
    else
    {
      const response = await AUTHORIZED_REQ(POST_API.POST_TOGGLELIKE,
      {PostId:props.post._id,action:'like'},
      {},
      'POST');
      if(response.data.errCode==='SUCCESS') dispatch(APICALL_GETPOST())
    }
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

  const Delete_Post = async()=>{
    const response = await AUTHORIZED_REQ(POST_API.DELETE_POST,{PostID:props.post._id},{},'POST');
    if(response.data.errCode==='SUCCESS') dispatch(remove_post(props.post._id));
  }

  return (
    <div className={CSS.PostCard}>
      {
        showCommentBox
        ?
        <CommentCard 
        post= {props.post}
        setShowCommentBox={setShowCommentBox}
        />
        :
        null
      }
      <div className={CSS.main}>
        {/* ------------------------------------------------------------------------------- */}
          <div className={CSS.postpic_Outerdiv}>
              <img onClick={changePicBackward} src={`${BACKEND_BASE}/right.png`} className={CSS.ProductCardBackward} alt='changePic'/>
              <div className={CSS.postpic_div}>
                  <img src={
                            props.post.postPic[imageIndex] instanceof File?
                              URL.createObjectURL(props.post.postPic[imageIndex])
                              :
                              `${BACKEND_BASE}/${props.post.postPic[imageIndex]}`
                          } 
                    alt='' 
                  />
                  <div className={CSS.productPic_Sliding_Name}>
                      <span>
                        {props.post.postName}
                      </span>
                  </div>
              </div>
              <img onClick={changePicForward} src={`${BACKEND_BASE}/right.png`} className={CSS.ProductCardForward} alt='changePic'/>
          </div>
          
        {/* ------------------------------------------------------------------------------- */}
          <div className={CSS.PostCard_Content_div}>

            <div className={CSS.PostCard_StoreName_div}>
              <span>
                {
                  props.post.like.includes(user._id)?
                    <img onClick={toggleLike} className={CSS.PostCard_Action_img} src={`${BACKEND_BASE}/heart.png`} alt='like'/> 
                  :
                    <img onClick={toggleLike} className={CSS.PostCard_Action_img} src={`${BACKEND_BASE}/emptyheart.png`} alt='like'/>
                }
              </span>
              <span className={CSS.PostCard_Storename}>{props.post?.store?.storeName}</span>
              {
                props.post.user._id===auth.user._id?
                  <img 
                  className={CSS.PostCard_Action_img_delete} 
                  src={`${BACKEND_BASE}/delete.png`}
                  onClick={Delete_Post}
                  alt=''
                  />
                  :
                  null
              }
            </div>

            <div className={CSS.PostCard_Description_div}>
                <span>{props.post.postDescription}</span>
            </div>

            <div className={CSS.PostCard_Action_div1}>
              <span>
                <img className={CSS.PostCard_Action_img} src={`${BACKEND_BASE}/price-tag.png`} alt='ag'/>
                {props.post.postPrice} Rs
              </span>
              <button onClick={NavigateToStore}> <img src={`${BACKEND_BASE}/shop.png`} alt=''/>Store</button>
              <button onClick={toggleCommentBox}> <img src={`${BACKEND_BASE}/comment.png`} alt=''/> Comment</button>
            </div>

            <div className={CSS.PostCard_Action_div2}>

              {
                user._id !== props.post.user._id
                ?
                <>              
                  <button onClick={UnFollowAction} >
                    <img className={CSS.PostCard_Action_img} src={`${BACKEND_BASE}/unfollow.png`} alt='' />
                    unfollow
                  </button>
                  <button onClick={initiateChat}>
                    <img className={CSS.PostCard_Action_img} src={`${BACKEND_BASE}/chat.png`} alt='chat' />
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
