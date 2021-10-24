import { combineReducers } from "redux";
import {persistReducer} from 'redux-persist' ;

import storage from 'redux-persist/lib/storage' ;


import {authReducer , userReducer} from './userReducer' ;
import { cartReducer } from "./cartReducer";
import { productDetailsReducer , productsReducer } from "./productReducers";
import { newOrderReducer} from './orderReducer'

const persistConfig = {
    key: 'root' ,
    storage ,
    whitelist: ['cart']
}

const rootReducer = combineReducers({
    auth: authReducer ,
    user: userReducer ,
    products: productsReducer ,
    cart: cartReducer ,
    productDetails: productDetailsReducer ,
    order: newOrderReducer
}) ;

export default persistReducer(persistConfig ,rootReducer) ;