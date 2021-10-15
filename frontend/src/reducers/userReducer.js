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
                payload: null 
            }

        default: return {
            payload: state ,
        }
    }
}


