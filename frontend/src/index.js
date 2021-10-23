import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { Provider } from 'react-redux' 

import { positions , transitions , Provider as AlertProvider } from 'react-alert' ;
import AlertTemplate from 'react-alert-template-basic'

import {PersistGate} from 'redux-persist/integration/react' ;

import {store , persistor} from './store' ;


const options = {
  timeout: 5000 ,
  positions: positions.BOTTOM_CENTER,
  transition: transitions.SCALE
}

ReactDOM.render(
  <Provider store={store}>
    <AlertProvider template={AlertTemplate} {...options}>
      <PersistGate persistor={persistor}>
      <App />
      </PersistGate>
    </AlertProvider>
 </Provider>,
  document.getElementById('root')
);
