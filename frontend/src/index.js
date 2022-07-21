import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { OverlayProvider } from './Providers/overlayContext';
import { AuthProvider } from './Providers/authContext';
import { Provider } from 'react-redux';
import store from './Redux/storeinit';
import { ChatSocketContextProvider } from './Providers/chatSocketContext';


ReactDOM.render(
    <AuthProvider>
      <OverlayProvider>
        <ChatSocketContextProvider>
          <Provider store={store.store}>
            <App/>
          </Provider>
        </ChatSocketContextProvider>
      </OverlayProvider>
    </AuthProvider>
    ,
  document.getElementById('root')
);
