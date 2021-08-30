import { combineReducers, createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
// Admin
import InfoReducer from './Reducers/Admin/InfoReducer';
import CategoriesReducer from '../layouts/Admin/Categories/modules/CategoriesReducer';
import PostReducer from '../layouts/Admin/Post/modules/PostReducer';
import DiscountReducer from '../layouts/Admin/Discount/modules/DiscountReducer';
import UserReducer from '../layouts/Admin/User/modules/UserReducer';

const rootReducer = combineReducers({
    // admin
    InfoReducer,
    CategoriesReducer,
    PostReducer,
    DiscountReducer,
    UserReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

export default store;