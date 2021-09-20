import React, { useState, useCallback } from 'react'
import BreadCrumb from '../Breadcrumb/BreadCrumb';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import TransportComponent from './TransportComponent';
import PaymentComponent from './PaymentComponent';
import CustomerComponent from './CustomerComponent';
import CouponComponent from './CouponComponent';
import { alertErrors, get_service_id, get_price_ship, SHOP_ID, DISTRICT_ID_FROM } from '../../../settings/config';
import { apiTransport } from '../../../utils/callApi';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup';

const schema = yup.object().shape({
    firstName: yup.string().max(50, 'Maximum 50 character').required('First name is required'),
    lastName: yup.string().max(50, 'Maximum 50 character').required('Last name is required'),
    email: yup.string().max(100, 'Maximum 100 character').email('Email must be a valid email').required('Email is required'),
    address: yup.string().max(254, 'Maximum 254 character').required('Address is required'),
    phone: yup.string().required('Number phone is required').matches(new RegExp(/(0)[0-9]{9}/), 'Number phone start 0 and maximum 10 number')
});
const fields = Object.keys(schema.fields).reduce((obj, field) => {
    return { ...obj, [field]: field };
}, {});


export default function MainCheckout(props) {
    const dispatch = useDispatch();
    const history = useHistory();
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        mode: 'onChange',
        resolver: yupResolver(schema),
    });
    const [data, setData] = useState({
        price_ship: 0,
        payment: null,
        paymentOption: "",
        required: ""
    });
    const cart = useSelector(state => state.CartReducer.cart);
    const getTransport = useCallback((values, select) => getPriceShipping(values, select), [data]);
    const getPaymentMethod = useCallback((payment, option) => getPayment(payment, option), []);
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
                setData({
                    ...data,
                    price_ship: Math.ceil((res.data.data.total / 22771) * 3),
                    required: ""
                });
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
    const getPayment = (payment, option) => {
        console.log(payment, option);
        setData({ ...data, payment, paymentOption: option });
    }
    const handleSubmitCheckout = (values) => {
        if (data.price_ship > 0) {

        } else {
            setData({ ...data, required: "Ward is required" });
        }
    }
    return (
        <>
            <BreadCrumb />
            <section className="checkout">
                <div className="container">
                    <form onSubmit={handleSubmit(handleSubmitCheckout)}
                        action="*" className="checkout__form">
                        <div className="row">
                            <div className="col-lg-8">
                                <div className="checkout__left">
                                    <CustomerComponent
                                        errors={errors}
                                        register={register}
                                        fields={fields} />
                                    <TransportComponent
                                        getTransport={getTransport}
                                        errors={errors}
                                        register={register}
                                        fields={fields}
                                        required={data.required} />
                                    <PaymentComponent getPaymentMethod={getPaymentMethod} />
                                </div>
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
                                        <button type="submit">Checkout</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </section>
        </>
    )
}
