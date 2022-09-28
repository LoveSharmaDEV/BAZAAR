import React, { useEffect, useState } from 'react'
import StoreManageAccountCss from './StoreManageAccount.module.css'
import AUTHORIZED_REQ from '../../../COMMON_UTILS/AUTHORIZED_REQUEST'
import { STRIPE_API } from '../../../MasterData/GlobalData';
import ReactLoading from 'react-loading';


function StoreManageAccount() {

  const [buttonView,setButtonView] = useState({
    showCreateConnectedAccountBtn:false,
    showContinueOnBoardingProcessBtn:false
  })

  const [apiStatus, setApiStatus] = useState({
    loading:false,
    error:false
  });

  
  const createConnectedAccount = async ()=>{
    setApiStatus({
      loading:true,
      error:false
    });
    const response =  await AUTHORIZED_REQ(STRIPE_API.STRIPE_CONNECTED_ACCOUNT,{},{},'POST');
    if(response.data.errCode==='SUCCESS')
    {
      setApiStatus({
        loading:false,
        error:false
      });
      window.location=response.data.url
    }
    else{
      setApiStatus({
        loading:false,
        error:true
      });
    }
  }

  const continueOnBoardingProcess = async ()=>{
    setApiStatus({
      loading:true,
      error:false
    });
    const response =  await AUTHORIZED_REQ(STRIPE_API.STRIPE_CONTINUE_ONBOARDING,{},{},'POST');
    if(response.data.errCode==='SUCCESS')
    {
      setApiStatus({
        loading:false,
        error:false
      });
      window.location=response.data.url
    }
    else{
      setApiStatus({
        loading:false,
        error:true
      });
    }
  }

  const CheckVendorAccountConfig = async ()=>{
    setApiStatus({
      loading:true,
      error:false
    });
    const response = await AUTHORIZED_REQ(STRIPE_API.STRIPE_ACCOUNT_CHECK,{},{},'POST');
    if(response.data.errCode==='SUCCESS')
    {
      setApiStatus({
        loading:false,
        error:false
      });
      setButtonView({
        showCreateConnectedAccountBtn:response.data.createAccount,
        showContinueOnBoardingProcessBtn:response.data.continueOnBoarding
      })
    }
    else{
      setApiStatus({
        loading:false,
        error:true
      });
    }
  }

  useEffect(()=>{

    CheckVendorAccountConfig();

  },[])

  return (
    <div className={StoreManageAccountCss.OuterDiv}>
      
        {
          apiStatus.loading && !apiStatus.error?
            <ReactLoading type='spin' color='blue' height={'3%'} width={'3%'} />
            :
            !apiStatus.loading && apiStatus.error?
              <span>Internal Server Issue</span>
              :
              buttonView.showCreateConnectedAccountBtn?
              <button onClick={createConnectedAccount} className={StoreManageAccountCss.button66}>LINK YOUR ACCOUNT</button>   
              :
              buttonView.showContinueOnBoardingProcessBtn?
                <button onClick={continueOnBoardingProcess} className={StoreManageAccountCss.button66}>CHECK ONBOARDING PROCESS</button>        
                :  
                !buttonView.showCreateConnectedAccountBtn && !buttonView.showContinueOnBoardingProcessBtn?
                  <>
                    <span className={StoreManageAccountCss.Message1}>Your Account is configured</span>
                    <span className={StoreManageAccountCss.Message2}>For Updating Please Click On Below Button</span>
                    <button onClick={continueOnBoardingProcess} className={StoreManageAccountCss.button66}>UPDATE</button>        
                  </> 
                  :
                  null
        }
    </div>
  )
}

export default StoreManageAccount