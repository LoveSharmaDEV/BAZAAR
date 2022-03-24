import React from 'react'
import css from './SignUpAsPage.module.css'
import customer from '../../utils/people.png'
import seller from '../../utils/seller.png'
import {Link} from 'react-router-dom'


export default function SignUpAsPage() {
  return (
    <div className={css.main}>
      <Link className={css.link} to='/signup?role=customer'>      
        <div className={css.signupascustomer}>
          <img src={customer} alt='Customer'/>
          <label>CUSTOMER</label>
        </div>
      </Link>

      <Link className={css.link} to='/signup?role=seller'>
        <div className={css.signupasseller}>
          <img src={seller} alt="Seller"/>
          <label>SELLER</label>
        </div>
      </Link>
    </div>
  )
}
