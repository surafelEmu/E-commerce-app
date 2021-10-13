import ProductConstants, { PRODUCTS_DETAIL_FAIL, PRODUCTS_DETAIL_SUCCESS } from '../constants/productConstants' ;

export const  productsReducer = ( state = { products: [] } , action) => {
    
    switch(action.type) {
        case ProductConstants.ALL_PRODUCTS_REQUEST: 
            return {
                loading: true,
                products: []
            }
        case ProductConstants.ALL_PRODUCTS_SUCCESS: 
            return {
                loading: false,
                products: action.payload.products ,
                productCount: action.payload.productCount ,
                resPerPage: action.payload.resPerPage
            } 
        case ProductConstants.ALL_PRODUCTS_FAIL: 
            return {
                loading: false,
                products: [] ,
                error: action.payload
              } 
        case ProductConstants.CLEAR_ERRORS: 
            return {
                ...state ,
                error: null
            }         
            
        
        default: return state ;
    }
}

export const productDetailsReducer = (state = { product:  [] } , action) => {
    switch(action.type) {
        case ProductConstants.PRODUCTS_DETAIL_REQUEST: 
            return {
                ...state ,
                loading: true
            }
        case ProductConstants.PRODUCTS_DETAIL_SUCCESS: 
            return {
                loading: false ,
                product: action.payload.product
            }
        case ProductConstants.PRODUCTS_DETAIL_FAIL: 
            return {
                ...state ,
                loading: false ,
                product: [] ,
                error: action.payload
            }
        case ProductConstants.CLEAR_ERRORS: 
            return {
                ...state ,
                error: null
            }
        default: return   state 
    }
}

