import React , {Fragment ,useState , useEffect} from 'react'


import Slider from 'rc-slider' ;
import 'rc-slider/assets/index.css' ;
import {useDispatch , useSelector} from 'react-redux' ;
import { getProducts } from '../actions/productActions'
import Pagination from 'react-js-pagination' ;
import { MetaData  } from './layout/MetaData';
import Loader from './layout/loader'
import Product from './product/product' ;
import { useAlert } from 'react-alert' ;

import { login } from '../actions/userAction' ;

const { createSliderWithTooltip } = Slider ;

const Range = createSliderWithTooltip(Slider.Range)

 const Home = ({match}) => {



    const [currentPage , setCurrentPage] = useState(1) ;

    const [price , setPrice] = useState([1 , 1000]) ;
    const [catagory , setCatagory] = useState(``)
    const [rating , setRating] = useState(0) ;



    const catagories = [
                'Electronics' ,
                'Cameras' ,
                'Laptop' ,
                'Accessories' ,
                'Headphones' ,
                'Food' ,
                'Books' ,
                'Clothes/Shoes' ,
                'Beauty/Health' ,
                'Home'
    ] ;

    const alert = useAlert() ;
    const dispatch = useDispatch() ;

    const {loading , products , error , resPerPage , productCount  } = useSelector(state => state.products) ;
    const {isAuthenticated} = useSelector(state => state.auth) ;

    const prodPerPage = 8 ;
    const prodCount =100000000 ;
    console.log(products)

    const keyword = match.params.keyword ;

    useEffect(() => {
      // dispatch(Login(
      //   "shemanew009@gmail.com" ,
      //   "sheme@Shemanew"
      // ))


      // if(isAuthenticated) {

        
      //   console.log('it is authenticated successfully') ;
      // }
    

      if(error) {
        return alert.error(error) ;
      }

      dispatch(getProducts(keyword ,currentPage , price , catagory) ,rating) ;

    } , [dispatch , alert , error , keyword , currentPage , price , catagory , rating])


    function setCurrentPageNo(pageNumber) {
      setCurrentPage(pageNumber)
    }

    return (
        <Fragment>
         {loading ? <Loader /> : (
           <Fragment>
              <MetaData title={'Buy Best Products Online'}/>
              <h1 id="products_heading">Latest Products</h1>

              <section id="products" className="container mt-5">
              <div className="row">
                {keyword ? (
                  <Fragment>
                      <div className="col-6 col-md-3 mt-5 mb-5">
                        <div className="px-5">
                          <Range 
                              marks={{
                                1: `$1` ,
                                1000: `$1000`
                              }}
                              min={1}
                              max={1000}
                              defaultValue={1,1000}
                              tipFormatter={value => `$${value}`}
                              tipProps={{
                                placement: "top" ,
                                visible: true
                              }}
                              value={price}
                              onChange={price => setPrice(price)}
                              />
                              <hr className="my-5" />

                           <div className="mt-5">
                             <h4 className="mb-3">
                                catagory
                             </h4>
                             <ul className="pl-0">
                               {catagories.map(catagory => (
                                 <li style={{cursor: 'pointer' , 
                                              listStyleType: 'none',
                                            }}
                                              key={catagory} 
                                              onClick={() => setCatagory(catagory)  }
                                             >
                                          {catagory}
                                 </li>
                               ))}
                             </ul>
                           </div>

                           <hr className="my-3" />

                           <div className="mt-5">
                             <h4 className="mb-3">
                                Ratings
                             </h4>
                             <ul className="pl-0">
                               {[5 , 4, 3 ,2 ,1].map(star => (
                                 <li style={{cursor: 'pointer' , 
                                              listStyleType: 'none',
                                            }}
                                              key={star} 
                                              onClick={() => setRating(star)  }
                                             >
                                          <div className="rating-outer">
                                            <div className="rating-inner" 
                                                style={{
                                                  width: `${star * 20}%`
                                                }}>
                                              
                                            </div>

                                          </div>
                                 </li>
                               ))}
                             </ul>
                           </div>

                        </div>
                      </div>

                      
                      <div className="col-6 col-md-9">
                              <div className="row">
                                { 
                                products.map(product => {
                                return <Product key={product._id} product={product} col={4}/> 
  
                                }) }
                              </div>
                      </div>
                  </Fragment>
                  
                ): (
                  
                  products.map(product => {
                  return <Product key={product._id} product={product} col={3}/> 
  
                 })
                )}
                
           
                      </div>
                      <div className="d-flex justify-content-center mt-5">
                        <Pagination 
                          activePage={currentPage}
                          itemsCountPerPage={prodPerPage} 
                          totalItemsCount = {productCount} 
                          onChange={setCurrentPageNo}
                          nextPageText = {'Next'}
                          prevPageText = {'prev'}
                          firstPageText = {'First'}
                          lastPageText = {'last'}
                          itemClass="page-item"
                          linkClass="page-link"
                           />
                           
                      </div>
                    </section>
           </Fragment>
         )}
         

              </Fragment>
  
    )
}

export default  Home;