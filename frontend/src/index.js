import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ChatSocketContextProvider } from './CONTEXT API/CHATSOCKET_CONTEXT';
import { OverlayProvider } from './CONTEXT API/OVERLAY_CONTEXT';
import { AuthProvider } from './CONTEXT API/AUTH_CONTEXT';
import { Provider } from 'react-redux';
import store from './REDUX/STOREINIT';


ReactDOM.render(
    <AuthProvider>
      <ChatSocketContextProvider>
        <OverlayProvider>
            <Provider store={store.store}>
              <App/>
            </Provider>
        </OverlayProvider>
      </ChatSocketContextProvider>
    </AuthProvider>
    ,
  document.getElementById('root')
);
