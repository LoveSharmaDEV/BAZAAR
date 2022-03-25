import React, { useLayoutEffect } from 'react'
import ChatBoxCss from './ChatBox.module.css'
import close from '../../utils/close.png'
import { useDispatch } from 'react-redux';
import { removefromActiveChat } from '../../Redux/Reducers/fetchActiveChats_reducer';

export default function ChatBox(props) {

  const dispatch = useDispatch();

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
      dragElement(ChatHeader)
    },[])


  return (
    <div className={ChatBoxCss.main}>
      <div className={ChatBoxCss.cross_div}>
        <img onClick={closeChatBox} src={close} alt='Cross'/>
      </div>
      <div className={ChatBoxCss.chats_div}>
      </div>
      <div className={ChatBoxCss.formInput_div}>
        <form method='POST'>
          <input type='text'/>
          <button>SEND</button>
        </form>
      </div>  
    </div>
  )
}
