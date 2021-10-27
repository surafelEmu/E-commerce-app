import Header from './components/layout/Header' ;
import Footer from './components/layout/footer'
import Home from './components/Home'
//import Product_detail from './components/product_detail';
import Detail from './components/Detail' ;
import Login from './components/user/login' ;
import Register from './components/user/register';
import ListOrders from './components/orders/ListOrders';
import {useEffect , useState} from 'react' ;

import axios from 'axios' ;

import store from './store' ;
import { loaduser } from './actions/authAction' ;
import ProtectedRout from './components/route/protectedRout';
import { BrowserRouter as Router , Route} from 'react-router-dom' ;
import Profile from './components/user/profile' ;
import UpdateProfile from './components/user/UpdateProfile';
import Shipping from './components/cart/Shipping' ;
import ConfirmOrder from './components/cart/ConfirmOrder' ;
import Payment from './components/cart/payment' ;
import Cart from './components/cart/cart' ;
// import OrderList from './components/orders/ListOrders' ;
import OrderDetail from './components/orders/orderDetail';
import { myOrders } from './actions/orderAction';

import Success from './components/cart/orderSuccess' ;
import './App.css'

import { useSelector , useDispatch } from 'react-redux';

// Payment 
import { Elements } from '@stripe/react-stripe-js' ;
import { loadStripe } from '@stripe/stripe-js' ;


function App() { 
  const [stripeApiKey , setStripeApiKey ] = useState('') ;


  useEffect(() => {
   
try{

  store.dispatch(loaduser()) ;
  store.dispatch(myOrders()) ;
    setStripeApiKey(process.env.REACT_APP_STRIPE_API_KEY) ;
} catch(error) {
  console.log(error) ;
}
    
  
  }, []) ;

  console.log('This is stripeKey')
  console.log(process.env.REACT_APP_STRIPE_API_KEY) ;

  return (
    <Router>
    <div className="App">
     <Header />
     <div className="container container-fluid">
          
          
          <ProtectedRout path = "/me" component={Profile} exact/>
          <ProtectedRout path = "/me/update" component={UpdateProfile} exact/>
          <Route path = "/cart" component={Cart} />
          <Route path = "/login" component={Login}/>
          <Route path = "/register" component={Register}/>
          <ProtectedRout path = "/shipping" component={Shipping} exact/>
          <ProtectedRout path = "/confirm" component={ConfirmOrder} exact/>
          <ProtectedRout path = "/success" component={Success} exact/>
          <ProtectedRout path = "/orders/me" component={ListOrders} exact/>
          <ProtectedRout path = "/order/:id" component={OrderDetail} exact/>

          <Route path = "/" component={Home} exact />
          <Route path = "/search/:keyword" component={Home}  />

          <Route path = "/product/:id" component={Detail} exact />

          {/* {stripeApiKey && 
            <Elements stripe={loadStripe(stripeApiKey)}>
              <ProtectedRout path="/payment" component={Payment} />
            </Elements>
          } */}
     </div>
     <Footer /> 
    </div>
    </Router>
   
  );
}

export default App;
