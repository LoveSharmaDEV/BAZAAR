import axios from 'axios'
import { ECOMM_API } from '../../MasterData/GlobalData';

/* --------- ACTIONS---> START */
const FETCH_STOCK_BY_STORENAME = 'FETCH_STOCK_BY_STORENAME';
const FETCH_STOCK_BY_STORENAME_SUCCESS = 'FETCH_STOCK_BY_STORENAME_SUCCESS';
const FETCH_STOCK_BY_STORENAME_ERROR = 'FETCH_STOCK_BY_STORENAME_ERROR'; 
const FILTER_BY_CATEGORY = 'FILTER_BY_CATEGORY';
const FILTER_BY_SEARCH = 'FILTER_BY_SEARCH';
/* --------- ACTIONS---> END */


/* ---- ACTION CREATERS ----> START*/
export const FetchStockByStoreNameAPI = (storeName) =>{

    return async (dispatch)=>{

        dispatch({type:FETCH_STOCK_BY_STORENAME});

        const response = await axios.post(`${ECOMM_API.FETCH_STORE_STORENAME}${storeName}`,{});

        if(response.data.errCode==='SUCCESS') dispatch({type:FETCH_STOCK_BY_STORENAME_SUCCESS, payload:response.data});
        else dispatch({type:FETCH_STOCK_BY_STORENAME_ERROR})
    }
}

export const FilterByCategories = (category)=>{
    return {
        type:FILTER_BY_CATEGORY,
        payload:category
    }
}

export const FilterBySearches = (text)=>{
 return{
    type:FILTER_BY_SEARCH,
    payload:text
 }
}
/* ---- ACTION CREATERS ----> END*/



const initState = {
    stock:[],
    copystock:[],
    store:null,
    loading:false,
    error: false
}


export const fetchAvailableStockByStorename_reducer = (state = initState, action) => {
    switch (action.type) {
        case FETCH_STOCK_BY_STORENAME:
            {
                return {
                    ...state,
                    loading:true,
                    error:false
                }
            }
        case FETCH_STOCK_BY_STORENAME_ERROR:
            {
                return {
                    stock:[],
                    copystock:[],
                    store:null,
                    loading:false,
                    error:true
                }
            }
        case FETCH_STOCK_BY_STORENAME_SUCCESS:
            {
                return {
                    ...state,
                    stock:action.payload.product,
                    copystock:action.payload.product,
                    store: action.payload.store,
                    loading:false,
                    error:false
                }
            }
        case FILTER_BY_CATEGORY:
            {
                const Temp_Stock = state.copystock.filter((product)=>{
                    return product.hashtag.includes(action.payload)
                });

                return {
                    ...state,
                    stock:Temp_Stock,
                    loading:false,
                    error:false
                }
            }
        case FILTER_BY_SEARCH:
            {
                const Temp_Stock = state.copystock.filter((product)=>{
                    return product.ProductName.match(action.payload)
                });  

                return {
                    ...state,
                    stock:Temp_Stock,
                    loading:false,
                    error:false
                }
            }
        default:
            return state;
    }
}
