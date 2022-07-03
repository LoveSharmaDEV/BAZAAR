import makeRequest from '../../Commons/makeRequest'
/* ------------------------ACTION CREATERS START-------------------------- */

const FETCH_AVAILABLE_STOCK = 'FETCH_AVAILABLE_STOCK';
const FETCH_AVAILABLE_STOCK_SUCCESS = 'FETCH_AVAILABLE_STOCK_SUCCESS';
const FETCH_AVAILABLE_STOCK_FAILURE = 'FETCH_AVAILABLE_STOCK_FAILURE';
const ADD_TO_THE_AVAILABLE_STOCK = 'ADD_TO_THE_AVAILABLE_STOCK'; 
const DELETE_FROM_AVAILABLE_STOCK = 'DELETE_FROM_AVAILABLE_STOCK';


export const GET_UPDATED_STOCK = ()=>
{
    return async (dispatch)=>{
        dispatch(
            {
                type:FETCH_AVAILABLE_STOCK
            }
        )
        const response = await makeRequest('http://localhost:8000/store/fetch/stock',{},'GET');
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
    const obj = {};
    product.forEach((value,key)=>{
        obj[key]= value
    })

    obj['ProductImage'] = Array.isArray(obj['imageList'])?obj['imageList'].map((image)=>{
        return {path:image,color:'None'}
    })
    : [{path:obj['imageList'],color:'None'}]

    return {
        type: ADD_TO_THE_AVAILABLE_STOCK,
        payload:obj
    }
}


export const DELETE_FROM_STOCK = (id)=>{
    return {
        type: DELETE_FROM_AVAILABLE_STOCK,
        payload:id
    }
}
/* ------------------------ACTION CREATERS END-------------------------- */


const initialState = {
    Products:[],
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
                    Products:[...state.Products,action.payload]
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
                    Products:[...state.Products]
                }
            }
        default:{
            return state
        }
    }

}



