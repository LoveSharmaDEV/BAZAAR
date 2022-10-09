import React, { useRef, useState } from 'react'
import {useToasts } from 'react-toast-notifications';
import {Navigate} from 'react-router-dom'
import ReactLoading from "react-loading";
import CSS from './SignupPage.module.css';
import { AUTH_API, BACKEND_BASE} from '../../MasterData/GlobalData';
import Button from 'react-bootstrap/Button'
import axios from 'axios'


export default function SignupPage(props) {
  const [signupInfo, setsignupInfo] = useState({});
  const { addToast } = useToasts();
  const formref = useRef();
  const roleref = useRef();
  const queryParams = new URLSearchParams(window.location.search);
  const role = queryParams.get("role");


  const [status, setStatus] = useState({
    "loading": false,
    "signupsuccess":false
  })

  const signupData = (e)=>{
    setsignupInfo({
      ...signupInfo,
      [e.target.name]:e.target.value,
      "role": roleref.current.value
    })
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



  const onSubmit= async (e)=>{

    e.preventDefault();

    if(!formref.current.checkValidity()){
      formref.current.reportValidity()
      return;
    }
    
    if(signupInfo.password!==signupInfo.confirmpassword){
      addToast("PASSWORD MISMATCH", { appearance: 'error' });
      return;
    }

    setStatus({...status, loading:true});
    const data = await axios.post(AUTH_API.SIGNIN_API,signupInfo);
    setStatus({...status, loading:false})
    
    if(data.data.errCode==="USERCREATED")
    {
      addToast(data.data.message, { appearance: 'success' });
      formref.current.reset()
      setStatus({...status,"signupsuccess":true} )
      return 
    }
    else
    {addToast(data.data.message, { appearance: 'error' });
    return }
  }


  
  return (
    <div  className={CSS.main}>
      {
      status.loading && !status.signupsuccess?
       
        <ReactLoading type="spin" color="#0000FF" height={100} width={50} />:
      
      !status.loading&&!status.signupsuccess?    

          <form className={CSS.form} ref={formref} method='POST' value={signupInfo} onChange={signupData}>
            <div className={CSS.signupcard}>
              <div className={CSS.signupcardinput}>
                <div className={CSS.inputdata}>
                  <input name='email' type='text' required/>
                  <div className={CSS.underline}></div>
                  <label>Email</label>
                </div>  
                <div className={CSS.inputdata}>
                  <input name='username' type='text' autoComplete='off' required/>
                  <div className={CSS.underline}> </div>
                  <label>Username</label>
                </div> 
                <div className={CSS.inputdata}>
                  <input name='password' type='password' autoComplete='off' required/>
                  <div className={CSS.underline}></div>
                  <label>Password</label>
                </div> 
                <div className={CSS.inputdata}>
                  <input name='confirmpassword' type='password' autoComplete='off' required/>
                  <div className={CSS.underline}></div>
                  <label>Confirm Password</label>
                </div> 
                <div className={CSS.inputdata}>
                  <input name='contact' type='tel' autoComplete='off' required/>
                  <div className={CSS.underline}></div>
                  <label>Contact No.</label>
                </div> 
                <div className={CSS.inputdata}>
                  <input name='DOB' type='Date' autoComplete='off' required/>
                  <div className={CSS.underline}></div>
                  <label>DOB</label>
                </div>
                {role==="seller"?
                <div className={CSS.inputdata}>
                  <input name='storeName' type='text' autoComplete='off' required/>
                  <div className={CSS.underline}></div>
                  <label>Store Name</label>
                  <input ref={roleref} type='hidden' name="role" value="SELLER"/>
                </div>
                :<input ref={roleref} type='hidden' name="role" value="CUSTOMER"/> } 
              </div> 

              <Button type='submit' onClick={onSubmit} variant="primary" size='lg'>SIGNUP</Button>

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
          </form>:
          
      !status.loading&&status.signupsuccess?
          
          <Navigate to="/login"/>:""
      }
    </div>
  )
}
