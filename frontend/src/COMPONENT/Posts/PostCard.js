import React, {useCallback, useEffect, useState } from 'react'
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
import { UNFOLLOW_STORE_ACTION } from '../../REDUX/REDUCERS/FOLLOW_REDUCER';


export default function PostCard(props) {

  const [showCommentBox, setShowCommentBox] = useState(false);
  const [chatHeader, setchatHeader] = useState({});
  const auth = useAuth(); 
  const overlay = useOverlayContext();
  const {user} = auth;
  const dispatch = useDispatch();
  const [imageIndex, setImageIndex] = useState(0);
  const navigate = useNavigate();


  const activeChats = useSelector((state)=>{
    return state.activechats
  })


  const UNFOLLOW_ACTION = async (e)=>{
    const response = await AUTHORIZED_REQ(USER_PERSONALIZATION_API.NAV_UNFOLLOW_STORE, {storeId: `${props.post.store._id}`},{},'POST');
    if(response.data.errCode==="SUCCESS") {
      dispatch(UNFOLLOW_STORE_ACTION(props.post.store));
      dispatch(APICALL_GETPOST());
    };
  }

  const LOAD_CHAT_META_DATA = useCallback(async ()=>{
    const response = await AUTHORIZED_REQ(CHAT_API.CHAT_FETCH_CHATMETADATA_API,
      {ToUserID:props.post.store.owner},
      {},
      'POST')

    if(response.data.errCode==='SUCCESS')
    {
      setchatHeader({
        ChatHeaderPicture:response.data.ChatHeaderPicture,
        ChatHeaderName:response.data.ChatHeaderName,
        User: response.data.user
      });
    }

  },[props.post.store.owner])

  const INITIATE_CHAT = async (e)=>{
    if(!activeChats.conversation){
      /* ---------> DISPATCH FETCH ACTIVE CHAT <---------- */
      dispatch({type: 'FETCH_ACTIVE_CHAT'})
      const response = await AUTHORIZED_REQ(CHAT_API.CHAT_INIT_API,{ToUserID:props.post.user._id},{},'POST');
      if(response.data.errCode==='SUCCESS') dispatch({type:'FETCH_ACTIVE_CHAT_SUCCESS', payload:response.data.conversation})
      else dispatch({type:'FETCH_ACTIVE_CHAT_FAILURE'})
      /* ---------> DISPATCH FETCH ACTIVE CHAT <---------- */

      overlay.setOverlay('Chat');
      overlay.setCustomOverlayProps({conversationID:response.data.conversation.conversationID,
        chatHeader:chatHeader, 
        setShowChatBox: overlay.setShowOverlay})
      overlay.setShowOverlay(true);
    }
  }

  const TOGGLE_COMMENT= () => {
    if(showCommentBox){
      setShowCommentBox(false)
    }
    else{
      setShowCommentBox(true)
    }
    
  }

  const TOGGLE_LIKE = async ()=>{
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
  
  const CHANGE_PIC_FORWARD = ()=>{
    setImageIndex((prev)=>{
        return (((prev+1)%props.post.postPic.length))
    })
  }

  const CHANGE_PIC_BACKWARD = ()=>{
      setImageIndex((prev)=>{
          return (prev-1)>0?((prev-1)%props.post.postPic.length):0;
      })
  }

  const NAVIGATE_TO_STORE = ()=>{
    navigate(`/store/${props.post.store.storeName}`)
  }

  const DELETE_POST = async()=>{
    const response = await AUTHORIZED_REQ(POST_API.DELETE_POST,{PostID:props.post._id},{},'POST');
    if(response.data.errCode==='SUCCESS') dispatch(remove_post(props.post._id));
  }

  useEffect(()=>{
    LOAD_CHAT_META_DATA()
  },[LOAD_CHAT_META_DATA]);

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
              <img onClick={CHANGE_PIC_BACKWARD} src={`${BACKEND_BASE}/right.png`} className={CSS.ProductCardBackward} alt='changePic'/>
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
              <img onClick={CHANGE_PIC_FORWARD} src={`${BACKEND_BASE}/right.png`} className={CSS.ProductCardForward} alt='changePic'/>
          </div>
          
        {/* ------------------------------------------------------------------------------- */}
          <div className={CSS.PostCard_Content_div}>

            <div className={CSS.PostCard_StoreName_div}>

              <span className={CSS.PostCard_LikeAction}>
                {
                  props.post.like.includes(user._id)?
                    <img onClick={TOGGLE_LIKE} className={CSS.PostCard_Action_img} src={`${BACKEND_BASE}/heart.png`} alt='like'/> 
                  :
                    <img onClick={TOGGLE_LIKE} className={CSS.PostCard_Action_img} src={`${BACKEND_BASE}/emptyheart.png`} alt='like'/>
                }
              </span>
              <span className={CSS.PostCard_Storename}>{props.post?.store?.storeName}</span>
              {
                props.post.user._id===auth.user._id?
                  <img 
                  className={CSS.PostCard_Action_img_delete} 
                  src={`${BACKEND_BASE}/delete.png`}
                  onClick={DELETE_POST}
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
              <button onClick={NAVIGATE_TO_STORE}> <img src={`${BACKEND_BASE}/shop.png`} alt=''/>Store</button>
              <button onClick={TOGGLE_COMMENT}> <img src={`${BACKEND_BASE}/comment.png`} alt=''/> Comment</button>
            </div>

            <div className={CSS.PostCard_Action_div2}>

              {
                user._id !== props.post.user._id
                ?
                <>              
                  <button onClick={UNFOLLOW_ACTION} >
                    <img className={CSS.PostCard_Action_img} src={`${BACKEND_BASE}/unfollow.png`} alt='' />
                    unfollow
                  </button>
                  <button onClick={INITIATE_CHAT}>
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
