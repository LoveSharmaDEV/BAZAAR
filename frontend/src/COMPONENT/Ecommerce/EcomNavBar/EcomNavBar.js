import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../CONTEXT API CUSTOM HOOKS/AUTH_CUSTOM_HOOK';
import CSS from './EcomNavBar.module.css'
import { Link } from 'react-router-dom';
import { APICALL_GETCART } from '../../../REDUX/REDUCERS/CART__REDUCER';
import { FilterByCategories, FilterBySearches } from '../../../REDUX/REDUCERS/FETCH_STOCK_BY_STORENAME__REDUCER';
import { BACKEND_BASE } from '../../../MasterData/GlobalData';

const EcomNavBar = (props) => {

    const auth = useAuth();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [Toggle_DropDown,setToggle_DropDown] = useState(false);
    const cart = useSelector((state)=>{
      return state.cart
    })

    /* FETCHING STORE DETAIL AND STOCK USING REDUX --> START */
    const stock = useSelector((state)=>{
      return state.stockByStore;
    });
    /* FETCHING STORE DETAIL AND STOCK USING REDUX --> END */

    const Toggle_DropDownList= ()=>{
      const DropDown = Array.from(document.getElementsByClassName(CSS.DropDown__Items))[0];
      if(Toggle_DropDown){
        DropDown.style.height='0rem';
        setToggle_DropDown(false);
      }
      else{
        DropDown.style.height='auto';
        setToggle_DropDown(true);
      }
    }

    const FilterByCategory = (e)=>{
      dispatch(FilterByCategories(e.target.dataset.tag))
    }

    const FilterBySearch = (e)=>{
      dispatch(FilterBySearches(e.target.value))
    }

    useEffect(()=>{
      dispatch(APICALL_GETCART());
    },[dispatch])


  return (
    <div className={CSS.EcomNavBar}>
      <div className={CSS.EcomNavBar__Heading}>
        {
        stock.store?
          <img 
            className={CSS.Heading__StoreIcon}
            src={`${BACKEND_BASE}/${stock?.store.storePic}`}
            alt=''
          />
          :
          null
        }
        <span className={CSS.Heading__StoreName}>{stock.store?stock.store.storeName:null}</span>
      </div>


      <div className={CSS.EcomNavBar__SearchBar}>
        <div className={CSS.SearchBar}>

          <img src={`${BACKEND_BASE}/search.png`} alt='Search Icon'/>
          <input onChange={FilterBySearch} type='text'/>

        </div>
        <div className={CSS.SearchBar__DropDown}>
          <span onClick={Toggle_DropDownList}>CATEGORIES</span>
          <div className={CSS.DropDown__Items}>
            {
              stock.copystock.map((product,key)=>{return product.hashtag}).flat(1).map((hashtag,key)=>{
                return <h3 onClick={FilterByCategory} data-tag={hashtag} >{hashtag}</h3>
              })
            }
          </div>
        </div>
      </div>

      {
        auth.user ?
        <div className={CSS.authorizedUser}>
          <img src={auth.user?`${BACKEND_BASE}${auth.user.profilepic}`:`${BACKEND_BASE}/user.png`} alt=''/>
          <span>{auth.user.username}</span>

          <Link to='/cart'>
              <div className={CSS.ShoppingCartIcon}>
                { 
                  cart.products.length!==0?
                  <div>{cart.products.reduce((total,product)=>{
                    return total+product.Quantity
                  },0)}</div>
                  :
                  null
                }
                <img  src={`${BACKEND_BASE}/shoppingcart.png`} alt='Cart Icon'/>
              </div>
            </Link>
        </div>
        
        :
        <button onClick={()=>{navigate('/login')}} className={CSS.loginBtn}>Login</button>
      }

    </div>
  )
}

export default EcomNavBar