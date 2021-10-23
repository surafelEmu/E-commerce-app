import React , {Fragment, useEffect , useState} from 'react' ;
import {Route ,Link} from 'react-router-dom' ;

import { useDispatch , useSelector } from 'react-redux';
import { addItemToCart , removeItemFromCart ,  } from '../../actions/cartAction' ;

export const Something = ({item}) => {

    const {cartItems } = useSelector(state => state.cart) ;

    useEffect( () => {

        console.log(cartItems) ;
    } ,[cartItems]
    )

    const dispatch = useDispatch() ;

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

   
                return (
                    
                             <React.Fragment>
                                  <hr />

                                <div className="cart-item" key={item.product}>
                                    {console.log(item.image.url)}
                                    <div className="row">
                                        <div className="col-4 col-lg-3">
                                            <img src={item.image.url} alt="Laptop" height="90" width="115" />
                                        </div>
                                        
                                        <div className="col-5 col-lg-3">
                                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                                        </div>
                                       
                                        

                                         <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                                            <p id="card_item_price">${item.price}</p>
                                        </div>

                                        <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                                            <div className="stockCounter d-inline">
                                                <span className="btn btn-danger minus" onClick={() => decreaseQty(item.product, item.quantity)}>-</span>

                                                <input type="number" className="form-control count d-inline" value={item.quantity} readOnly />

                                                <span className="btn btn-primary plus" onClick={() => increaseQty(item.product, item.quantity, item.stock)}>+</span>
                                            </div>
                                        </div>

                                        <div className="col-4 col-lg-1 mt-4 mt-lg-0">
                                            <i id="delete_cart_item" className="fa fa-trash btn btn-danger" onClick={() => removeCartItemHandler(item.product)} ></i>
                                        </div> 

                                    </div>
                                </div>
                                <hr />

                                </React.Fragment>
                              
                        

                    
    )
}
