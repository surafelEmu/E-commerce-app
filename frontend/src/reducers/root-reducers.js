import { combineReducers } from "redux";
import {persistReducer} from 'redux-persist' ;

import storage from 'redux-persist/lib/storage' ;


import {authReducer , userReducer} from './userReducer' ;
import { cartReducer } from "./cartReducer";
import { newReviewReducer , productDetailsReducer , productsReducer } from "./productReducers";
import { newOrderReducer , myOrderReducer , orderDetailReducer} from './orderReducer'


const persistConfig = {
    key: 'root' ,
    storage ,
    whitelist: ['cart' , 'user' , 'orderDetail']
}

const rootReducer = combineReducers({
    auth: authReducer ,
    user: userReducer ,
    products: productsReducer ,
    cart: cartReducer ,
    productDetails: productDetailsReducer ,
    order: newOrderReducer ,
    myOrders: myOrderReducer ,
    orderDetail: orderDetailReducer ,
    productReview: newReviewReducer
}) ;

export default persistReducer(persistConfig ,rootReducer) ;