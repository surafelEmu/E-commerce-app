import userConstants from '../constants/userConstants' ;

export const authReducer = (state = {user: {}} , action) => {
    switch(action.type) {
        case userConstants.LOGIN_REQUEST : 
            return {
                loading: true ,
                isAuthenticated: false 
            }
        case userConstants.LOGIN_SUCCESS : 
            return {
                ...state ,
                loading: false ,
                isAuthenticated: true ,
                payload: action.payload
            }

        case userConstants.LOGIN_FAIL: 
            return {
                ...state ,
                loading: false ,
                isAuthenticated: false ,
                payload: action.payload ,
                user: null  
            }

        default: return {
            payload: action.payload ,
        }
    }
}

export const registerReducer = (state = {user: {}} , action) => {

    switch(action.type) {
        case userConstants.REGISTER_USER_REQUEST: 
            return {
                loading: true ,
                isAuthenticated: false ,

            }
        case userConstants.REGISTER_USER_SUCCESS: 
            return {
                ...state ,
                loading: false ,
                isAuthenticated: true ,
                payload: action.payload
            }
        case userConstants.REGISTER_USER_FAIL: 
            return {
                loading: false ,
                isAuthenticated: false ,
                payload: action.payload
            }
        case userConstants.CLEAR_ERRORS: 
            return {
                ...state ,
                error: null
            }         
            
        default :
            return {
                state
            }

    }

}


