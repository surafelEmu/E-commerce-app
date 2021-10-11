import axios from 'axios' ;

import ProductConstants from '../constants/productConstants' ; 

export const getProducts = () => async (dispatch) => {
    try{
        dispatch({ type: ProductConstants.ALL_PRODUCTS_REQUEST})

        const { data } = await axios.get('/api/v1/products') ;

        dispatch({
            type: ProductConstants.ALL_PRODUCTS_SUCCESS ,
            payload: data
        })

    }catch(error) {
        dispatch({
            type: ProductConstants.ALL_PRODUCTS_FAIL ,
            payload: error.response.data.errMessage
        })
    }
}

//clear Errors 

export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: ProductConstants.CLEAR_ERRORS
    })
}