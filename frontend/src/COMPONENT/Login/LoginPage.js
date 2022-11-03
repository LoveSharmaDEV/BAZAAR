import React, { useEffect, useRef, useState } from 'react';
import ReactLoading from "react-loading";
import {useToasts } from 'react-toast-notifications';
import CSS from './LoginPage.module.css'
import { useAuth } from '../../CONTEXT API CUSTOM HOOKS/AUTH_CUSTOM_HOOK';
import Button from 'react-bootstrap/esm/Button';
import { BACKEND_BASE } from '../../MasterData/GlobalData';

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
        addToast(data.errCode, { appearance: 'error' });
        formref.current.reset()
      }

  }

  const GOOGLE_AUTH = (e)=>{
    window.location = `${BACKEND_BASE}/passport/auth/google`
  }

  const FACEBOOK_AUTH = (e)=>{
    window.location = `${BACKEND_BASE}/passport/auth/facebook`
  }

  const GITHUB_AUTH = (e)=>{
    window.location = `${BACKEND_BASE}/passport/auth/github`
  }

  const AMAZON_AUTH = (e)=>{
    window.location = `${BACKEND_BASE}/passport/auth/amazon`
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
    <div className={CSS.main}>
      {
      !auth.user && auth.loading?
      
        <ReactLoading type="spin" color="#0000FF" height={100} width={50} />:

      !auth.user && !auth.loading?

        <form ref={formref} method='POST' onChange={loginData}>
          <div className={CSS.logincard}>
            <div className={CSS.inputdata}>
              <input type='text' name='email' autoComplete='off' required/>
              <div className={CSS.underline}></div> 
              <label>Username/Email</label>
            </div>
            <div className={CSS.inputdata}>
              <input type='password' name="password" autoComplete='off' required/>
              <div className={CSS.underline}></div> 
              <label>Password</label>
            </div>
            <Button onClick={onlogin} variant="primary" size='lg'>LOGIN</Button>
              <div className={CSS.AuthenticationStrategies}>
                <img 
                className={CSS.AuthenticationStrategies__Icon} 
                src={`${BACKEND_BASE}/google.png`} 
                alt=''
                onClick={GOOGLE_AUTH}
                />

                <img 
                className={CSS.AuthenticationStrategies__Icon} 
                src={`${BACKEND_BASE}/facebook.png`} 
                alt=''
                onClick={FACEBOOK_AUTH}
                />
                
                <img 
                className={CSS.AuthenticationStrategies__Icon} 
                src={`${BACKEND_BASE}/github.png`} 
                alt=''
                onClick={GITHUB_AUTH}
                />

                <img 
                className={CSS.AuthenticationStrategies__Icon} 
                src={`${BACKEND_BASE}/amazon.png`} 
                alt=''
                onClick={AMAZON_AUTH}
                />
              </div>
          </div>
        </form>:null
      }
    </div>
  )
}
