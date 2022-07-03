import axios from 'axios'

/* --------- ACTIONS---> START */
const FETCH_STOCK_BY_STORENAME = 'FETCH_STOCK_BY_STORENAME';
const FETCH_STOCK_BY_STORENAME_SUCCESS = 'FETCH_STOCK_BY_STORENAME_SUCCESS';
const FETCH_STOCK_BY_STORENAME_ERROR = 'FETCH_STOCK_BY_STORENAME_ERROR'; 
/* --------- ACTIONS---> END */


/* ---- ACTION CREATERS ----> START*/
export const FetchStockByStoreNameAPI = (storeName) =>{

    return async (dispatch)=>{

        dispatch({type:FETCH_STOCK_BY_STORENAME});

        const response = await axios.get(`http://localhost:8000/store/fetch/stock/${storeName}`);

        if(response.data.errCode==='SUCCESS') dispatch({type:FETCH_STOCK_BY_STORENAME_SUCCESS, payload:response.data});
        else dispatch({type:FETCH_STOCK_BY_STORENAME_ERROR})
    }
}
/* ---- ACTION CREATERS ----> END*/



const initState = {
    stock:[],
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
                    store: action.payload.store,
                    loading:false,
                    error:false
                }
            }
        default:
            return state;
    }
}
