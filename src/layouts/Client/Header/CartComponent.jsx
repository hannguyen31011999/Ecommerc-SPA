import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { STORAGE, TOTAL_CART } from '../../../settings/configUrl';
import * as action from '../../../redux/Actions/User/CartActions';
import publicIp from 'public-ip';
import { Popconfirm, message } from 'antd';

export default function CartComponent(props) {
    const cart = useSelector(state => state.CartReducer.cart);
    const dispatch = useDispatch();
    const getIp = async () => {
        const ip = await publicIp.v4();
        return ip;
    }
    useEffect(() => {
        dispatch(action.fetchCartAction(getIp()));
    }, []);
    const removeCartItem = (id) => {
        dispatch(action.deleteCartAction(id));
    }
    const renderCart = () => {
        return cart?.map(cart => {
            return (
                <li key={cart.id}>
                    <div className="header__cart--image">
                        <NavLink to={cart.slug}>
                            <img src={`${STORAGE}/products/${cart.image}`} alt="*" />
                        </NavLink>
                    </div>
                    <div className="header__cart--content">
                        <h4>
                            <NavLink to={cart.slug}>{cart.name}</NavLink>
                        </h4>
                        <p>
                            <span className="header__cart--quantity">{cart.qty}x</span>
                            <span className="header__cart--amount">
                                ${cart.promotion_price ? cart.promotion_price : cart.unit_price}
                            </span>

                        </p>
                        <div className="header__cart--color">
                            <span>Color:{cart.color}</span>
                        </div>
                        {
                            cart.discount > 0 ?
                                <div className="header__cart--gift">
                                    <span>Voucher {cart.discount}$</span>
                                </div>
                                : ''
                        }
                    </div>
                    <div className="header__cart--action">
                        <Popconfirm placement="bottomRight" title="remove" onConfirm={() => {
                            removeCartItem(cart.id)
                        }} okText="Yes" cancelText="No">
                            <a href="" title="Remove">
                                <i className="lni lni-close" />
                            </a>
                        </Popconfirm>

                    </div>
                </li>
            )
        })
    }
    const renderSubTotal = () => {
        <div className="header__cart--footer">
            <div className="header__cart--total">
                <span>Total</span>
                <span className="header__cart--totalAmount">$198.00</span>
            </div>
            <div className="header__cart--btn">
                <button className="btn btn-primary">Checkout</button>
            </div>
        </div>
    }
    return (
        <div className="col-lg-4 col-md-2 col-6 header__middle--right d-flex">
            <div className="header__middle--hotline d-lg-flex justify-content-end">
                <i className="lni lni-phone" />
                <h3>Hotline:<br />
                    <span>(+100) 123 456 7890</span>
                </h3>
            </div>
            <div className="header__middle--cart d-flex justify-content-end">
                <div className="header__middle--item">
                    <a href="#" className="header__middle--navlink">
                        <i className="lni lni-heart" />
                        <span className="header__middle--total">0</span>
                    </a>
                </div>
                <div className="header__middle--item">
                    <a href="#" className="header__middle--navlink">
                        <i className="lni lni-cart" />
                        <span className="header__middle--total">{cart.length > 0 ? cart.length : localStorage.getItem(TOTAL_CART) ? localStorage.getItem(TOTAL_CART) : 0}</span>
                    </a>
                    <div className="header__middle--shopping">
                        <div className="header__cart--header">
                            <span>{cart.length > 0 ? cart.length : 0} Items</span>
                            <a href="">View Cart</a>
                        </div>
                        <div className="header__cart--list">
                            <ul>
                                {cart.length > 0 ? renderCart() : <h5 className="text-center empty">Cart empty</h5>}
                            </ul>
                        </div>
                        {cart.length > 0 ? renderSubTotal() : ''}
                    </div>
                </div>
            </div>
        </div>
    )
}
