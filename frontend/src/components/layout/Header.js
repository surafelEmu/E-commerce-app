import React , {Fragment , useState , useEffect} from 'react'

import Search from './search' ;
import {Route ,Link} from 'react-router-dom' ;

import { useDispatch, useSelector } from 'react-redux' ;

import { logout } from '../../actions/authAction' ;

const Header = () => {

  const { isAuthenticated , user , error , loading } = useSelector(state => state.auth)  ;

  const dispatch = useDispatch() ;
  useEffect( () => {

    
    if(isAuthenticated) {

      console.log(user.name) ;
    }

  } , [isAuthenticated])

  const handleLOGOUT = (e) => {
    e.preventDefault(); 
    dispatch(logout()) ;
   // alert.success('Logged out successfully') ;
  }

    return (
        <Fragment>
            <nav className="navbar row">
      <div className="col-12 col-md-3">
        <div className="navbar-brand">
          <img src="./images/shopit_logo.png" />
        </div>
      </div>

      <div className="col-12 col-md-6 mt-2 mt-md-0">
        
        <Route render={ ({history}) => <Search history={history} /> } />
      </div>

      <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
        
        <Link to = '/cart' >
          <span id="cart" className="ml-3">Cart</span> 
          <span className="ml-1" id="cart_count">2</span>
       </Link>

        {user ? (
                        <div className="ml-4 dropdown d-inline">
                            <Link className="btn dropdown-toggle text-white mr-4" type="button" id="dropDownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">

                                <figure className="avatar avatar-nav">
                                    <img
                                        src={user.avatar && user.avatar.url}
                                        alt={user && user.name}
                                        className="rounded-circle"
                                    />
                                </figure>
                                <span>{user && user.name}</span>
                            </Link>
                            

                            <div className="dropdown-menu" aria-labelledby="dropDownMenuButton">

                                {user && user.role === 'admin' && (
                                    <Link className="dropdown-item" to="/dashboard">Dashboard</Link>
                                )}
                                <Link className="dropdown-item" to="/orders/me">Orders</Link>
                                <Link className="dropdown-item" to="/me">Profile</Link>
                                <Link className="dropdown-item text-danger" to="/" onClick={handleLOGOUT} >
                                    Logout
                                </Link>

                            </div>

                        </div>

                    ) : !loading && <Link to="/login" className="btn ml-4" id="login_btn">Login</Link>}

      </div>


                     

    </nav>

        </Fragment>
    )
}

export default Header;