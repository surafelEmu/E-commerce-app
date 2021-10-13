import Header from './components/layout/Header' ;
import Footer from './components/layout/footer'
import Home from './components/Home'
//import Product_detail from './components/product_detail';
import Detail from './components/Detail' ;

import { BrowserRouter as Router , Route} from 'react-router-dom' ;

import './App.css'
function App() { 
  return (
    <Router>
    <div className="App">
     <Header />
     <div className="container container-fluid">
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
