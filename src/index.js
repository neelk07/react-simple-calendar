import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, compose, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

import App from './components/App';
import {reducer} from './reducer';

const store = createStore(
	reducer,
	compose(
		applyMiddleware(
      thunkMiddleware
		),
		window.devToolsExtension ? window.devToolsExtension() : f => f
	),
);

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>
  , document.querySelector('.container'));
