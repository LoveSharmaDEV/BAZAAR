import React from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../Hooks';
import EcomNavBarCss from './EcomNavBar.module.css'

const EcomNavBar = (props) => {

    const auth = useAuth();
    const navigate = useNavigate();

    /* FETCHING STORE DETAIL AND STOCK USING REDUX --> START */
    const stock = useSelector((state)=>{
      return state.stockByStore;
    });
    /* FETCHING STORE DETAIL AND STOCK USING REDUX --> END */


  return (
    <div className={EcomNavBarCss.EcomNavBar}>
      <span className={EcomNavBarCss.EcomNavBar_StoreNameHeading} >{stock.store?stock.store.storeName:null}</span>
      <div className={EcomNavBarCss.SearchBar}>
        <img src='http://localhost:8000/search.png' alt='Search Icon'/>
        <input type='text'/>
      </div>
      {
        auth.user ?
        <div className={EcomNavBarCss.authorizedUser}>
          <img src='http://localhost:8000/user.png' alt='User Icon'/>
          <span>{auth.user.username}</span>
          <div className={EcomNavBarCss.ShoppingCartIcon}>
            <img  src='http://localhost:8000/shoppingcart.png' alt='Cart Icon'/>
          </div>
        </div>
        :
        <button onClick={()=>{navigate('/login')}} className={EcomNavBarCss.loginBtn}>Login</button>
      }

    </div>
  )
}

export default EcomNavBar