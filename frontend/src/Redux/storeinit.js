import {applyMiddleware, createStore} from 'redux'
import rootReducer from "./Reducers/index";
import thunk from 'redux-thunk'

const store = {store:createStore(rootReducer.rootReducer,applyMiddleware(thunk))};

export default store

