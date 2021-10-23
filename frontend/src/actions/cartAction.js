import axios from "axios"
import cartConstants from '../constants/cartConstants'

export const addItemToCart = (id , quantity) => async (dispatch , getState) => {
    const data = await axios.get(`/api/v1/product/${id}`) ;

    console.log(data.data.product) ;
    dispatch({
        type: cartConstants.ADD_TO_CART ,
        payload: {
            product: data.data.product._id ,
            name: data.data.product.name ,
            price: data.data.product.price ,
            image: data.data.product.images[0] ,
            stock: data.data.product.stock ,
            quantity
        }
    })

    localStorage.setItem('cartItems' , JSON.stringify(getState().cart.cartItems))
}

export const removeItemFromCart = (id) => (dispatch , getState) => {
    dispatch({
        type: cartConstants.REMOVE_ITEM_CART ,
        payload: id
    })

    localStorage.setItem('cartItems' , JSON.stringify(getState().cart.cartItems))
}

export const saveShippingInfo = (data) => (dispatch , getState) => {

    dispatch({
        type: cartConstants.SAVE_SHIPPING_INFO ,
        payload: data

    }) 

    localStorage.setItem('shippingInfo' , JSON.stringify(data)) 
}