import { combineReducers, createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
// Admin
import InfoReducer from './Reducers/Admin/InfoReducer';
import TransportReducer from './Reducers/Admin/TransportReducer';

const rootReducer = combineReducers({
    // admin
    InfoReducer,
    TransportReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

export default store;