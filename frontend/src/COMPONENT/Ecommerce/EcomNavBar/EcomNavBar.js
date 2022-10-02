import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../CONTEXT API CUSTOM HOOKS/AUTH_CUSTOM_HOOK';
import CSS from './EcomNavBar.module.css'
import { Link } from 'react-router-dom';
import { APICALL_GETCART } from '../../../REDUX/REDUCERS/CART__REDUCER';
import { FilterByCategories, FilterBySearches } from '../../../REDUX/REDUCERS/FETCH_STOCK_BY_STORENAME__REDUCER';
import { BACKEND_BASE } from '../../../MasterData/GlobalData';
import Button from 'react-bootstrap/esm/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

const EcomNavBar = () => {

    const auth = useAuth();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [Toggle_DropDown,setToggle_DropDown] = useState(false);
    const logout = ()=>{
      auth.logout();
      navigate('/login');
    }
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
        
        <span className={CSS.Heading__StoreName}>{stock.store?stock.store.storeName:null}</span>

      </div>

      <div className={CSS.EcomNavBar__Actions}>

        <div className={CSS.EcomNavBar__Actions__NotCollapsed}>

          <div className={CSS.Actions__CategoriesDropdown}> 
            <DropdownButton  size='lg' title="CATEGORIES">
              {
                stock.copystock.map((product,key)=>{return product.hashtag}).flat(1).map((hashtag,key)=>{
                  return <Dropdown.Item href="#" onClick={FilterByCategory} data-tag={hashtag} >{hashtag}</Dropdown.Item>
                })
              }
            </DropdownButton>
          </div>



          <div className={CSS.Actions__SearchBar}>

            <img src={`${BACKEND_BASE}/search.png`} alt='Search Icon'/>
            <input onChange={FilterBySearch} type='text'/>

          </div>



          <div className={CSS.Actions__AuthBTN}>

            <div className={CSS.AuthBTN__UserProfile}>
              {
                !auth.user?
                  <Link to={'/login'}>
                    <Button variant="primary" size='lg'>LOGIN</Button>
                  </Link>
                  :
                  <>
                    <img src={`${BACKEND_BASE}/${auth.user.profilepic}`} alt=''/>
                    <DropdownButton title={auth.user?auth.user.username:null} size='lg'>
                      <Dropdown.Item onClick={logout} href="#/action-1">LOGOUT</Dropdown.Item>
                    </DropdownButton>
                  </>
              }
            </div>


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


        </div>

        <div className={CSS.EcomNavBar__Actions__Collapsed}>

        </div>

      </div>
    </div>
  )
}

export default EcomNavBar