import { combineReducers, createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
// Admin
import InfoReducer from './Reducers/Admin/InfoReducer';
import CategoriesReducer from '../layouts/Admin/Categories/modules/CategoriesReducer';
import PostReducer from '../layouts/Admin/Post/modules/PostReducer';
import DiscountReducer from '../layouts/Admin/Discount/modules/DiscountReducer';
import UserReducer from '../layouts/Admin/User/modules/UserReducer';
import ProductReducer from '../layouts/Admin/Product/modules/ProductReducer';
import ProductVariantReducer from '../layouts/Admin/ProductVariant/modules/ProductVariantReducer';
import InventoryReducer from '../layouts/Admin/Inventory/modules/InventoryReducer';

const rootReducer = combineReducers({
    // admin
    InfoReducer,
    CategoriesReducer,
    PostReducer,
    DiscountReducer,
    UserReducer,
    ProductReducer,
    ProductVariantReducer,
    InventoryReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

export default store;