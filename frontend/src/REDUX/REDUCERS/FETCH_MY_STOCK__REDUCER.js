import AUTHORIZED_REQ from '../../COMMON_UTILS/AUTHORIZED_REQUEST'
import { ECOMM_API } from '../../MasterData/GlobalData';
/* ------------------------ACTION CREATERS START-------------------------- */

const FETCH_AVAILABLE_STOCK = 'FETCH_AVAILABLE_STOCK';
const FETCH_AVAILABLE_STOCK_SUCCESS = 'FETCH_AVAILABLE_STOCK_SUCCESS';
const FETCH_AVAILABLE_STOCK_FAILURE = 'FETCH_AVAILABLE_STOCK_FAILURE';
const ADD_TO_THE_AVAILABLE_STOCK = 'ADD_TO_THE_AVAILABLE_STOCK'; 
const DELETE_FROM_AVAILABLE_STOCK = 'DELETE_FROM_AVAILABLE_STOCK';
const UPDATE_CURRENT_STOCK = 'UPDATE_CURRENT_STOCK';
const FILTERED_SEARCH = 'FILTERED_SEARCH'


export const SEARCH = (input)=>{
    return{
        type:FILTERED_SEARCH,
        payload:input
    }
}


export const GET_UPDATED_STOCK = ()=>
{
    return async (dispatch)=>{
        dispatch(
            {
                type:FETCH_AVAILABLE_STOCK
            }
        )
        const response = await AUTHORIZED_REQ(ECOMM_API.FETCH_STORE_USERID,{},{},'POST');
        if(response.data.errCode==='FAILURE')
            dispatch({
                type:FETCH_AVAILABLE_STOCK_FAILURE
            })
        else
            dispatch({
            type:FETCH_AVAILABLE_STOCK_SUCCESS,
            payload: response.data.products
            })
    }
}

export const ADD_TO_THE_STOCK = (product)=>{
    return {
        type: ADD_TO_THE_AVAILABLE_STOCK,
        payload:product
    }
}


export const DELETE_FROM_STOCK = (id)=>{
    return {
        type: DELETE_FROM_AVAILABLE_STOCK,
        payload:id
    }
}

export const UPDATE_STOCK = (updatedProduct)=>{
    return {
        type:UPDATE_CURRENT_STOCK,
        payload:updatedProduct
    }
}

/* ------------------------ACTION CREATERS END-------------------------- */


const initialState = {
    Products:[],
    FilteredProducts:[],
    FetchStatus:{
        Loading:false,
        Status:'SUCCESS'
    }
}

export const fetchAvailableStock_reducer = (state=initialState,action)=>{

    switch(action.type)
    {
        case FETCH_AVAILABLE_STOCK:
            {
                return {
                    Products:[],
                    FilteredProducts:[],
                    FetchStatus:{
                        Loading:true,
                        Status:'FAILURE'
                    }
                }
            }
        case FETCH_AVAILABLE_STOCK_FAILURE:
            {
                return{
                    Products:[],
                    FilteredProducts:[],
                    FetchStatus:{
                        Loading:false,
                        Status: 'FAILURE'
                    }
                }
            }
        case FETCH_AVAILABLE_STOCK_SUCCESS:
            {
                return{
                    Products:action.payload,
                    FilteredProducts:action.payload,
                    FetchStatus:{
                        Loading:false,
                        Status: 'SUCCESS'
                    }
                }
        }
        case ADD_TO_THE_AVAILABLE_STOCK:
            {
                return {
                    ...state,
                    Products:[...state.Products,action.payload],
                    FilteredProducts:[...state.Products,action.payload]
                }
            }
        case DELETE_FROM_AVAILABLE_STOCK:
            {
                const index = state.Products.findIndex((product)=>{
                    return product._id === action.payload
                });
                state.Products.splice(index,1)
                return {
                    ...state,
                    Products:[...state.Products],
                    FilteredProducts:[...state.Products]
                }
            }
        case UPDATE_CURRENT_STOCK:
            {
                const index = state.Products.findIndex((product)=>{
                    return product._id === action.payload._id
                });
                
                state.Products[index] = action.payload
                state.FilteredProducts[index] = action.payload

                return{
                    ...state,
                    //...action.payload
                }
            }
        case FILTERED_SEARCH:
            {
                if(action.payload)
                {
                    const regex = new RegExp(action.payload,'gi');
                    state.FilteredProducts=state.Products;
                    state.FilteredProducts = state.FilteredProducts.filter((product)=>{
                        return regex.test(product.ProductName)
                    })

                    return{
                        ...state
                    }
                }
                else{
                    state.FilteredProducts=state.Products;
                    return{
                        ...state
                    }
                }
            }
        default:{
            return state
        }
    }

}



