import React , {Fragment, useEffect} from 'react' ;
import { useAlert } from 'react-alert';

import Loader from './layout/loader';

import { Carousel } from 'react-bootstrap' ;

import { useDispatch , useSelector } from 'react-redux';
import { getProductDetail , cleanErrors } from '../actions/productActions';
import { MetaData } from './layout/MetaData';

const Details = ({match}) => {
    const dispatch = useDispatch() ;

    const alert = useAlert() ;


    const { loading , error , product } = useSelector(state => state.productDetails)
    // console.log(product.images) ;
    // const image = product.images ;
    // console.log(image) ;
    useEffect(() => {
        
        if(error) {
            console.log('this is error') ;
        console.log(error) ;
            alert.error(error) ;
            dispatch(cleanErrors())
        }

        dispatch(getProductDetail(match.params.id))

    } , [dispatch , match.params.id]) ;

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
                    <span className="btn btn-danger minus">-</span>
    
                    <input type="number" className="form-control count d-inline" value="1" readOnly />
    
                    <span className="btn btn-primary plus">+</span>
                </div>
                 <button type="button" id="cart_btn" className="btn btn-primary d-inline ml-4">Add to Cart</button>
    
                <hr />
    
                <p>Status: <span id="stock_status">{product.stock > 0 ? 'In Stock' : 'out of Stock'}</span></p>
    
                <hr />
    
                <h4 className="mt-2">Description:</h4>
                <p>{product.description}</p>
                <hr />
                <p id="product_seller mb-3">Sold by: <strong>{product.seller}</strong></p>
                
                <button id="review_btn" type="button" className="btn btn-primary mt-4" data-toggle="modal" data-target="#ratingModal">
                            Submit Your Review
                </button>
                
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
    
                                        <textarea name="review" id="review" className="form-control mt-3">
    
                                        </textarea>
    
                                        <button className="btn my-3 float-right review-btn px-4 text-white" data-dismiss="modal" aria-label="Close">Submit</button>
                                    </div>
                                </div>
                            </div>
                        </div>
    
                    </div>
                        
            </div>
    
        </div>
    
    </div>
            </Fragment>
        )}
        </Fragment>)}
        </Fragment>
    )
}

export default Details ;