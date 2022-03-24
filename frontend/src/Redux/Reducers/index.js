import { combineReducers } from "redux";
import { fetchPost_reducer } from "./fetchPost_reducer";
import {fetchChat_reducer} from "./fetchChat_reducer";
import {fetchActiveChat_reducer} from "./fetchActiveChats_reducer"

const rootReducer ={
    rootReducer: combineReducers({
        posts: fetchPost_reducer,
        chats: fetchChat_reducer,
        activechats: fetchActiveChat_reducer
    })
}

export default rootReducer
