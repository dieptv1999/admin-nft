import {createStore, compose, applyMiddleware} from "redux";
import createSagaMiddleware from 'redux-saga';
import allReducers from './redux/reducers';
import rootSaga from './redux/sagas/root_saga';

const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const store = createStore(
    allReducers,
    composeEnhancers(applyMiddleware(sagaMiddleware)),
);
sagaMiddleware.run(rootSaga);

export default store;