import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { AuthProvider } from './Providers/authContext';
import { Provider } from 'react-redux';
import store from './Redux/storeinit';
import { OverlayProvider } from './Providers/overlayContext';


ReactDOM.render(
    <AuthProvider>
      <OverlayProvider>
        <Provider store={store.store}><App/></Provider>
      </OverlayProvider>
    </AuthProvider>
    ,
  document.getElementById('root')
);
