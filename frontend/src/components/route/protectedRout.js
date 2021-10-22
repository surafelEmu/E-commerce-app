import React , { Fragment} from 'react' ;
import {useDispatch , useSelector } from 'react-redux' ;

import  {Route , Redirect } from 'react-router';


const ProtectedRout = ({component: Component , ...rest}) => {
    const { user , loading ,isAuthenticated } = useSelector(state => state.auth)  ;

    return (
        <Fragment>
             {loading === false && (
                <Route
                    {...rest}
                    render={props => {
                        if(isAuthenticated === false) {
                            return <Redirect to = '/login' /> 
                        }
                        return <Component {...props} />
                    }}
                    />
             )}
        </Fragment>
    )
}

export default ProtectedRout ;