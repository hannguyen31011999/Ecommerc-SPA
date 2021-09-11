import * as constants from '../../Contants/User/CartConstants';

export const addCartAct = payload => ({
    type: constants.addCart,
    payload
});

export const updateCartAct = payload => ({
    type: constants.updateCart,
    payload
});

export const deleteCartAct = payload => ({
    type: constants.deleteCart,
    payload
});