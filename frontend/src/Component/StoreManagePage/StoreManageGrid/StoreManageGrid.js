import React, { useEffect} from 'react'
import StoreManageGridCss from './StoreManageGrid.module.css'
import StoreManageGridElement from './StoreManageGridElement/StoreManageGridElement'
import { useOverlayContext } from '../../../Hooks/overlay';
import { useSelector, useDispatch } from 'react-redux';
import { GET_UPDATED_STOCK } from '../../../Redux/Reducers/fetchAvailableStock_reducer';
import { SEARCH } from '../../../Redux/Reducers/fetchAvailableStock_reducer';

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
    <div className={StoreManageGridCss.StoreManageGrid_OuterDiv}>
        {console.log(Products)}
      <div className={StoreManageGridCss.StoreManageGrid_Actions_div}>
        <button className={StoreManageGridCss.button54} onClick={onAddProduct}>Add Product</button>
        <input  type='text' placeholder='Search Product' onChange={SearchFilter}/>
      </div>

      <div className={StoreManageGridCss.StoreManageGridList}>
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