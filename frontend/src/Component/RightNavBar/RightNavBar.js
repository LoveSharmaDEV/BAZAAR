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

          </div>
      </div>
    </>
  )
}
