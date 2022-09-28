import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { BACKEND_BASE } from '../../MasterData/GlobalData'
import CSS from './LandingPage.module.css'

export default function LandingPage(props) {
  
  const navigate = useNavigate();

  const NavigateToFeeds = ()=>{
    navigate('/posts')
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
    <div className={CSS.LandingPage__Outer}>

      <div className={CSS.Outer__Content}>

        <div className={CSS.Content__Info}>

          <div className={CSS.Info__Logo}>
            <img onClick={()=>{navigate('/home')}} src={`${BACKEND_BASE}/Logo.jpg`} alt=''/>
          </div>

          <div className={CSS.Info__Details}>

            <span className={CSS.Details__Span1}>BAZAAR</span>

            <span className={CSS.Details__Span2}>

              BAZAAR IS A MARKETPLACE, WHERE YOU CAN CREATE YOUR OWN ECOMMERCE STORE
              OR SEARCH OVER YOUR DESIRED STORES.

            </span>

            <div className={CSS.Details__SignUpAs}>
              
              <span className={CSS.SignUpAs__Header}>SIGN UP AS</span>
              
              <div className={CSS.SignUpAs__Options}>

                <Link className={CSS.link} to='/signup?role=customer'> 
                  <div className={CSS.Options__Customer}>
                    <img src={`${BACKEND_BASE}/customer.png`} alt=' '/>
                    <label>CUSTOMER</label>
                  </div>     
                </Link>

                <Link className={CSS.link} to='/signup?role=seller'>
                  <div className={CSS.Options__Seller}>
                    <img src={`${BACKEND_BASE}/salesman.png`} alt=" "/>
                    <label>SELLER</label>
                  </div>
                </Link>

              
              </div>

            </div>

          </div>

        </div>

        <div className={CSS.Content__Poster}>
          <img src={BACKEND_BASE+'/DesignPattern.png'}/>
          <div className={CSS.Poster__Overlay}></div>
          <div onClick={NavigateToFeeds} className={CSS.Poster__Button}>
            <div className={CSS.Poster__Button_Animation}></div>
            <span>ENTER YOUR FEEDS</span>
          </div>
        </div>

      </div>

    </div>
  )
}
