import React from 'react';
import ReactDOM from 'react-dom';
import './scss/main.scss';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import {routerMiddleware} from 'connected-react-router';
import {createHashHistory} from 'history';
import createSagaMiddleware from 'redux-saga';
import {composeWithDevTools} from 'redux-devtools-extension'
import Router from './router';
import reducers from './redux/reducers';
import sagas from './redux/sagas';
import * as serviceWorker from './serviceWorker';
import App from './containers/app';

// create store with middlewares
const history = createHashHistory();
const sagaMiddleware = createSagaMiddleware();
const routeMiddleware = routerMiddleware(history);
const middlewares = [sagaMiddleware, routeMiddleware];
const store = createStore(reducers(history), composeWithDevTools(applyMiddleware(...middlewares)));
sagaMiddleware.run(sagas)

ReactDOM.render(
  <Provider store={store}>
      <App>
        <Router history={history} />
      </App>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
