import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import CSS from './ChatBox.module.css'
import { useSelector,useDispatch } from 'react-redux';
import { addtoActiveChat, removefromActiveChat } from '../../../REDUX/REDUCERS/FETCHACTIVECHAT__REDUCER';
import AUTHORIZED_REQ from '../../../COMMON_UTILS/AUTHORIZED_REQUEST';
import { useChatSocketContext } from '../../../CONTEXT API CUSTOM HOOKS/CHATSOCKET_CUSTOM_HOOK';
import { useAuth } from '../../../CONTEXT API CUSTOM HOOKS/AUTH_CUSTOM_HOOK';
import { useOverlayContext } from '../../../CONTEXT API CUSTOM HOOKS/OVERLAY_CUSTOM_HOOK';
import { BACKEND_BASE, CHAT_API } from '../../../MasterData/GlobalData';
import { add_to_conversation } from '../../../REDUX/REDUCERS/CONVERSATION__REDUCER';

export default function ChatBox(props) {

  /* LOCAL STATE --> START */
  const [message, setMessage]= useState({});
  /* LOCAL STATE --> END */

  /* CONTEXT USED --> START */
  const chatSocket = useChatSocketContext();
  const auth = useAuth();
  const overlay = useOverlayContext();
  /* CONTEXT USED --> END */

  /* DOM ACCESS --> START */
  const formref = useRef();
  const messagesEndRef = useRef();
  /* DOM ACCESS --> END */

  /* REDUX --> START */
  const dispatch = useDispatch();
  const activeChats = useSelector((state)=>{
    return state.activechats
  })
  /* REDUX --> START */

  /* FORM HANDLE --> START */
  const sendMessage = async (e) => {
    try{
      e.preventDefault();
      if(!formref.current.checkValidity()){
        formref.current.reportValidity()
        return;
      }

      const response = await AUTHORIZED_REQ(CHAT_API.SAVE_CHAT_MESSAGE,
        {
          message,
          conversationID:activeChats?.conversation.conversationID
        },
        {},
        'POST');

      if(response.data.errCode === "SUCCESS") {
        chatSocket.socketref.current.emit('ChatChangeStream', {conversationID:props.conversationID, message});
        dispatch(addtoActiveChat(message));
        dispatch(add_to_conversation(props.conversationID,message))
      }
    }
    catch(e){
      console.log(`-----------------------ERROR OCCURED-----------------------------${e.message}`)
    }
  }
  /* FORM HANDLE --> END */
  


  const onMessageChange = (e)=>{
    setMessage({
      ...message,
      From:auth.user._id,
      To: props.toUser._id,
      [e.target.name]:e.target.value
    })
  }


  function dragElement(elmnt) {
    const ChatBox = Array.from(document.getElementsByClassName(CSS.main))[0];
    elmnt.onmousedown = dragMouseDown;
    
  
    function dragMouseDown(e) {
      document.onmouseup = closeDragElement;
      document.onmousemove = elementDrag;
    }
  
    function elementDrag({movementX, movementY}){
      let ChatBoxStyle = window.getComputedStyle(ChatBox);
      let left = parseInt(ChatBoxStyle.left);
      let top = parseInt(ChatBoxStyle.top);
      ChatBox.style.left = `${left+movementX}px`;
      ChatBox.style.top = `${top+movementY}px`;
    }
  
    function closeDragElement() {
      document.onmouseup = null;
      document.onmousemove = null;
    }
  }

  const closeChatBox=()=>{
    dispatch(removefromActiveChat());
    overlay.setShowOverlay(false)
  }
  
    
  useLayoutEffect(()=>{
    const ChatHeader = Array.from(document.getElementsByClassName(CSS.cross_div))[0];
    dragElement(ChatHeader);
  },[])

  useLayoutEffect(()=>{
    const ChatBody = Array.from(document.getElementsByClassName(CSS.chats_div))[0];
    ChatBody.scrollTop = ChatBody.scrollHeight;
  })

  useEffect(()=>{
    chatSocket.socketref.current.on(props.conversationID,({message})=>{
      dispatch(addtoActiveChat(message))
    });

    return ()=>{
      chatSocket.socketref.current.close();
    }
  },[dispatch,props.conversationID,chatSocket.socket])


  return (
    <div className={CSS.main}>

      <div className={CSS.cross_div}>
        <img className={CSS.crossimg} 
          onClick={closeChatBox} 
          src={`${BACKEND_BASE}/close.png`}
          alt='Cross'
        />
        <span className={CSS.chatHeader}>{props?.toStore?.storeName}</span>
        <img className={CSS.profilepic} 
          onClick= {closeChatBox} 
          src={
                props.toUser.role==='SELLER'?
                `${BACKEND_BASE}/${props.toStore.storePic}`
                :
                `${BACKEND_BASE}/${props.toUser.profilepic}`
              } 
          alt=' '
        />
      </div>

      <div className={CSS.chats_div} ref={messagesEndRef}>
        {activeChats?.conversation.message.map((message,key)=>{
            return <div className={`${CSS.chatItem} ${message.From === auth.user._id?CSS.chatAlignLeft:CSS.chatAlignRight}`} key={key}>
              <span>{message.message}</span>
            </div>
          })}
      </div>

      <div className={CSS.formInput_div}>
        <form ref={formref} method='POST' onChange={onMessageChange}>
          <input type='text' name='message'/>
          <button onClick={sendMessage}>SEND</button>
        </form>
      </div>  

    </div>
  )
}
