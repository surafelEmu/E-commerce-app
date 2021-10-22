import Header from './components/layout/Header' ;
import Footer from './components/layout/footer'
import Home from './components/Home'
//import Product_detail from './components/product_detail';
import Detail from './components/Detail' ;
import Login from './components/user/login' ;
import Register from './components/user/register';

import {useEffect} from 'react' ;

import store from './store' ;
import { loaduser } from './actions/authAction' ;
import ProtectedRout from './components/route/protectedRout';
import { BrowserRouter as Router , Route} from 'react-router-dom' ;
import Profile from './components/user/profile' ;
import UpdateProfile from './components/user/UpdateProfile';
import './App.css'
function App() { 

  useEffect(() => {
    store.dispatch(loaduser()) ;
  }, []) ;

  return (
    <Router>
    <div className="App">
     <Header />
     <div className="container container-fluid">
          
          
          <ProtectedRout path = "/me" component={Profile} exact/>
          <ProtectedRout path = "/me/update" component={UpdateProfile} exact/>

          <Route path = "/login" component={Login}/>
          <Route path = "/register" component={Register}/>

          <Route path = "/" component={Home} exact />
          <Route path = "/search/:keyword" component={Home}  />

          <Route path = "/product/:id" component={Detail} exact />

     </div>
     <Footer /> 
    </div>
    </Router>
   
  );
}

export default App;
