import createSagaMiddleware from 'redux-saga';
import {all} from 'redux-saga/effects';
import {createStore, applyMiddleware, combineReducers, compose} from 'redux';
import {routerMiddleware} from 'react-router-redux';

export default (reducers, sagasArray, history) => {
  function* sagas () {
    yield all (sagasArray);
  }

  const historyMiddleware = routerMiddleware (history);
  const sagaMiddleware = createSagaMiddleware ();
  const middleware = [historyMiddleware, sagaMiddleware];

  // eslint-disable-next-line no-underscore-dangle
  const devToolsCompose = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;

  const composeEnhancers = devToolsCompose || compose;
  const appliedMiddleware = composeEnhancers (applyMiddleware (...middleware));
  const rootReducer = combineReducers (reducers);

  const store = createStore (rootReducer, {}, appliedMiddleware);
  sagaMiddleware.run (sagas);
  return store;
};
