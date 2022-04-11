import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import ChatBoxCss from './ChatBox.module.css'
import close from '../../utils/close.png'
import { useDispatch } from 'react-redux';
import { removefromActiveChat } from '../../Redux/Reducers/fetchActiveChats_reducer';
import makeRequest from '../../Commons/makeRequest';
import socket from '../../API CHANGESTREAMS/socket';
import { useAuth } from '../../Hooks';

export default function ChatBox(props) {

  const dispatch = useDispatch();
  const [message, setMessage]= useState({});
  const [messages, setMessages] = useState([]);
  const formref = useRef();
  const auth = useAuth();
  const messagesEndRef = useRef();

  const fetchMessages = async () => {
    const response = await  makeRequest('http://localhost:8000/fetch/chat',{conversationID:props.conversationID},'POST');
    if(response.data.errCode ==="SUCCESS"){
      setMessages(response.data.message)
    }
  }


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
        setMessages([...messages, message]);
        scrollToBottom();
      }
    }
    catch(e){
      console.log(`-----------------------ERROR OCCURED-----------------------------`)
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

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
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

  useEffect(()=>{
    fetchMessages();

    socket.socket.on(props.conversationID,({message})=>{
      setMessages((prev)=>{
        return [...prev,message]
      });
      scrollToBottom();
    });

    return ()=>{
      socket.socket.close();
    }

  },[])


  return (
    <div className={ChatBoxCss.main}>
      <div className={ChatBoxCss.cross_div}>
        <img onClick={closeChatBox} src={close} alt='Cross'/>
      </div>
      <div className={ChatBoxCss.chats_div} ref={messagesEndRef}>
        {messages.map((message,key)=>{
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
