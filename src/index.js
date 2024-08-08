import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import {thunk} from 'redux-thunk';
import { BrowserRouter as Router } from 'react-router-dom';
import { GoogleOAuthProvider } from "@react-oauth/google";

import App from './App';
import {reducers} from './redux/reducers'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <GoogleOAuthProvider
          clientId={`447931070548-ovg5u9tsc452bqaceijlrtaqcsn3elgm.apps.googleusercontent.com`}>
          <App />
        </GoogleOAuthProvider>
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);








