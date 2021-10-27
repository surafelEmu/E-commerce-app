import axios from 'axios' ;

import ProductConstants from '../constants/productConstants' ; 

export const getProducts = (keyword = '' , currentPage = 1 , price , catagory , rating = 0) => async (dispatch) => {
    try{
        dispatch({ type: ProductConstants.ALL_PRODUCTS_REQUEST})

        
        let link = `/api/v1/products?keyword=${keyword}&page=${currentPage}` 
            
            //&price[lte]=${price[1]}&price[gte]=${price[0]}&raings[gte]=${rating}` ;

            if(catagory) {
                link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&catagory=${catagory}&raings[gte]=${rating}` 
            }

        const { data } = await axios.get(link) ;
        console.log(data) ;

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
        dispatch({ type: ProductConstants.PRODUCT_DETAILS_REQUEST})

        const { data } = await axios.get(`/api/v1/product/${id}`) ;

        dispatch({
            type: ProductConstants.PRODUCT_DETAILS_SUCCESS ,
            payload: data
        })

    }catch(error) {
        dispatch({
            type: ProductConstants.PRODUCT_DETAILS_FAIL ,
            payload: error
        })
    }
}


export const newReview = (reviewData) => async (dispatch) => {
    try{
        dispatch({ type: ProductConstants.NEW_REVIEW_REQUEST})

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.put('/api/v1/review/new' , reviewData , config) ;
        console.log(data) ;

        dispatch({
            type: ProductConstants.NEW_REVIEW_SUCCESS 
        })

    }catch(error) {
        dispatch({
            type: ProductConstants.NEW_REVIEW_FAIL ,
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