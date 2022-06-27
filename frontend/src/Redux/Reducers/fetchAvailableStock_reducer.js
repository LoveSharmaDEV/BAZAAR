import makeRequest from '../../Commons/makeRequest'
/* ------------------------ACTION CREATERS START-------------------------- */

const FETCH_AVAILABLE_STOCK = 'FETCH_AVAILABLE_STOCK';
const FETCH_AVAILABLE_STOCK_SUCCESS = 'FETCH_AVAILABLE_STOCK_SUCCESS';
const FETCH_AVAILABLE_STOCK_FAILURE = 'FETCH_AVAILABLE_STOCK_FAILURE';


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
        
        dispatch({
            type:FETCH_AVAILABLE_STOCK_SUCCESS,
            payload: response.data.products
        })

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
        default:{
            return state
        }
    }

}



