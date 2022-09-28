import { combineReducers } from "redux";
import { fetchCart_reducer } from "./CART__REDUCER";
import { fetchPost_reducer } from "./POSTS__REDUCER";
import {fetchActiveChat_reducer} from "./FETCHACTIVECHAT__REDUCER"
import { fetch_conversation_reducer } from './CONVERSATION__REDUCER';
import { fetchAvailableStock_reducer } from "./FETCH_MY_STOCK__REDUCER";
import {fetchAvailableStockByStorename_reducer} from './FETCH_STOCK_BY_STORENAME__REDUCER'

const rootReducer ={
    rootReducer: combineReducers({
        posts: fetchPost_reducer,
        activechats: fetchActiveChat_reducer,
        conversations: fetch_conversation_reducer,
        stock: fetchAvailableStock_reducer,
        stockByStore: fetchAvailableStockByStorename_reducer,
        cart:fetchCart_reducer
    })
}

export default rootReducer
