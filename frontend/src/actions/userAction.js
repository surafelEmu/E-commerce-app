const userConstants = require('../constants/userConstants') ;
const axios = require('axios') ;

export const login = (email, password) => async (dispatch) =>  {
    dispatch({type: userConstants.LOGIN_REQUEST}) ;

    try{
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    
        const data = await axios.post('/api/v1/signin' , {email , password} , config) ;
    
        console.log(data) ;
        dispatch({type: userConstants.LOGIN_SUCCESS , payload: data })
    } catch(error) {
        dispatch({type: userConstants.LOGIN_FAIL , payload: error}) ;
    }
   

} 

export const register = (userData) => async (dispatch) => {

    try{
        dispatch({type: userConstants.ALL_USERS_REQUEST}) ;

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const data = await axios.post('/api/v1/register' , userData , config )

        dispatch({type: userConstants.REGISTER_USER_SUCCESS , payload: data}) ;

    }catch(error) {
        dispatch(error) ;
    }
}



export const cleanErrors = () => async (dispatch) => {
    dispatch({
        type: userConstants.CLEAR_ERRORS
    })
}