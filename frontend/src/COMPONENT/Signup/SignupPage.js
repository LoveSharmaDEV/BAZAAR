import React, { useRef, useState } from 'react'
import {useToasts } from 'react-toast-notifications';
import {Navigate} from 'react-router-dom'
import ReactLoading from "react-loading";
import css from './SignupPage.module.css';
import { AUTH_API} from '../../MasterData/GlobalData';
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

  const onSubmit= async (e)=>{
    e.preventDefault();

    /*-----------------------------------------FORM BASIC VALIDATIONS------------------------------------------*/
    if(!formref.current.checkValidity()){
      formref.current.reportValidity()
      return;
    }
    /*---------------------------------------------------------------------------------------------------------*/

    
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


  
  /*------------------WEB----------------------------------*/                    
  return (
    <div  className={css.main}>
      {
      status.loading && !status.signupsuccess?
       
        <ReactLoading type="spin" color="#0000FF" height={100} width={50} />:
      
      !status.loading&&!status.signupsuccess?    

          <form className={css.form} ref={formref} method='POST' value={signupInfo} onChange={signupData}>
            <div className={css.signupcard}>
              <div className={css.signupcardinput}>
                <div className={css.inputdata}>
                  <input name='email' type='text' required/>
                  <div className={css.underline}></div>
                  <label>Email</label>
                </div>  
                <div className={css.inputdata}>
                  <input name='username' type='text' autoComplete='off' required/>
                  <div className={css.underline}> </div>
                  <label>Username</label>
                </div> 
                <div className={css.inputdata}>
                  <input name='password' type='password' autoComplete='off' required/>
                  <div className={css.underline}></div>
                  <label>Password</label>
                </div> 
                <div className={css.inputdata}>
                  <input name='confirmpassword' type='password' autoComplete='off' required/>
                  <div className={css.underline}></div>
                  <label>Confirm Password</label>
                </div> 
                <div className={css.inputdata}>
                  <input name='contact' type='tel' autoComplete='off' required/>
                  <div className={css.underline}></div>
                  <label>Contact No.</label>
                </div> 
                <div className={css.inputdata}>
                  <input name='DOB' type='Date' autoComplete='off' required/>
                  <div className={css.underline}></div>
                  <label>DOB</label>
                </div>
                {role==="seller"?
                <div className={css.inputdata}>
                  <input name='storeName' type='text' autoComplete='off' required/>
                  <div className={css.underline}></div>
                  <label>Store Name</label>
                  <input ref={roleref} type='hidden' name="role" value="SELLER"/>
                </div>
                :<input ref={roleref} type='hidden' name="role" value="CUSTOMER"/> } 
              </div> 
              <button className={css.button66} type='submit' onClick={onSubmit}>Sign-in</button> 
            </div>
          </form>:
          
      !status.loading&&status.signupsuccess?
          
          <Navigate to="/login"/>:""
      }
    </div>
  )
}
