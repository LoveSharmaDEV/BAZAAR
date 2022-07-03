import React, { useEffect} from 'react';
import {useParams} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FetchStockByStoreNameAPI } from '../../../Redux/Reducers/fetchAvailableStockByStorename_reducer';
import StoreCss from './Store.module.css';
import ProductCard from '../ProductCard/ProductCard';

const Store = (props) => {
    const {storeName} =  useParams();
    

    /* FETCHING STORE DETAIL AND STOCK USING REDUX --> START */
    const stock = useSelector((state)=>{
      return state.stockByStore;
    });
    const dispatch = useDispatch();
    /* FETCHING STORE DETAIL AND STOCK USING REDUX --> END */

    
    useEffect(()=>{
        props.setleftNavBarVisibility(false);
        props.setrightNavBarVisibility(false);
        props.settopNavBarVisibility(false);
        props.setEcomNavBarVisibility(true);
    },[props])

    useEffect(()=>{
      dispatch(FetchStockByStoreNameAPI(storeName));
    },[dispatch,storeName])

  return (
    <div className={StoreCss.Store}>
      <div className={StoreCss.StoreProductPage}>
      {
        stock.stock.length!==0?
        stock.stock.map((product, key)=>{
          return <ProductCard product={product} key={key}/>
          })
        :
        null
      }

      </div>
    </div>
  )
}

export default Store