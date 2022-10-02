import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import CartCss from './Cart.module.css'
import CartCard from './CartCard';
import { useDispatch } from 'react-redux';
import { APICALL_GETCART } from '../../../REDUX/REDUCERS/CART__REDUCER';
import { STRIPE_API } from '../../../MasterData/GlobalData';
import AUTHORIZED_REQ from '../../../COMMON_UTILS/AUTHORIZED_REQUEST';
import { useAuth } from '../../../CONTEXT API CUSTOM HOOKS/AUTH_CUSTOM_HOOK';
import { useToasts } from 'react-toast-notifications';
import ReactLoading from 'react-loading';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/esm/Button';


export default function Cart(props) {

    const cart = useSelector((state)=>{
        return state.cart
    })
    const auth = useAuth();
    const navigate = useNavigate()

    const { addToast } = useToasts();


    const dispatch = useDispatch();

    const createCheckoutSession = async()=>{
        
        const response = await AUTHORIZED_REQ(STRIPE_API.STRIPE_PAYMENT_SESSION_API,{products:cart.products},{},'POST')
        if (response.data.errCode==='SUCCESS')
        {
            window.location=response.data.url
        }

        if(response.data.errCode==='UNAUTHORIZED')
        {
            addToast(response.data.message, { appearance: 'error' });
        }
    }

    useEffect(()=>{
        props.setBarVisibility({
            rightNavBarVisibility:false,
            leftNavBarVisibility:false,
            topNavBarVisibility:false,
            EcomNavBarVisibility:true
        });
        dispatch(APICALL_GETCART())
    },[dispatch])

    useEffect(()=>{
     if(!auth.user) navigate('../login')
    })

  return (
    <div className={CartCss.OuterMostContainer}>
        <div className={CartCss.OuterMostContainer__CartBody}>
            {   
                cart.loading && !cart.error?
                <ReactLoading type='spin' color='blue' height={'3%'} width={'3%'} />        
                :
                cart.products.length!==0?
                    cart.products.map((product,key)=><CartCard product={product} index={key} key={key}/>)
                :
                null
            }
        </div>
        <Button onClick={createCheckoutSession} variant="primary" size='lg'>CHECKOUT</Button>
    </div>
  )
}
