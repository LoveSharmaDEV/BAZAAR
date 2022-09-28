import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react'
import css from './RightNavBar.module.css'
import {useDispatch,useSelector} from 'react-redux';
import ChatHighlight from './ChatHighlight';
import { APICALL_GETCONVERSATION } from '../../REDUX/REDUCERS/CONVERSATION__REDUCER';
import ReactLoading from 'react-loading';
import { useAuth } from '../../CONTEXT API CUSTOM HOOKS/AUTH_CUSTOM_HOOK';
import { BACKEND_BASE } from '../../MasterData/GlobalData';


export default function RightNavBar() {
  const dispatch = useDispatch();
  const [hide,setHide]= useState(false);
  const auth = useAuth();
  const conversations = useSelector((state) => {
    return state.conversations
  })


  const toggleListeners = useCallback(()=>{
    const slider_show = Array.from(document.getElementsByClassName(css.slider_show))[0];
    const NavBar = Array.from(document.getElementsByClassName(css.main))[0];
    const slider_hide = Array.from(document.getElementsByClassName(css.slider_hide))[0];

    function transform0px() {
      NavBar.style.transform = 'translateX(0px)';
    }

    function transform350px(){
      NavBar.style.transform = 'translateX(3000px)';
    }

    if(hide)
    {
      NavBar.style.position = 'absolute'
      NavBar.style.transform = 'translateX(3000px)';
      slider_show.addEventListener('click', transform0px)
      slider_hide.addEventListener('click', transform350px)
    }
    else
    {
      NavBar.style.position = 'static'
      NavBar.style.transform = 'translateX(0px)';
      slider_show.removeEventListener('click',transform0px);
      slider_hide.replaceWith(slider_hide.cloneNode());

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
    dispatch(APICALL_GETCONVERSATION())
  },[dispatch])

  return (
    <>
      <img className={css.slider_show} src={`${BACKEND_BASE}/door.png`} alt="PULL"/>
      <div className={css.main}>
          <div className={css.RightNavBar_header}>
            <span>CHATS</span>
            <img className={css.slider_hide} src={`${BACKEND_BASE}/row.png`} alt='backarrow'/>
          </div>
          <div className={css.RightNavBar_footer}>
              {
                conversations.loading && !conversations.error?
                  <ReactLoading type='spin' color='blue' height={'5%'} width={'5%'} />        
                  :
                  !conversations.loading && !conversations.error?
                    conversations.conversations.map((conversation,key)=>{
                      const storeUser = conversation.participants.filter((participant)=>participant._id!==auth.user._id)[0];
                      const latestConversation = conversation.message[conversation.message.length-1];
                      return <ChatHighlight  
                              storeUser={storeUser} 
                              latestConversation={latestConversation}  
                              key={key}
                              />
                    })
                    :
                    ''
              }
          </div>
      </div>
    </>
  )
}
