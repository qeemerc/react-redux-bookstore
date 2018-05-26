import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import createHistory from 'history/createBrowserHistory'
import { ConnectedRouter } from 'react-router-redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import reducers from './reducers'
import './index.css';
import App from './App';

const history = createHistory()

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(thunk, logger))
)



ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
     <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);
