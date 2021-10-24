const orderConstants = require('../constants/orderConstants') ;
const axios = require('axios') ;

export const newOrder = (order) => async (dispatch) =>  {
    dispatch({type: orderConstants.CREATE_ORDER_REQUEST}) ;

    

    try{
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        //console.log('Trying to access email: ' + email) ;
    
        const data = await axios.post('/api/v1/order/new' , order , config) ;
    
        console.log(data) ;
        dispatch({type: orderConstants.CREATE_ORDER_SUCCESS , payload: data })
    } catch(error) {
        console.log('error..' + error) ;
        dispatch({type: orderConstants.CREATE_ORDER_FAIL , payload: error.response.data.errMessage}) ;
    }
   

} 

// export const register = (userData) => async (dispatch) => {
//     dispatch({type: userConstants.REGISTER_USER_REQUEST}) ;

//     try{

//         const config = {
//             headers: {
//                 'Content-Type': 'multipart/form-data'
//             }
//         }
//         console.log('requsting register......')

//         const {data} = await axios.post('/api/v1/register' , userData , config ) ;

//         console.log('register done........')
//         dispatch({type: userConstants.REGISTER_USER_SUCCESS , payload: data.user}) ;

//     }catch(error) {
//         dispatch({type: userConstants.REGISTER_USER_FAIL , payload: error}) ;
//     }
// }


// export const loaduser = () => async (dispatch) => {
//     dispatch({type: userConstants.LOAD_USER_REQUEST}) ;

//     try{

//         const {data} = await axios.get('/api/v1/me') ;

//         console.log(data) ;

//         dispatch({type: userConstants.LOAD_USER_SUCCESS , payload: data.user}) ;

//     }catch(error) {
//         console.log(error)
//         dispatch({type: userConstants.LOAD_USER_FAIL , payload: error}) ;
//     }
// }

// export const logout = () => async (dispatch) => {

//     try{

//         await axios.get('/api/v1/logout') ;

//         dispatch({ type: userConstants.LOGOUT_SUCCESS }) ;

//     }catch(error) {
//         console.log(error)
//         dispatch({type: userConstants.LOGOUT_FAIL , payload: error}) ;
//     }
// }







export const cleanErrors = () => async (dispatch) => {
    dispatch({
        type: orderConstants.CLEAR_ERRORS
    })
}