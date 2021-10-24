import orderConstants from '../constants/orderConstants' ;

export const newOrderReducer = (state = {order: {}} , action) => {
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

        default: return {
            state
        }
    }
}

// export const allOrderReducer = (state = {user: {}} , action) => {
//     switch(action.type) {
//         case userConstants.UPDATE_USER_REQUEST : 
//         case userConstants.UPDATE_PASSWORD_REQUEST:
//             return {
//                 ...state ,
//                 loading: true ,
//                 isUpdated: false ,

//             }
//         case userConstants.UPDATE_USER_SUCCESS : 
//         case userConstants.UPDATE_PASSWORD_SUCCESS: 
//             return {
//                 ...state ,
//                 loading: false ,
//                 isUpdated: true ,
//                 updatedUser: action.payload 

//             }
//         case userConstants.UPDATE_USER_FAIL : 
//         case userConstants.UPDATE_PASSWORD_FAIL: 
//             return {
//                 ...state ,
//                 loading: false ,
//                 isUpdated: false ,
//                 err: action.payload
//             }
//         case userConstants.UPDATE_USER_RESET : 
//         case userConstants.UPDATE_PASSWORD_RESET: 
//             return {
//                 ...state ,
//                 loading: false ,
//                 isUpdated: false ,
//                 updatedUser: null 
//             }
//         default: 
//             return  state ;
            

//     }
// }
