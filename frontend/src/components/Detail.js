import React , {Fragment, useEffect , useState} from 'react' ;
import { useAlert } from 'react-alert';

import Loader from './layout/loader';

import { Carousel } from 'react-bootstrap' ;

import { useDispatch , useSelector } from 'react-redux';
import { newReview , getProductDetail , cleanErrors } from '../actions/productActions';
import { MetaData } from './layout/MetaData';
import { addItemToCart } from '../actions/cartAction' ;
import productConstants from '../constants/productConstants' ;
import Review from './review/review' ;

const Details = ({match}) => {


    const dispatch = useDispatch() ;

    const [rating , setRating] = useState() ;

    const [comment , setComment] = useState() ;




    const alert = useAlert() ;

    const [quantity , setQuantity] = useState(1) ;
    const {cartItems} = useSelector(state => state.cart) ;
    const { success , error:reviewError } = useSelector(state => state.productReview) ;
    const { loading , error , product } = useSelector(state => state.productDetails) ;
    const { user } = useSelector(state => state.auth) ;
     console.log(product.reviews) ;
    // const image = product.images ;
    // console.log(image) ;
    useEffect(() => {

        if(cartItems) {
            console.log('added successsully') ;
            console.log(cartItems) ;
        }
        
        if(error) {
            console.log('this is error') ;
        console.log(error) ;
            alert.error(error) ;
            dispatch(cleanErrors())
        }

        if(reviewError) {
            alert.error(reviewError) ;
            dispatch(cleanErrors()) ;
        }
        if(success) {
            alert.success('Review posted successfully') ;
            dispatch({type: productConstants.NEW_REVIEW_RESET}) ;
        }

        dispatch(getProductDetail(match.params.id))

    } , [dispatch , match.params.id]) ;


    const addToCart = () => {
        dispatch(addItemToCart(match.params.id , quantity)) ;
        alert.success('Item Added to Cart') ;
    } 

    const decreaseQty = () => {
        const count = document.querySelector('.count') ;
        console.log(document.querySelector('.count')) ;
        if(count.valueAsNumber <= 1) return ;

        const qty = count.valueAsNumber - 1;
        setQuantity(qty) ;
    }

    const increaseQty = () => {
        
        const count = document.querySelector('.count') ;
        console.log(document.querySelector('.count')) ;
        if(count.valueAsNumber >= product.stock) return ;
        
        const qty = count.valueAsNumber + 1 ;
        setQuantity(qty) ;
    }

    function setUserRatings() {
        const stars = document.querySelectorAll('.star');

        stars.forEach((star, index) => {
            star.starValue = index + 1;

            ['click', 'mouseover', 'mouseout'].forEach(function (e) {
                star.addEventListener(e, showRatings);
            })
        })

        function showRatings(e) {
            stars.forEach((star, index) => {
                if (e.type === 'click') {
                    if (index < this.starValue) {
                        star.classList.add('orange');

                        setRating(this.starValue)
                    } else {
                        star.classList.remove('orange')
                    }
                }

                if (e.type === 'mouseover') {
                    if (index < this.starValue) {
                        star.classList.add('yellow');
                    } else {
                        star.classList.remove('yellow')
                    }
                }

                if (e.type === 'mouseout') {
                    star.classList.remove('yellow')
                }
            })
        }
    }

    const reviewHandler = () => {
        const formData = new FormData();

        formData.set('rating', rating);
        formData.set('comment', comment);
        formData.set('productId', match.params.id);

        dispatch(newReview(formData));
    }


    return (
        <Fragment> 
        {error ? <div>"Some thing went wrong"</div> : ( 
        <Fragment>

        
       
        {loading ? <Loader/> : (
            
            <Fragment>
            <MetaData title={product.name} /> 
            <div className="row f-flex justify-content-around">
            <div className="col-12 col-lg-5 img-fluid" id="product_image">
                <Carousel pause='hover'>
                    {product.images && product.images.map(image => ( 
                        <Carousel.Item key={image.public_id}>
                            <img className="d-block w-100" src={image.url} />
                        </Carousel.Item>
                    ))}
                </Carousel>              
            </div>
    
            <div className="col-12 col-lg-5 mt-5">
                <h3>{product.name}</h3>
                <p id="product_id">Product # sklfjdk35fsdf5090</p>
    
                <hr />
    
                <div className="rating-outer">
                    <div className="rating-inner" style={{width: `${(product.ratings / 5) * 100}%`}}></div>
                </div>
                <span id="no_of_reviews">{product.numOfReviews} reviews</span>
    
                <hr />
    
                <p id="product_price">${product.price}</p>
                <div className="stockCounter d-inline">
                    <span className="btn btn-danger minus" onClick={decreaseQty}>-</span>

                    <input type="number" className="form-control count d-inline" value={quantity} readOnly />

                    <span className="btn btn-primary plus" onClick={increaseQty}>+</span>
                 </div>
                 <button type="button" id="cart_btn" className="btn btn-primary d-inline ml-4" onClick={addToCart}>Add to Cart</button>
    
                <hr />
    
                <p>Status: <span id="stock_status">{product.stock > 0 ? 'In Stock' : 'out of Stock'}</span></p>
    
                <hr />
    
                <h4 className="mt-2">Description:</h4>
                <p>{product.description}</p>
                <hr />
                <p id="product_seller mb-3">Sold by: <strong>{product.seller}</strong></p>
                
 
                {user ? <button id="review_btn" type="button" className="btn btn-primary mt-4" data-toggle="modal" data-target="#ratingModal" onClick={setUserRatings}>
                                Submit Your Review
                            </button>
                                :
                                <div className="alert alert-danger mt-5" type='alert'>Login to post your review.</div>
                            }


                            <div className="row mt-2 mb-5">
                                <div className="rating w-50">

                                    <div className="modal fade" id="ratingModal" tabIndex="-1" role="dialog" aria-labelledby="ratingModalLabel" aria-hidden="true">
                                        <div className="modal-dialog" role="document">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h5 className="modal-title" id="ratingModalLabel">Submit Review</h5>
                                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                        <span aria-hidden="true">&times;</span>
                                                    </button>
                                                </div>
                                                <div className="modal-body">

                                                    <ul className="stars" >
                                                        <li className="star"><i className="fa fa-star"></i></li>
                                                        <li className="star"><i className="fa fa-star"></i></li>
                                                        <li className="star"><i className="fa fa-star"></i></li>
                                                        <li className="star"><i className="fa fa-star"></i></li>
                                                        <li className="star"><i className="fa fa-star"></i></li>
                                                    </ul>

                                                    <textarea
                                                        name="review"
                                                        id="review" className="form-control mt-3"
                                                        value={comment}
                                                        onChange={(e) => setComment(e.target.value)}
                                                    >

                                                    </textarea>

                                                    <button className="btn my-3 float-right review-btn px-4 text-white" onClick={reviewHandler} data-dismiss="modal" aria-label="Close">Submit</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
    
        </div>
    
    </div>

    {product.reviews.length > 0 ? (
        <Review reviews={product.reviews} />
    ): <div>no reviews yet</div>}
            </Fragment>
        )}
        </Fragment>)}
        </Fragment>
    )
}

export default Details ;