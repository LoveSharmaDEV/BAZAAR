import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react'
import css from './RightNavBar.module.css'
import {useDispatch,useSelector} from 'react-redux';
import ChatHighlight from './ChatHighlight';
import { fetch_conversations } from '../../Redux/Reducers/fetchConversations_reducer';

export default function RightNavBar() {
  const dispatch = useDispatch();
  const [hide,setHide]= useState(false);
  const conversations = useSelector((state) => {
    return state.conversations.conversations
  })



  const toggleListeners = useCallback(()=>{
    const slider_show = Array.from(document.getElementsByClassName(css.slider_show))[0];
    const NavBar = Array.from(document.getElementsByClassName(css.main))[0];
    const slider_hide = Array.from(document.getElementsByClassName(css.slider_hide))[0];

    function transform0px() {
      NavBar.style.transform = 'translateX(0px)';
    }

    function transform350px(){
      NavBar.style.transform = 'translateX(350px)';
    }

    if(hide)
    {
      NavBar.style.position = 'absolute'
      NavBar.style.transform = 'translateX(350px)';
      slider_show.addEventListener('click', transform0px)
      slider_hide?.addEventListener('click', transform350px)
    }
    else
    {
      NavBar.style.position = 'static'
      NavBar.style.transform = 'translateX(0px)';
      slider_show.removeEventListener('click', transform0px);
      slider_hide.removeEventListener('click', transform350px);
    }
  },[hide])

  useLayoutEffect(()=>{
    /* Add a resize Observer -Start */
    const Observer = new ResizeObserver((entries)=>{
      const boxElement = entries[0];
      if(boxElement.contentRect.width<953){
        setHide(true)
      }
      else{
        setHide(false)
      }
    })
    Observer.observe(document.body);
    /* Add a resize Observer -End */

    toggleListeners()


    /* Cleanup */
    return()=>{
      Observer.disconnect();
    }
  },[hide, toggleListeners])

  useEffect(()=>{
    dispatch(fetch_conversations())
  },[dispatch])

  return (
    <>
      <img className={css.slider_show} src='http://localhost:8000/door.png' alt="PULL"/>
      <div className={css.main}>
          <div className={css.RightNavBar_header}>
            <span>CHATS</span>
            <img className={css.slider_hide} src='http://localhost:8000/back-arrow.png' alt='backarrow'/>
          </div>
          <div className={css.RightNavBar_footer}>
              {conversations.map((conversation,key)=>{
                return <ChatHighlight  conversation={conversation}  key={key}/>
              })}
          </div>
      </div>
    </>
  )
}
