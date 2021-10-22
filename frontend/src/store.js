import { createStore , combineReducers , applyMiddleware } from 'redux' ;
import thunk from 'redux-thunk' ;
import { composeWithDevTools } from 'redux-devtools-extension' ;
import { authReducer , userReducer } from './reducers/userReducer' ;
import {productsReducer , productDetailsReducer} from './reducers/productReducers' ;

const reducer = combineReducers({
    auth: authReducer ,
    user: userReducer ,
    products: productsReducer ,
    productDetails: productDetailsReducer
})

let initialState = {}

const middleware = [thunk] ;
const store = createStore(reducer , initialState , composeWithDevTools(applyMiddleware(...middleware))) 

export default store ;