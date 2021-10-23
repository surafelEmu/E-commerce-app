import React , {Link ,Fragment, useEffect , useState} from 'react' ;
import { useAlert } from 'react-alert';

import Loader from '../layout/loader';

import {Something} from './something' ;
import { useDispatch , useSelector } from 'react-redux';
import { MetaData } from '../layout/MetaData';
import { addItemToCart , removeItemFromCart ,  } from '../../actions/cartAction' ;

const Cart = ({history}) => {


    const dispatch = useDispatch() ;

    const { cartItems } = useSelector(state => state.cart) ;

    const removeCartItemHandler = (id) => {
        dispatch(removeItemFromCart(id))
    }

    const increaseQty = (id, quantity, stock) => {
        const newQty = quantity + 1;

        if (newQty > stock) return;

        dispatch(addItemToCart(id, newQty))
    }

    const decreaseQty = (id, quantity) => {

        const newQty = quantity - 1;

        if (newQty <= 0) return;

        dispatch(addItemToCart(id, newQty))

    }

    const checkoutHandler = () => {
        history.push('/login?redirect=shipping')
    }

   
    return (
        <Fragment>
        <MetaData title={'Your Cart'} />
        {cartItems.length === 0 ? <h2 className="mt-5">Your Cart is Empty</h2> : 
            ( 
            <Fragment>
                <h2 className="mt-5">Your Cart: <b>{cartItems.length} items</b></h2>

                <div className="row d-flex justify-content-between">
                    <div className="col-12 col-lg-8">

                        {cartItems.map(item => {
                            return <Something item={item} />
                        }
                            
                        )} 

                    </div>

                    <div className="col-12 col-lg-3 my-4">
                        <div id="order_summary">
                            <h4>Order Summary</h4>
                            <hr />
                            <p>Subtotal:  <span className="order-summary-values">{cartItems.reduce((acc, item) => (acc + Number(item.quantity)), 0)} (Units)</span></p>
                            <p>Est. total: <span className="order-summary-values">${cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0).toFixed(2)}</span></p>

                            <hr />
                            <button id="checkout_btn" className="btn btn-primary btn-block" onClick={checkoutHandler}>Check out</button>
                        </div>
                    </div>
                </div>
            </Fragment>
            )}
    </Fragment>
    )
}

export default Cart ;