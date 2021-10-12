import React , {Fragment , useEffect} from 'react'

import {useDispatch , useSelector} from 'react-redux' ;
import { getProducts } from '../actions/productActions'

import { MetaData  } from './layout/MetaData';
import Loader from './layout/loader'
import Product from './product/product' ;
import { useAlert } from 'react-alert' ;

 const Home = () => {

    const alert = useAlert() ;
    const dispatch = useDispatch() ;

    const {loading , products , error , productCount } = useSelector(state => state.products) ;


    useEffect(() => {
    

      if(error) {
        return alert.error(error) ;
      }

      dispatch(getProducts()) ;

    } , [dispatch , alert , error])

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
                    </section>
           </Fragment>
         )}
         

              </Fragment>
  
    )
}

export default  Home;