import { combineReducers } from "redux";
import {persistReducer} from 'redux-persist' ;

import storage from 'redux-persist/lib/storage' ;


import {authReducer , userReducer} from '../reducers/userReducer' ;
import { cartReducer } from "./cartReducer";
import { productDetailsReducer , productsReducer } from "./productReducers";

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
    productDetails: productDetailsReducer
}) ;

export default persistReducer(persistConfig ,rootReducer) ;