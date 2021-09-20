import React, { useState, useCallback } from 'react'
import axios from 'axios';
import BreadCrumb from '../Breadcrumb/BreadCrumb';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import TransportComponent from './TransportComponent';
import PaymentComponent from './PaymentComponent';
import CustomerComponent from './CustomerComponent';
import CouponComponent from './CouponComponent';
import { alertErrors, TOKEN_GHN, get_service_id, get_price_ship, SHOP_ID, DISTRICT_ID_FROM } from '../../../settings/config';
import { apiTransport } from '../../../utils/callApi';

export default function MainCheckout() {
    const [data, setData] = useState({
        price_ship: 0
    });
    const cart = useSelector(state => state.CartReducer.cart);
    const dispatch = useDispatch();
    const history = useHistory();
    const getTransport = useCallback((values, select) => getPriceShipping(values, select), []);
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
        return calculatorSubTotalPrice() - calculatorTotalDiscount() + data.price_ship;
    }
    const getPriceShipping = (values, select) => {
        const distance = {
            shop_id: SHOP_ID,
            from_district: DISTRICT_ID_FROM,
            to_district: select.district_id
        }
        apiTransport(get_service_id, 'post', distance).then(res => {
            const service = res.data.data[0];
            const data = {
                service_id: service.service_id,
                insurance_value: calculatorSubTotalPrice() - calculatorTotalDiscount(),
                to_ward_code: parseInt(values),
                to_district_id: select.district_id,
                from_district_id: DISTRICT_ID_FROM,
                weight: 225,
                length: 16,
                width: 8,
                height: 1
            }
            apiTransport(get_price_ship, 'post', data).then(res => {
                setData({ ...data, price_ship: Math.ceil((res.data.data.total / 22771)) });
            }).catch(e => {
                if (e.response) {
                    alertErrors('Sorry, Server errors please try again!');
                }
            })
        }).catch(e => {
            if (e.response) {
                alertErrors('Sorry, Server errors please try again!');
            }
        })
    }
    return (
        <>
            <BreadCrumb />
            <section className="checkout">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 checkout__left">
                            <form action="*" className="checkout__form">
                                <CustomerComponent />
                                <TransportComponent getTransport={getTransport} />
                                <PaymentComponent />
                            </form>
                        </div>
                        <div className="col-lg-4 checkout__right">
                            <CouponComponent />
                            <div className="checkout__total">
                                <h4 className="checkout__total--title">
                                    Pricing Table
                                </h4>
                                <div className="checkout__subtotal--price">
                                    <div className="checkout__subtotal--item sub-total">
                                        Subotal Price: <span>${cart.length > 0 ? calculatorSubTotalPrice() : 0}</span>
                                    </div>
                                    <div className="checkout__subtotal--item shipping-total">
                                        Price Shipping: <span>${data.price_ship}</span>
                                    </div>
                                    <div className="checkout__subtotal--item discount-total">
                                        Total Promotion: <span>${cart.length > 0 ? calculatorTotalDiscount() : 0}</span>
                                    </div>
                                    <div className="checkout__subtotal--item total-price">
                                        Total Price: <span>${cart.length > 0 ? calculatorTotalPrice() : 0}</span>
                                    </div>
                                </div>
                                <div className="checkout__total--btn">
                                    <button>Checkout</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
