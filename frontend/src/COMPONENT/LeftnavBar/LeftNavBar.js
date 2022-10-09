import React, {useCallback,useLayoutEffect, useState} from 'react'
import CSS from './LeftNavBar.module.css'
import { LeftNavBarData } from './LeftNavBarData'
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { useAuth } from '../../CONTEXT API CUSTOM HOOKS/AUTH_CUSTOM_HOOK';
import { BACKEND_BASE } from '../../MasterData/GlobalData';
const cookies = new Cookies();

export default function LeftNavBar(props) {
  const [hide,setHide]= useState(false);
  const {optionSelected,setOptionSelected} = props;
  const auth = useAuth();
  const navigate = useNavigate();

  const activeTabs = useCallback(()=>{
    const activeElement = Array.from(document.getElementsByClassName(CSS.active))[0];
    if(activeElement) activeElement.classList.remove(CSS.active);
    
    document.querySelector(`[data-value="${optionSelected}"]`).classList.add(CSS.active);
  },[optionSelected])


  const toggleListeners = useCallback(()=>{
    const slider = Array.from(document.getElementsByClassName(CSS.slider))[0];
    const NavBar = Array.from(document.getElementsByClassName(CSS.main))[0];

    function transform0px() {
      NavBar.style.transform = 'translateX(0px)';
    }

    if(hide){
      NavBar.style.transform = 'translateX(-3000px)'
      NavBar.style.position = 'absolute'
      slider.addEventListener('click', transform0px)
    }
    else{
      NavBar.style.transform = 'translateX(0)'
      NavBar.style.position = 'static'
      slider.removeEventListener('click',transform0px);
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

    activeTabs();

    /* Cleanup */
    return()=>{
      Observer.disconnect();
    }
  },[hide, toggleListeners,activeTabs])




  const onSelect = (e)=>{
    setOptionSelected(e.target.dataset.value);
    cookies.set('optionSelected', e.target.dataset.value);
    cookies.set('selectedPath', e.target.dataset.path);
    const NavBar = Array.from(document.getElementsByClassName(CSS.main))[0];
    activeTabs();
    if(hide){      
          NavBar.style.transform = 'translateX(-3000px)'
    }    
    navigate(e.target.dataset.path)
  }


  return (
  <>
    <img 
    className={CSS.slider} 
    src={`${BACKEND_BASE}/door.png`} 
    alt="PULL"
    />
    <div className={CSS.main}>
      {
          LeftNavBarData.filter((val)=> auth.user.role==='CUSTOMER'?val.title!=='Store':true).map((val,key)=>
          {
            return(      
                <div className={CSS.LeftNavBarItem} data-value={val.title} data-path={val.path} onClick={onSelect} key={key}>
                  <div className={CSS.LeftNavBarContent}>
                    <img src={val.icon} alt="Home"/>
                    <label>{val.title}</label>
                    <div className={CSS.overlay}></div>
                  </div>
                </div>
            )
          })
      }
    </div>
  </>
  )
}
