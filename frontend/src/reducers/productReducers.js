import ProductConstants from '../constants/productConstants' ;

const  productsReducer = ( state = { products: [] } , action) => {
    console.log('payload on reducer') ;
    console.log(action.payload) ;
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
                productCount: action.payload.productCount
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

export default productsReducer ;