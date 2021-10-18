import userConstants from '../constants/userConstants' ;

export const authReducer = (state = {user: {}} , action) => {
    switch(action.type) {
        case userConstants.LOGIN_REQUEST : 
        case userConstants.REGISTER_USER_REQUEST: 
        case userConstants.LOAD_USER_REQUEST : 
            return {
                loading: true ,
                isAuthenticated: false 
            }
        case userConstants.LOGIN_SUCCESS : 
        case userConstants.REGISTER_USER_SUCCESS: 
        case userConstants.LOAD_USER_SUCCESS : 
            return {
                ...state ,
                loading: false ,
                isAuthenticated: true ,
                user: action.payload
            }

        case userConstants.LOGIN_FAIL: 
        case userConstants.REGISTER_USER_FAIL: 
        case userConstants.LOAD_USER_FAIL : 
            return {
                loading: false ,
                isAuthenticated: false ,
                user: null ,
                error: action.payload 
            }

        case userConstants.LOGOUT_SUCCESS: 
            return {
                loading: false ,
                isAuthenticated: false ,
                user: null 
            }

        case userConstants.LOGOUT_FAIL : 
            return {
                ...state ,
                error: action.payload
            }

        default: return {
            state
        }
    }
}
