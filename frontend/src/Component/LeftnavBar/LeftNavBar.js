import React, {useCallback,useLayoutEffect, useState} from 'react'
import css from './LeftNavBar.module.css'
import { LeftNavBarData } from './LeftNavBarData'
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

export default function LeftNavBar(props) {
  const [hide,setHide]= useState(false);
  const {optionSelected,setOptionSelected} = props;
  const navigate = useNavigate();

  const activeTabs = useCallback(()=>{
    const activeElement = Array.from(document.getElementsByClassName(css.active))[0];
    if(activeElement) activeElement.classList.remove(css.active);
    
    document.querySelector(`[data-value="${optionSelected}"]`).classList.add(css.active);
  },[optionSelected])


  const toggleListeners = useCallback(()=>{
    const slider = Array.from(document.getElementsByClassName(css.slider))[0];
    const NavBar = Array.from(document.getElementsByClassName(css.main))[0];

    function transform0px() {
      NavBar.style.transform = 'translateX(0px)';
    }

    if(hide){
      NavBar.style.transform = 'translateX(-250px)'
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
    const NavBar = Array.from(document.getElementsByClassName(css.main))[0];
    activeTabs();
    if(hide){      
          NavBar.style.transform = 'translateX(-250px)'
    }    
    navigate(e.target.dataset.path)
  }


  return (
  <>
    <img className={css.slider} src='http://localhost:8000/door.png' alt="PULL"/>
    <div className={css.main}>
      {
          LeftNavBarData.map((val,key)=>
          {
            return(      
                <div className={css.LeftNavBarItem} data-value={val.title} data-path={val.path} onClick={onSelect} key={key}>
                  <div className={css.LeftNavBarContent}>
                    <img src={val.icon} alt="Home"/>
                    <label>{val.title}</label>
                    <div className={css.overlay}></div>
                  </div>
                </div>
            )
          })
      }
    </div>
  </>
  )
}
