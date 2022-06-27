import { combineReducers } from "redux";
import { fetchPost_reducer } from "./fetchPost_reducer";
import {fetchActiveChat_reducer} from "./fetchActiveChats_reducer"
import { fetch_conversation_reducer } from './fetchConversations_reducer';
import { fetchAvailableStock_reducer } from "./fetchAvailableStock_reducer";

const rootReducer ={
    rootReducer: combineReducers({
        posts: fetchPost_reducer,
        activechats: fetchActiveChat_reducer,
        conversations: fetch_conversation_reducer,
        stock: fetchAvailableStock_reducer
    })
}

export default rootReducer
