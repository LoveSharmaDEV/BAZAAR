import React, { useCallback, useEffect, useState} from 'react'
import ChatHighlightCSS from './ChatHighlight.module.css'
import { useAuth } from '../../Hooks/index';
import makeRequest from '../../Commons/makeRequest';
import { useDispatch, useSelector} from 'react-redux';
import ChatBox from '../ChatBox/ChatBox';
import { addtoActiveChat } from '../../Redux/Reducers/fetchActiveChats_reducer';



export default function ChatHighlight(props) {
  const [chatHeader, setchatHeader] = useState({});
  const [showChatBox, setShowChatBox] = useState({show: false});  
  const dispatch = useDispatch();
  const {user} = useAuth();
  const activeChats = useSelector((state)=>{return state.activechats.activeChat})
  

  const fetchChatHighlightHeader = useCallback(async (req,res)=>{
    const response = await makeRequest('http://localhost:8000/fetch/chatheader', 
    {toUser:props.conversation.participants.filter((p)=> p!==user._id)[0]},'POST');
    if(response.data.errCode==="SUCCESS") setchatHeader({
                                                            chatHeader:response.data.data.chatHeader,
                                                            chatHeaderImage:response.data.data.chatHeaderImage,
                                                            toUser:response.data.data.toUser,
                                                            toStore:response.data.data.toStore
                                                        })
    },[props.conversation.participants,user._id])


    const initiateChat = async (e)=>{
      if(activeChats){
        let response = await makeRequest('http://localhost:8000/fetch/chatid', {toUser: chatHeader.toUser._id},'POST');
        if(response.data.errCode==='FAILURE'){
          let response = await makeRequest('http://localhost:8000/chatinit', {toUser: chatHeader.toUser._id},'POST');
          if(response.data.errCode==='SUCCESS'){
            dispatch(addtoActiveChat(response.data.conversation.conversationID))
            setShowChatBox({
              show:true,
              conversationID: response.data.conversation.conversationID
            });
          }
        }
        else{
          if(!activeChats.includes(response.data.conversationID)){
            dispatch(addtoActiveChat(response.data.conversationID))
            setShowChatBox({
              show:true,
              conversationID: response.data.conversationID
            });
          }
        }
      }
    }





  useEffect(()=>{
    fetchChatHighlightHeader();
  },[fetchChatHighlightHeader]);

  return (
    <>
      {showChatBox.show?<ChatBox conversationID={props.conversation.conversationID} 
      toUser = {chatHeader.toUser} 
      toStore = {chatHeader.toStore} 
      setShowChatBox={setShowChatBox}/>:null}

      <div className={ChatHighlightCSS.main} onClick={initiateChat}>
        <img src={chatHeader.chatHeaderImage} alt='ProfilePic'/>
        <div className={ChatHighlightCSS.Content}>
          <span className={ChatHighlightCSS.Header}>{chatHeader.chatHeader}</span>
          <span>{props.conversation.message[props.conversation.message.length-1].message}</span>
        </div>
      </div>
    </>

  )
}
