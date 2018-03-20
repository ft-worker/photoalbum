import React from 'react';
import ReactDOM from 'react-dom'
import App from './App';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import reducer from './reducers';
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import 'babel-polyfill'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const loggerMiddleware = createLogger();
const store = createStore(
    reducer,
    composeEnhancers(
        applyMiddleware(
            thunkMiddleware,
            loggerMiddleware
        )
    )
);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, document.getElementById('root'));
