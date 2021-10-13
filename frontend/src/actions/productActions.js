import axios from 'axios' ;

import ProductConstants from '../constants/productConstants' ; 

export const getProducts = (keyword = '' , currentPage = 2) => async (dispatch) => {
    try{
        dispatch({ type: ProductConstants.ALL_PRODUCTS_REQUEST})

        const { data } = await axios.get(`/api/v1/products?keyword=${keyword}&page=${currentPage}`) ;

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


export const getProductDetail = (id) => async (dispatch) => {
    try{
        dispatch({ type: ProductConstants.PRODUCTS_DETAIL_REQUEST})

        const { data } = await axios.get(`/api/v1/product/${id}`) ;

        dispatch({
            type: ProductConstants.PRODUCTS_DETAIL_SUCCESS ,
            payload: data
        })

    }catch(error) {
        dispatch({
            type: ProductConstants.PRODUCTS_DETAIL_FAIL ,
            payload: error.response.data.errMessage
        })
    }
}


//clear Errors 

export const cleanErrors = () => async (dispatch) => {
    dispatch({
        type: ProductConstants.CLEAR_ERRORS
    })
}