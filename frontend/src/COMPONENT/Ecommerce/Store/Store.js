import React, { useEffect} from 'react';
import {useParams} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FetchStockByStoreNameAPI } from '../../../REDUX/REDUCERS/FETCH_STOCK_BY_STORENAME__REDUCER';
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
      props.setBarVisibility({
        rightNavBarVisibility:false,
        leftNavBarVisibility:false,
        topNavBarVisibility:false,
        EcomNavBarVisibility:true
      })

    },[ ])

    useEffect(()=>{
      dispatch(FetchStockByStoreNameAPI(storeName));
    },[dispatch,storeName])

  return (
    <div className={StoreCss.Store}>
      <div className={StoreCss.StoreProductPage}>
      {
        stock.stock.length!==0?
        stock.stock.map((product, key)=>{
          return <ProductCard product={product} storeName={storeName} key={key}/>
          })
        :
        null
      }
      </div>
    </div>
  )
}

export default Store