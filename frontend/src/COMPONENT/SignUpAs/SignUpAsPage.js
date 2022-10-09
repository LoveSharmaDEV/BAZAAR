import React from 'react'
import CSS from './SignUpAsPage.module.css'
import {Link} from 'react-router-dom'
import { BACKEND_BASE } from '../../MasterData/GlobalData'


export default function SignUpAsPage() {
  return (
    <div className={CSS.main}>
      <Link className={CSS.link} to='/signup?role=customer'>      
        <div className={CSS.signupascustomer}>
          <img src={`${BACKEND_BASE}/people.png`} alt='Customer'/>
          <label>CUSTOMER</label>
        </div>
      </Link>

      <Link className={CSS.link} to='/signup?role=seller'>
        <div className={CSS.signupasseller}>
          <img src={`${BACKEND_BASE}/seller.png`} alt="Seller"/>
          <label>SELLER</label>
        </div>
      </Link>
    </div>
  )
}
