import React , {Fragment ,useState , useEffect} from 'react'

import {useDispatch , useSelector} from 'react-redux' ;
import { getProducts } from '../actions/productActions'
import Pagination from 'react-js-pagination' ;
import { MetaData  } from './layout/MetaData';
import Loader from './layout/loader'
import Product from './product/product' ;
import { useAlert } from 'react-alert' ;

 const Home = () => {

    const [currentPage , setCurrentPage] = useState(1) ;

    const alert = useAlert() ;
    const dispatch = useDispatch() ;

    const {loading , products , error , resPerPage , productCount } = useSelector(state => state.products) ;

    const prodPerPage = 8 ;
    const prodCount =100000000 ;
    console.log(products)
    useEffect(() => {
    

      if(error) {
        return alert.error(error) ;
      }

      dispatch(getProducts(currentPage)) ;

    } , [dispatch , alert , error , currentPage])


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
                { products.map(product => {
                       return <Product key={product._id} product={product}/> 
     
                })}
           
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