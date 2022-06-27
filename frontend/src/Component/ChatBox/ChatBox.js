import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import ChatBoxCss from './ChatBox.module.css'
import { useSelector,useDispatch } from 'react-redux';
import { removefromActiveChat } from '../../Redux/Reducers/fetchActiveChats_reducer';
import makeRequest from '../../Commons/makeRequest';
import socket from '../../API CHANGESTREAMS/socket';
import { useAuth } from '../../Hooks';
import { add_to_conversation } from '../../Redux/Reducers/fetchConversations_reducer';

export default function ChatBox(props) {
  const dispatch = useDispatch();
  const [message, setMessage]= useState({});
  const formref = useRef();
  const auth = useAuth();
  const messagesEndRef = useRef();
  const conversations = useSelector((state)=>{
    return state.conversations.conversations
  })



  const sendMessage = async (e) => {
    try{
      e.preventDefault();
      if(!formref.current.checkValidity()){
        formref.current.reportValidity()
        return;
      }
      const response = await makeRequest('http://localhost:8000/message',{message,conversationID:props.conversationID},'POST');
      if(response.data.errCode === "SUCCESS") {
        socket.socket.emit('ChatChangeStream', {conversationID:props.conversationID, message});
        dispatch(add_to_conversation(props.conversationID,message))
      }
    }
    catch(e){
      console.log(`-----------------------ERROR OCCURED-----------------------------${e.message}`)
    }
  }

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
    props.setShowChatBox(false);
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
    socket.socket.on(props.conversationID,({message})=>{
      dispatch(add_to_conversation(props.conversationID,message))
    });

    return ()=>{
      socket.socket.close();
    }
  },[dispatch,props.conversationID])


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
