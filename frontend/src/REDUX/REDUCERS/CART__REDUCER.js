import AUTHORIZED_REQ from "../../COMMON_UTILS/AUTHORIZED_REQUEST";
import { ECOMM_API } from "../../MasterData/GlobalData";

/* ----> ACTIONS <------- */
const ADD_TO_CART = 'ADD_TO_CART'
const CHANGE_QUANTITY = 'CHANGE_QUANTITY'
const DELETE_FROM_CART = 'DELETE_FROM_CART'
const FETCH_TO_CART = 'FETCH_TO_CART'
const FETCH_TO_CART_SUCCESS='FETCH_TO_CART_SUCCESS'
const FETCH_TO_CART_FAILURE = 'FETCH_TO_CART_FAILURE'
/* ----> ACTIONS <------- */



/* ----> ACTION CREATERS<------- */
export const ADD_PRODUCT_TO_CART = (product)=>{

    return {
        type:ADD_TO_CART,
        payload:product
    }

}

export const CHANGE_QUANT = (key,sign)=>{

    return{
        type:CHANGE_QUANTITY,
        payload:{key,sign}
    }

}

export const DELETE_PRODUCT = (key)=>{
    return{
        type:DELETE_FROM_CART,
        payload:key
    }
}

export const APICALL_GETCART =  ()=>{
    return async (dispatch)=>{
        dispatch({
            type:FETCH_TO_CART
        })
        const response = await AUTHORIZED_REQ(ECOMM_API.FETCH_CART__API,{},{},'POST');
        if(response.data.errCode==='SUCCESS') {
            dispatch({type:FETCH_TO_CART_SUCCESS,payload:response.data.cartItems})
        }
    }
}

/* ----> ACTION CREATERS<------- */



/* INITIAL STATE

SCHEMA TO BE FOLLOWED
    product:null,
    productImage:null,
    color:null,
    size:null,
    Quantity:0
*/


/* ------> INITIAL STATE <------- */
const initState = {
    products:[],
    loading:false,
    error:false
}
/* ------> INITIAL STATE <------- */



/* HELPER FUNCTIONS */
const HandleCartAddition = (currentState, product)=>{
    const index = currentState.products.findIndex((currentProduct)=>{
        return (currentProduct.product._id === product.product._id) && 
               (currentProduct.color === product.color) &&
               (currentProduct.size === product.size)
    });

    if(index!==-1)
    {
        currentState.products[index].Quantity=currentState.products[index].Quantity+1;
        return currentState;
    }
    else{
        currentState.products = [...currentState.products,product]
        return currentState
    }
}


/* REDUCER */
export const fetchCart_reducer = (state=initState, action)=>{

    switch (action.type) {
        case ADD_TO_CART:
            {
                const newState = HandleCartAddition(state, action.payload);
                return{
                    ...newState
                }                
            }
        case CHANGE_QUANTITY:
            {
                if(action.payload.sign==='-' && state.products[action.payload.key].Quantity>=2)  state.products[action.payload.key].Quantity-=1;
                if(action.payload.sign==='+')  state.products[action.payload.key].Quantity+=1;

                return{
                    ...state
                }
            }
        case DELETE_FROM_CART:
            {
                state.products.splice(action.payload,1)
                return{
                    ...state
                }   
            }
        case FETCH_TO_CART_SUCCESS:
            {
                return{
                    products:[...action.payload],
                    loading:false,
                    error:false
                }
            }
        case FETCH_TO_CART_FAILURE:
            {
                return{
                    products:[],
                    loading:false,
                    error:true
                }
            }
        case FETCH_TO_CART:
        {
            return{
                products:[],
                loading:true,
                error:false
            } 
        }
        default:
            return state
    }

}