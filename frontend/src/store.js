import { createStore , combineReducers , applyMiddleware } from 'redux' ;
import thunk from 'redux-thunk' ;
import { composeWithDevTools } from 'redux-devtools-extension' ;
import { authReducer , userReducer } from './reducers/userReducer' ;
import {productsReducer , productDetailsReducer} from './reducers/productReducers' ;
import { cartReducer } from './reducers/cartReducer' ;

import {persistStore} from 'redux-persist' ;
import rootReducers from './reducers/root-reducers';


let initialState = {}

const middleware = [thunk] ;
export const store = createStore(rootReducers , initialState , composeWithDevTools(applyMiddleware(...middleware))) 
export const persistor = persistStore(store) ;

export default store;