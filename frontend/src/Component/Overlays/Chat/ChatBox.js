import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import ChatBoxCss from './ChatBox.module.css'
import { useSelector,useDispatch } from 'react-redux';
import { removefromActiveChat } from '../../../Redux/Reducers/fetchActiveChats_reducer';
import makeRequest from '../../../Commons/makeRequest';
import { useChatSocketContext } from '../../../Hooks/chatSocket';
import { useAuth } from '../../../Hooks';
import { add_to_conversation } from '../../../Redux/Reducers/fetchConversations_reducer';
import { useOverlayContext } from '../../../Hooks/overlay';

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
  const conversations = useSelector((state)=>{
    return state.conversations.conversations
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

      const response = await makeRequest(process.env.REACT_APP_CHAT_MESSAGE_API,{message,conversationID:props.conversationID},'POST');
      if(response.data.errCode === "SUCCESS") {
        console.log(message)
        chatSocket.socket.emit('ChatChangeStream', {conversationID:props.conversationID, message});
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
      To: props.toUser,
      [e.target.name]:e.target.value
    })
  }


  function dragElement(elmnt) {
    const ChatBox = Array.from(document.getElementsByClassName(ChatBoxCss.main))[0];
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
    dispatch(removefromActiveChat(props.conversationID));
    overlay.setShowOverlay(false)
  }
  
    
  useLayoutEffect(()=>{
    const ChatHeader = Array.from(document.getElementsByClassName(ChatBoxCss.cross_div))[0];
    dragElement(ChatHeader);
  },[])

  useLayoutEffect(()=>{
    const ChatBody = Array.from(document.getElementsByClassName(ChatBoxCss.chats_div))[0];
    ChatBody.scrollTop = ChatBody.scrollHeight;
  })

  useEffect(()=>{
    console.log(process.env)
    chatSocket.socket.on(props.conversationID,({message})=>{
      dispatch(add_to_conversation(props.conversationID,message))
    });

    return ()=>{
      chatSocket.socket.close();
    }
  },[dispatch,props.conversationID,chatSocket.socket])


  return (
    <div className={ChatBoxCss.main}>

      <div className={ChatBoxCss.cross_div}>
        <img className={ChatBoxCss.crossimg} onClick={closeChatBox} src='http://localhost:8000/close.png' alt='Cross'/>
        <span className={ChatBoxCss.chatHeader}>{props?.toStore?.storeName}</span>
        <img className={ChatBoxCss.profilepic} onClick= {closeChatBox} src={props.toUser.profilepic} alt='ProfilePic'/>
      </div>

      <div className={ChatBoxCss.chats_div} ref={messagesEndRef}>
        {conversations.filter((conversation)=>conversation.conversationID===props.conversationID)[0]?.message.map((message,key)=>{
            return <div className={`${ChatBoxCss.chatItem} ${message.From === auth.user._id?ChatBoxCss.chatAlignLeft:ChatBoxCss.chatAlignRight}`} key={key}>
              <span>{message.message}</span>
            </div>
          })}
      </div>

      <div className={ChatBoxCss.formInput_div}>
        <form ref={formref} method='POST' onChange={onMessageChange}>
          <input type='text' name='message'/>
          <button onClick={sendMessage}>SEND</button>
        </form>
      </div>  

    </div>
  )
}
