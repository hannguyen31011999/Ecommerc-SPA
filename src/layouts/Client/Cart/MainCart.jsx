import React from 'react'
import { NavLink, useHistory } from 'react-router-dom';
import BreadCrumb from '../Breadcrumb/BreadCrumb';
import { useSelector, useDispatch } from 'react-redux';
import { STORAGE } from '../../../settings/configUrl';
import * as actions from '../../../redux/Actions/User/CartActions';
import { Popconfirm } from 'antd';

export default function MainCart() {
    const cart = useSelector(state => state.CartReducer.cart);
    const dispatch = useDispatch();
    const history = useHistory();
    const redirectSku = (e, slug) => {
        e.preventDefault();
        history.push(`/detail/${slug}`);
    }
    const updateCart = (cart, isBool) => {
        if (isBool) {
            dispatch(actions.updateCartAction(cart.id, { qty: 1 }));
        } else {
            if (cart.qty > 1) {
                dispatch(actions.updateCartAction(cart.id, { qty: -1 }));
            }
        }
    }
    const handleChangeQuantity = async (e, cart) => {
        if (e.target.value) {
            await dispatch(actions.updateCartAction(cart.id, { qty: e.target.value }));
            e.target.value = cart.qty;
        }
    }
    const renderCart = () => {
        return cart?.map(cart => {
            return (
                <div className="cart__item" key={cart.id}>
                    <div className="row align-items-center">
                        <div className="col-lg-1 col-md-1 product__image">
                            <a href="*">
                                <img src={`${STORAGE}/products/${cart.image}`} alt="*" />
                            </a>
                        </div>
                        <div className="col-lg-4 col-md-3 cart__product">
                            <div className="product__text">
                                <h3 className="product__name">
                                    <a href="*" onClick={(e) => redirectSku(e, cart.slug)}>{cart.name}</a>
                                </h3>
                                <div className="product__desc">
                                    <p className="product__memory">
                                        Price: <span>${
                                            cart.promotion_price > 0 ? cart.promotion_price : cart.unit_price
                                        }
                                        </span>
                                    </p>
                                    <p className="product__color">
                                        Color: <span>{cart.color}</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-2 col-md-2 cart__quantity">
                            <div className="quantity__content">
                                <button className="quantity__btn desrease"
                                    onClick={() => updateCart(cart, false)}>-</button>
                                <input type="text"
                                    className="quantity__value"
                                    defaultValue={cart.qty}
                                    onBlur={(e) => handleChangeQuantity(e, cart)}
                                    key={cart.qty} min="1" max="10" />
                                <button className="quantity__btn insrease" onClick={() => updateCart(cart, true)}>+</button>
                            </div>
                        </div>
                        <div className="col-lg-2 col-md-2 cart__subtotal">
                            <p>${cart.promotion_price ? cart.promotion_price : cart.unit_price}</p>
                        </div>
                        <div className="col-lg-2 col-md-2 cart__discount">
                            <p>{cart.discount > 0 ? `$${cart.discount}` : '-'}</p>
                        </div>
                        <div className="col-lg-1 col-md-2 cart__action">
                            <Popconfirm
                                placement="bottomRight"
                                title="You want to delete?"
                                onConfirm={() => { dispatch(actions.deleteCartAction(cart.id)) }}
                                okText="Yes"
                                cancelText="No"
                            >
                                <a href="*" title="Delete">
                                    <i className="lni lni-close" />
                                </a>
                            </Popconfirm>
                        </div>
                    </div>
                </div>
            )
        })
    }
    const calculatorSubTotalPrice = () => {
        return cart?.reduce((total, cart) => {
            return total += (cart.promotion_price ? cart.promotion_price : cart.unit_price) * cart.qty;
        }, 0);
    }
    const calculatorTotalDiscount = () => {
        return cart?.reduce((total, cart) => {
            return total += cart.discount ? cart.discount * cart.qty : 0;
        }, 0);
    }
    const calculatorTotalPrice = () => {
        return calculatorSubTotalPrice() - calculatorTotalDiscount();
    }
    return (
        <>
            <BreadCrumb />
            <section className="shopping_cart">
                <div className="container">
                    <div className="cart__content">
                        <div className="cart__head">
                            <div className="cart__title">
                                <div className="row">
                                    <div className="col-lg-1 col-md-1 col-12" />
                                    <div className="col-lg-4 col-md-3 col-12">
                                        <p>Product Name</p>
                                    </div>
                                    <div className="col-lg-2 col-md-2 col-12">
                                        <p>Quantity</p>
                                    </div>
                                    <div className="col-lg-2 col-md-2 col-12">
                                        <p>Subtotal</p>
                                    </div>
                                    <div className="col-lg-2 col-md-2 col-12">
                                        <p>Discount</p>
                                    </div>
                                    <div className="col-lg-1 col-md-2 col-12">
                                        <p>Action</p>
                                    </div>
                                </div>
                            </div>
                            <div className="cart__list">
                                {cart.length > 0 ? renderCart() :
                                    <div className="cart__item">
                                        <p className="cart__empty">Cart Empty</p>
                                    </div>}
                            </div>
                        </div>
                        <div className="cart__bot">
                            <div className="row">
                                <div className="col-lg-8 col-md-6 col-12">
                                    <div className="cart__coupon">
                                        <form action="*">
                                            <input type="text" className="form-control" placeholder="Enter Your Coupon" />
                                            <div className="coupon__btn">
                                                <button>Apply Coupon</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-6 col-12">
                                    <div className="total__amount">
                                        <ul>
                                            <li>Cart Subtotal <span>${cart.length > 0 ? calculatorSubTotalPrice() : 0}</span></li>
                                            <li>You Save <span>${cart.length > 0 ? calculatorTotalDiscount() : 0}</span></li>
                                            <li>You Pay <span>${cart.length > 0 ? calculatorTotalPrice() : 0}</span></li>
                                        </ul>
                                        <div className="total__amount--btn">
                                            {
                                                cart.length > 0 ? <NavLink to="/checkout" className="total__checkout">Checkout</NavLink> :
                                                    <NavLink to="/login" className="total__checkout">Checkout</NavLink>
                                            }
                                            <NavLink to="/" className="total__continue">Continue shopping</NavLink>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
