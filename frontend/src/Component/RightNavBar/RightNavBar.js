import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react'
import css from './RightNavBar.module.css'
import door from '../../utils/door.png'
import backarrow from '../../utils/back-arrow.png'
import {useSelector,useDispatch } from 'react-redux';
import { fetch_chat_action } from '../../Redux/Reducers/fetchChat_reducer';
import ChatHighlight from './ChatHighlight';


export default function RightNavBar() {
  const [hide,setHide]= useState(false);
  const dispatch = useDispatch();
  const chats = useSelector((state)=>{
    return state.chats
  }) 


  const toggleListeners = useCallback(()=>{
    const slider_show = Array.from(document.getElementsByClassName(css.slider_show))[0];
    const NavBar = Array.from(document.getElementsByClassName(css.main))[0];
    const slider_hide = Array.from(document.getElementsByClassName(css.slider_hide))[0];

    if(hide)
    {
      NavBar.style.position = 'absolute'
      NavBar.style.transform = 'translateX(350px)';
      slider_show.addEventListener('click', ()=>{
        NavBar.style.transform = 'translateX(0px)';
      })
      slider_hide?.addEventListener('click', ()=>{
        NavBar.style.transform = 'translateX(350px)';
      })
    }
    else
    {
      NavBar.style.position = 'static'
      NavBar.style.transform = 'translateX(0px)';
      slider_show.replaceWith(slider_show.cloneNode(true));
      slider_hide.replaceWith(slider_hide.cloneNode(true));
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
    dispatch(fetch_chat_action())
  },[dispatch])


  return (
    <>
      <img className={css.slider_show} src={door} alt="PULL"/>
      <div className={css.main}>
          <div className={css.RightNavBar_header}>
            <span>CHATS</span>
            <img className={css.slider_hide} src={backarrow} alt='backarrow'/>
          </div>
          <div className={css.RightNavBar_footer}>
              {chats.chats.map((chat,key)=>{
                return <ChatHighlight chat={chat} key={key}/>
              })}
          </div>
      </div>
    </>
  )
}
