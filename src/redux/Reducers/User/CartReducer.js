import { CART } from '../../../settings/configUrl';
import * as constants from '../../Contants/User/CartConstants';

const initialState = {
    cart: []
}

const CartReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case constants.addCart: {
            const cart = [...state.cart];
            const index = cart.findIndex(item => item.id === payload.id);
            if (index === -1) {
                cart.push(payload);
            } else {
                cart[index].qty++;
            }
            return { ...state, cart }
        }
        default:
            return state
    }
}

export default CartReducer
