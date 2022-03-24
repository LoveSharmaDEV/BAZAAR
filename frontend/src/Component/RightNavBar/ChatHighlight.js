import React, { useCallback, useEffect, useState} from 'react'
import css from './ChatHighlight.module.css'
import { useAuth } from '../../Hooks/index';
import makeRequest from '../../Commons/makeRequest'

export default function ChatHighlight(props) {
  const [chatHeader, setChatHeader]= useState('');
  const {chat} = props;
  const {user} = useAuth();
  
  const fetchChatHighlight = useCallback(async ()=>{
    if(user.role==='SELLER'){
      const response = await makeRequest('http://localhost:8000/fetch/customer',{customer_id:chat.conversationID.split('#')[0]},'POST')
      if(response.data.errCode==='SUCCESS')setChatHeader(response.data.data.username)
    }
    else if(user.role==='CUSTOMER'){
      const response = await makeRequest('http://localhost:8000/fetch/seller',{customer_id:chat.conversationID.split('#')[1]},'POST')
      if(response.data.errCode==='SUCCESS')setChatHeader(response.data.data.storeName)      
    }
  },[]);

  useEffect(()=>{
    fetchChatHighlight().catch(()=>{console.log('Error Occured')});
  },[fetchChatHighlight]);

  
  return (
    <div className={css.main}>
      <span>{chatHeader}</span>
    </div>
  )
}
