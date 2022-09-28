import React, { useEffect, useRef, useState } from 'react';
import ReactLoading from "react-loading";
import {useToasts } from 'react-toast-notifications';
import logincss from './LoginPage.module.css'
import { useAuth } from '../../CONTEXT API CUSTOM HOOKS/AUTH_CUSTOM_HOOK';

export default function LoginPage(props) {
  const [loginInfo, setloginInfo]= useState({});
  const { addToast } = useToasts();
  const auth = useAuth();
  const formref = useRef();


  const loginData = (e)=>{
    setloginInfo({
      ...loginInfo,
      [e.target.name]:e.target.value
    })
  }

  const onlogin = async (e)=>{
    e.preventDefault();

    if(!formref.current.checkValidity()){
      formref.current.reportValidity()
      return;
    }
    const data = await auth.login(loginInfo);

    if(data.errCode!=="TOKENSGENERATED")
    {
      addToast(data.message, { appearance: 'error' });
      formref.current.reset()
    }
  }

useEffect(()=>{
  props.setBarVisibility(    
    {
    rightNavBarVisibility:false,
    leftNavBarVisibility:false,
    topNavBarVisibility:true,
    EcomNavBarVisibility:false
  })
},[ ])

  
  return (
    <div className={logincss.main}>
      {
      !auth.user && auth.loading?
      
        <ReactLoading type="spin" color="#0000FF" height={100} width={50} />:

      !auth.user && !auth.loading?

        <form ref={formref} method='POST' onChange={loginData}>
          <div className={logincss.logincard}>
            <div className={logincss.inputdata}>
              <input type='text' name='email' autoComplete='off' required/>
              <div className={logincss.underline}></div> 
              <label>Username</label>
            </div>
            <div className={logincss.inputdata}>
              <input type='password' name="password" autoComplete='off' required/>
              <div className={logincss.underline}></div> 
              <label>Password</label>
            </div>
            <button type='submit' className={logincss.button66} onClick={onlogin}>Login</button>
          </div>
        </form>:null
      }
    </div>
  )
}
