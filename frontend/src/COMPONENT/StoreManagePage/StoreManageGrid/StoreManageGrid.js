import React, { useEffect} from 'react'
import CSS from './StoreManageGrid.module.css'
import StoreManageGridElement from './StoreManageGridElement/StoreManageGridElement'
import { useOverlayContext } from '../../../CONTEXT API CUSTOM HOOKS/OVERLAY_CUSTOM_HOOK';
import { useSelector, useDispatch } from 'react-redux';
import { GET_UPDATED_STOCK } from '../../../REDUX/REDUCERS/FETCH_MY_STOCK__REDUCER';
import { SEARCH } from '../../../REDUX/REDUCERS/FETCH_MY_STOCK__REDUCER';
import Button from 'react-bootstrap/Button'


function StoreManageGrid() {

  const overlay = useOverlayContext();

  /* ---------------FETCH LIVE STOCK VIA REDUX------------- */
  const Products = useSelector((state)=>{
    return state.stock
  })
  const dispatch = useDispatch();
  /* ---------------FETCH LIVE STOCK VIA REDUX------------- */


  const onAddProduct = ()=>{
    overlay.setOverlay('AddProduct');
    overlay.setShowOverlay(true);
  }

  const SearchFilter = (e)=>{
    dispatch(SEARCH(e.target.value))
  }

  useEffect(()=>{
    dispatch(GET_UPDATED_STOCK());
  },[dispatch]);






  return (
    <div className={CSS.StoreManageGrid_OuterDiv}>
      <div className={CSS.StoreManageGrid_Actions_div}>
        <Button onClick={onAddProduct} variant="primary" size='lg'>ADD PRODUCT</Button>
        <input  type='text' placeholder='Search' onChange={SearchFilter}/>
      </div>

      <div className={CSS.StoreManageGridList}>
        {
          
          !Products.FilteredProducts ?
            null
            :
            Products.FilteredProducts.length===0 ?
              null
              :
              Products.FilteredProducts.map((product,key)=>{
                return <StoreManageGridElement 
                product={product} 
                key={key}/>})
        }
      </div>
      
    </div>
  )
}

export default StoreManageGrid