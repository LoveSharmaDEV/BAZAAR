import React, { useState } from 'react'
import CSS from './CartCard.module.css'
import { useDispatch } from 'react-redux';
import { CHANGE_QUANT, DELETE_PRODUCT } from '../../../REDUX/REDUCERS/CART__REDUCER';
import AUTHORIZED_REQ from '../../../COMMON_UTILS/AUTHORIZED_REQUEST';
import { ECOMM_API, BACKEND_BASE } from '../../../MasterData/GlobalData';

function CartCard(props) {
    const [index,setIndex]= useState(0);
    const dispatch = useDispatch();
    const increaseQuantity=()=>{
        dispatch(CHANGE_QUANT(props.index,'+'))
    }
    const decreaseQuantity=()=>{
        dispatch(CHANGE_QUANT(props.index,'-'))
    }

    const deleteCartProduct = async ()=>{
        const response = await AUTHORIZED_REQ(ECOMM_API.STORE_PRODUCT_DELETE_FROM_CART_API,{cartID:props.product._id},{},'POST')
        if(response.data.errCode==='SUCCESS') dispatch(DELETE_PRODUCT(props.index))
        else console.log(response)
    }
  return (
    <div className={CSS.CardContainer}>
        <div className={CSS.CardContainer__ImagePanel}>
            {
                props.product.productImage.length>1?
                <img className={CSS.ImagePanel__rightBtn} src={`${BACKEND_BASE}/right.png`} alt=''/>
                :
                null
            }
            <img className={CSS.ImagePanel__image} src={`${BACKEND_BASE}/${props.product.productImage[index]}`} alt=''/>

            {
                props.product.productImage.length>1?
                <img className={CSS.ImagePanel__leftBtn} src={`${BACKEND_BASE}/right.png`} alt=''/>
                :
                null
            }

        </div>
        <div className={CSS.CardContainer__DetailPanel}>
            <img style={{backgroundColor:props.product.color}} 
            onClick={deleteCartProduct}
            className={CSS.DetailPanel__Delete} 
            src={`${BACKEND_BASE}/delete.png`} alt=''/>
            <div className={CSS.DetailPanel__Heading}>
                <span style={{backgroundColor:props.product.color}}>{props.product.product.ProductName}</span>
            </div>

            {
                props.product.product.isColorAvailable?
                    <div className={CSS.DetailPanel__Color}>
                        <div style={{backgroundColor:props.product.color}}></div>
                    </div>
                :
                null
            }

            {
                props.product.product.isSizeAvailable?
                    <div className={CSS.DetailPanel__Size}>
                        <span style={{backgroundColor:props.product.color}}>{props.product.size}</span>
                    </div>
                :
                null
            }

            <div  className={CSS.DetailPanel__Quantity}>
                <div onClick={decreaseQuantity} style={{backgroundColor:props.product.color}}>-</div> 
                <span>{props.product.Quantity}</span>
                <div onClick={increaseQuantity} style={{backgroundColor:props.product.color}}>+</div>
            </div>
            <div className={CSS.DetailPanel__Price}>

                <img src={`${BACKEND_BASE}/rupee.png`} alt=''/>
                <span>{props.product.Quantity*props.product.product.ProductPrice}</span>

            </div>
        </div>
    </div>
  )
}

export default CartCard