
import userConstants from '../constants/userConstants' ;
import axios from 'axios';


export const updateUser = (updates) => async(dispatch) =>  {
    dispatch({type: userConstants.UPDATE_USER_REQUEST}) ;

    try{

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
        const updatedUser = await axios.put('/api/v1/profile/update' , updates , config) ;

        dispatch({type: userConstants.UPDATE_USER_SUCCESS , payload: updatedUser}) ;



    }catch(error) {
        dispatch({type: userConstants.UPDATE_USER_FAIL , payload: error.response.data.errMessage}) ;
    }
}   


export const updatePassword = async (oldPassword , newPassword) => async (dispatch) => {
    dispatch({
        type: userConstants.UPDATE_PASSWORD_REQUEST
    })

    try{

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        } ;

        const data = await axios.put('/api/v1/password/update' , {oldPassword , newPassword} , config) ;

        dispatch({
            type: userConstants.NEW_PASSWORD_SUCCESS ,
            payload: data
        })

    }catch(error) {
        dispatch({
            type: userConstants.UPDATE_PASSWORD_FAIL ,
            payload: error.response.data.errMessage
        })
    }
}