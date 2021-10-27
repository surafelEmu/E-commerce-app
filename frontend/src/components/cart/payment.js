import { Link } from 'react-router-dom'

import React , {Fragment, useEffect , useState} from 'react' ;
import { useAlert } from 'react-alert';

import Loader from '../layout/loader';

import {Something} from './something' ;
import { useDispatch , useSelector } from 'react-redux';
import { MetaData } from '../layout/MetaData';
import { addItemToCart , removeItemFromCart ,  } from '../../actions/cartAction' ;
import CheckoutSteps from './CheckoutStep';

import {newOrder} from '../../actions/orderAction'

import { useStripe , useElements , CardNumberElement , CardExpiryElement , CardCvcElement } from '@stripe/react-stripe-js'  ;

import axios from 'axios'

const options = {
    style:{
        base: {
            fontSize: '16px'
        } ,
        invalid: {
            color: '#9e2146'
        }
    }
}

const Payment = ({ history }) => {

    const alert = useAlert() ;
    const stripe = useStripe() ;
    const elements = useElements() ;
    const dispatch = useDispatch() ;


    const { user } = useSelector(state => state.auth) ;
    //const { order } = useSelector(state => state.order) ;

    const {cartItems , shippingInfo } = useSelector(state => state.cart) ;
    
    useEffect(() => {

    } , []) ;

    const data = localStorage.getItem('shippingInfo') 

    console.log(data) ;
    const order = {
        orderItems: cartItems ,
        shippingInfo
    }

    console.log(order) ;
    
    const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo'))
    //console.log(orderInfo)


    if(orderInfo) {
        order.itemsPrice = orderInfo.itemPrice ;
        order.shippingPrice = orderInfo.shippingPrice ;
        order.taxPrice = order.taxPrice ;
        order.totalPrice = order.totalPrice ;

    }

    const paymentData = {
       amount: Math.round( 500 * 100 ) 

    }
    console.log(paymentData)

    const submitHandler = async (e) => {
        e.preventDefault() ;

        document.querySelector('#pay_btn').disabled = true ;


        let res ;
        try{
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }

            res = await axios.post('/api/v1/payment/process' , paymentData , config) ;

            const clientSecret = res.data.client_Secret;

            console.log(clientSecret) ;

            if(!stripe || !elements) {

                return ;
            }

            const result = await stripe.confirmCardPayment(clientSecret , {
                payment_method: {
                    card: elements.getElement(CardNumberElement) ,
                    billing_details: {
                        name: user.name ,
                        email: user.email
                    }
                }
            }) ;

            if(result.error) {
                alert.error(result.error) ;
                document.querySelector('#pay_btn').disabled = false ;
            } else {
                if(result.paymentIntent.status === 'succeeded') {
                    order.paymentInfo = {
                        id: result.paymentIntent.id ,
                        status: result.paymentIntent.status
                    }

                    dispatch(newOrder(order)) ;
                    history.push('/orderSuccess') ;
                } else {
                    alert.error('There is some error occured wile processing payment') ;
                }
            }
        } catch(error) {
            document.querySelector('#pay_btn').disabled = false ;
            alert.error(error)
            console.log(error) ;
        }
    }

    return (
        <Fragment>
            <MetaData title={'Payment'} />

            <CheckoutSteps shipping confirmOrder payment />

            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg"
                    onSubmit={submitHandler}
                    >
                        <h1 className="mb-4">Card Info</h1>
                        <div className="form-group">
                            <label htmlFor="card_num_field">Card Number</label>
                            <CardNumberElement
                                type="text"
                                id="card_num_field"
                                className="form-control"
                                options={options}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="card_exp_field">Card Expiry</label>
                            <CardExpiryElement
                                type="text"
                                id="card_exp_field"
                                className="form-control"
                                options={options}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="card_cvc_field">Card CVC</label>
                            <CardCvcElement
                                type="text"
                                id="card_cvc_field"
                                className="form-control"
                                options={options}
                            />
                        </div>


                        <button
                            id="pay_btn"
                            type="submit"
                            className="btn btn-block py-3"
                        >
                            Pay {` - $${orderInfo.totalPrice}`}
                        </button>

                    </form>
                </div>
            </div>

        </Fragment>
    )
}

export default Payment ;
