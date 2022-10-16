import React, { useCallback, useEffect, useState} from 'react'
import CSS from './ChatHighlight.module.css'
import AUTHORIZED_REQ from '../../COMMON_UTILS/AUTHORIZED_REQUEST';
import { useDispatch, useSelector} from 'react-redux';
import { BACKEND_BASE} from '../../MasterData/GlobalData';
import { CHAT_API } from '../../MasterData/GlobalData';
import { useOverlayContext } from '../../CONTEXT API CUSTOM HOOKS/OVERLAY_CUSTOM_HOOK';



export default function ChatHighlight(props) {

  const [chatHeader, setchatHeader] = useState({});
  const dispatch = useDispatch();
  const overlay = useOverlayContext();
  const activeChats = useSelector((state)=>{return state.activechats})

  const LOAD_CHAT_META_DATA = useCallback(async ()=>{
    const response = await AUTHORIZED_REQ(CHAT_API.CHAT_FETCH_CHATMETADATA_API,
      {ToUserID:props.storeUser._id},
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

  },[props.storeUser._id])

  const initiateChat = async (e)=>{
    if(!activeChats.conversation){
      dispatch({type: 'FETCH_ACTIVE_CHAT'});
      const response = await AUTHORIZED_REQ(CHAT_API.CHAT_INIT_API,{ToUserID:props.storeUser._id},{},'POST');
      if(response.data.errCode==='SUCCESS') dispatch({type:'FETCH_ACTIVE_CHAT_SUCCESS', payload:response.data.conversation})
      else dispatch({type:'FETCH_ACTIVE_CHAT_FAILURE'})
      overlay.setOverlay('Chat');
      overlay.setCustomOverlayProps({conversationID:response.data.conversation.conversationID,
        chatHeader:chatHeader, 
        setShowChatBox: overlay.setShowOverlay})
      overlay.setShowOverlay(true);
    }
  }

  useEffect(()=>{
    LOAD_CHAT_META_DATA()
  },[LOAD_CHAT_META_DATA]);

  return (
    <>
      <div className={CSS.main} onClick={initiateChat}>
        <img src={`${BACKEND_BASE}/${chatHeader.ChatHeaderPicture}`} alt=' '/>
        <div className={CSS.Content}>
          <span className={CSS.Header}>{chatHeader.ChatHeaderName}</span>
          <span>{props?.latestConversation?.message}...</span>
        </div>
      </div>
    </>

  )
}
