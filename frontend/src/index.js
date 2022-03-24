import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { AuthProvider } from './Providers/authContext';
import { Provider } from 'react-redux';
import store from './Redux/storeinit';


ReactDOM.render(
    <AuthProvider>
      <Provider store={store.store}><App/></Provider>
    </AuthProvider>
    ,
  document.getElementById('root')
);
