import React from 'react'
import css from './SignUpAsPage.module.css'
import {Link} from 'react-router-dom'
import { BACKEND_BASE } from '../../MasterData/GlobalData'


export default function SignUpAsPage() {
  return (
    <div className={css.main}>
      <Link className={css.link} to='/signup?role=customer'>      
        <div className={css.signupascustomer}>
          <img src={`${BACKEND_BASE}/people.png`} alt='Customer'/>
          <label>CUSTOMER</label>
        </div>
      </Link>

      <Link className={css.link} to='/signup?role=seller'>
        <div className={css.signupasseller}>
          <img src={`${BACKEND_BASE}/seller.png`} alt="Seller"/>
          <label>SELLER</label>
        </div>
      </Link>
    </div>
  )
}
