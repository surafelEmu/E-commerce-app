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

export const myOrders = () => async (dispatch) => {
    dispatch({type: orderConstants.MY_ORDERS_REQUEST}) ;

    try{
        const {data} = await axios.get('/api/v1/orders/me')
        console.log('This is from the actions')
        console.log(data.orders) ;
        dispatch({
            type: orderConstants.MY_ORDERS_SUCCESS ,
            payload: data
        })
    } catch(error) {
        console.log('some error happened')
        console.log(error) ;
        dispatch({
            type: orderConstants.MY_ORDERS_FAIL ,
            payload: error
        })
    }
}


export const getOrderDetail = (id) => async (dispatch) => {
    dispatch({type: orderConstants.ORDER_DETAILS_REQUEST}) ;

    try{
        const {data} = await axios.get(`/api/v1/order/${id}`)
        console.log('This is from the actions')
        console.log(data.order) ;
        dispatch({
            type: orderConstants.ORDER_DETAILS_SUCCESS ,
            payload: data.order
        })
    } catch(error) {
        console.log('some error happened')
        console.log(error) ;
        // dispatch({
        //     type: orderConstants.ORDER_DETAILS_FAIL ,
        //     payload: error
        // })
    }
}




export const cleanErrors = () => async (dispatch) => {
    dispatch({
        type: orderConstants.CLEAR_ERRORS
    })
}