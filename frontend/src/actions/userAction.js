const userConstants = require('../constants/userConstants') ;
const axios = require('axios') ;

export const Login = (email, password) => async (dispatch) =>  {
    dispatch({type: userConstants.LOGIN_REQUEST}) ;

    try{
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    
        const data = axios.post('/api/v1/signin' , {email , password} , config) ;
    
        console.log(data) ;
        dispatch({type: userConstants.LOGIN_SUCCESS , payload: data })
    } catch(error) {
        dispatch({type: userConstants.LOGIN_FAIL , payload: error}) ;
    }
   

}