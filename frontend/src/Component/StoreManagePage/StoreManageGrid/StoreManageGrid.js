import React, { useEffect } from 'react'
import StoreManageGridCss from './StoreManageGrid.module.css'
import StoreManageGridElement from './StoreManageGridElement/StoreManageGridElement'
import { useOverlayContext } from '../../../Hooks/overlay';
import { useSelector, useDispatch } from 'react-redux';
import { GET_UPDATED_STOCK } from '../../../Redux/Reducers/fetchAvailableStock_reducer';

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

  useEffect(()=>{
    dispatch(GET_UPDATED_STOCK());
  },[dispatch]);


  return (
    <div className={StoreManageGridCss.StoreManageGrid_OuterDiv}>

      <div className={StoreManageGridCss.StoreManageGrid_Actions_div}>
        <button className={StoreManageGridCss.button54} onClick={onAddProduct}>Add Product</button>
        <input type='text' placeholder='Search Product'/>
      </div>

      <div className={StoreManageGridCss.StoreManageGridList}>
        {
          
          !Products.Products ?
            null
            :
            Products.Products.length===0 ?
              null
              :
              Products.Products.map((product,key)=>{
                return <StoreManageGridElement 
                product={product} 
                key={key}/>})
        }
      </div>
      
    </div>
  )
}

export default StoreManageGrid