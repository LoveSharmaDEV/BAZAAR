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
    const Load_Chat_Meta_Data = useCallback(async ()=>{
      const response = await AUTHORIZED_REQ(CHAT_API.CHAT_FETCH_CHATMETADATA_API,
        {ToUserID:props.storeUser._id},
        {},
        'POST')

      if(response.data.errCode==='SUCCESS')
      {
        setchatHeader(response.data.store);
      }
    },[props.storeUser._id])

    const initiateChat = async (e)=>{
      if(!activeChats.conversation){

        /* ---------> DISPATCH FETCH ACTIVE CHAT <---------- */
        dispatch({type: 'FETCH_ACTIVE_CHAT'})
        const response = await AUTHORIZED_REQ(CHAT_API.CHAT_INIT_API,{ToUserID:props.storeUser._id},{},'POST');
        if(response.data.errCode==='SUCCESS') dispatch({type:'FETCH_ACTIVE_CHAT_SUCCESS', payload:response.data.conversation})
        else dispatch({type:'FETCH_ACTIVE_CHAT_FAILURE'})
        /* ---------> DISPATCH FETCH ACTIVE CHAT <---------- */
  
        overlay.setOverlay('Chat');
        overlay.setCustomOverlayProps({conversationID:response.data.conversation.conversationID,
          toUser : props.storeUser, 
          toStore : chatHeader, 
          setShowChatBox: overlay.setShowOverlay})
        overlay.setShowOverlay(true);
      }
    }

  useEffect(()=>{
    Load_Chat_Meta_Data()
  },[Load_Chat_Meta_Data]);

  return (
    <>
      <div className={CSS.main} onClick={initiateChat}>
        <img src={`${BACKEND_BASE}/${chatHeader.storePic}`} alt=' '/>
        <div className={CSS.Content}>
          <span className={CSS.Header}>{chatHeader.storeName}</span>
          <span>{props.latestConversation.message}</span>
        </div>
      </div>
    </>

  )
}
