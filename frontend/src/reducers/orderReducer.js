import orderConstants, { CLEAR_ERRORS } from '../constants/orderConstants' ;

export const newOrderReducer = (state = {} , action) => {
    switch(action.type) {
        case orderConstants.CREATE_ORDER_REQUEST : 
            return {
                ...state ,
                loading: true ,
                
            }
        
        case orderConstants.CREATE_ORDER_SUCCESS : 
            return {
                
                loading: false ,
                order: action.payload
            }
        case orderConstants.CREATE_ORDER_FAIL : 
            return {
                loading: false ,
                error: action.payload
            } 
        case CLEAR_ERRORS:
                return {
                    ...state,
                    error: null
                }

        default: return {
            state
        }
    }
}


export const myOrderReducer = (state = {orders: []} , action) => {
    switch(action.type) {
        case orderConstants.MY_ORDERS_REQUEST: 
            return {
                loading: true 
            }
        case orderConstants.MY_ORDERS_SUCCESS: 
            return {
                loading: false ,
                orders: action.payload
            }
        case orderConstants.MY_ORDERS_FAIL: 
            return {
                loading: false ,
                error: action.payload
            }
        case orderConstants.CLEAR_ERRORS: 
            return {
                ...state ,
                error: null 
            }
        default: 
            return state ;
    }
}


export const orderDetailReducer = (state = {order: {}} , action) => {
    switch(action.type) {
        case orderConstants.ORDER_DETAILS_REQUEST: 
            return {
                loading: true 
            }
        case orderConstants.ORDER_DETAILS_SUCCESS: 
            return {
                loading: false ,
                order: action.payload
            }
        case orderConstants.ORDER_DETAILS_FAIL: 
            return {
                loading: false ,
                error: action.payload
            }
        case orderConstants.CLEAR_ERRORS: 
            return {
                ...state ,
                error: null 
            }
        default: 
            return state ;
    }
}