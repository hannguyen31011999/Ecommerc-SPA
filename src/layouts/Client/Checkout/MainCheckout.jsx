import React, { useState, useCallback, useRef, useEffect } from 'react'
import BreadCrumb from '../Breadcrumb/BreadCrumb';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import TransportComponent from './TransportComponent';
import PaymentComponent from './PaymentComponent';
import CustomerComponent from './CustomerComponent';
import CouponComponent from './CouponComponent';
import { alertErrors, get_service_id, get_price_ship, SHOP_ID, DISTRICT_ID_FROM, alertSuccess } from '../../../settings/config';
import { apiCheckout, apiTransport, callApi } from '../../../utils/callApi';
import * as actions from '../../../redux/Actions/User/CartActions';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup';
import { ACCESS_TOKEN, CART_LIST, INFO, ORDER, TOTAL_CART } from '../../../settings/configUrl';
import { Space, Spin } from 'antd';

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
    const user = JSON.parse(localStorage.getItem(INFO));
    const token = localStorage.getItem(ACCESS_TOKEN);
    const cart = useSelector(state => state.CartReducer.cart);
    const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm({
        mode: 'onChange',
        resolver: yupResolver(schema),
    });
    const [data, setData] = useState({
        price_ship: 0,
        required: "",
        address: ""
    });
    const [loading, setLoading] = useState(false);
    const paymentData = useRef({
        payment: 1,
        paymentOption: "direct",
    });
    useEffect(() => {
        const query = history.location.search;
        if (query.split('&').length > 2 && query) {
            const paymentId = query.split('&')[0].split('=')[1];
            const token = query.split('&')[1].split('=')[1];
            const payerId = query.split('&')[2].split('=')[1];
            const order_id = localStorage.getItem(ORDER);
            const user_id = user.id;
            const cart = JSON.parse(localStorage.getItem(CART_LIST));
            const obj = { paymentId, payerId, order_id, user_id };
            const formData = new FormData();
            for (const key in obj) {
                formData.append(key, obj[key]);
            }
            formData.append('cart[]', cart);
            setLoading(true);
            apiCheckout(`api/checkout/paypal/execute`, 'post', formData).then(res => {
                if (res.data.state === "approved" && res.data.status === "VERIFIED" && res.data.status_code == 200) {
                    localStorage.setItem(TOTAL_CART, 0);
                    localStorage.removeItem(ORDER);
                    localStorage.removeItem(CART_LIST);
                    dispatch(actions.fetchSuccessAct([]));
                    setLoading(false);
                    alertSuccess(res.data.message);
                }
            }).catch(e => {
                if (e.response) {
                    alertErrors('Sorry, Server errors please try again!');
                    setLoading(false);
                }
            });
        } else if (query.split('?').length > 1 && cart.length > 0) {
            const order_id = localStorage.getItem(ORDER);
            apiCheckout(`api/checkout/delete/${order_id}`)
                .then(res => {
                    if (res.data.status_code == 200) {
                        localStorage.removeItem(ORDER);
                        localStorage.removeItem(CART_LIST);
                        alertErrors(res.data.message);
                    }
                }).catch(e => {
                    alertErrors('Sorry, Server errors please try again!');
                    setLoading(false);
                });
        }
    }, [history.location.search]);
    useEffect(() => {
        if (user) {
            const name = user.name.split(" ");
            setValue('firstName', name[0]);
            setValue('lastName', name[name.length - 1]);
            setValue('email', user.email);
            setValue('phone', user.phone);
        }
    }, []);
    const getTransport = useCallback((values, select) => getPriceShipping(values, select), []);
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
        const ward = values.split('-');
        const distance = {
            shop_id: SHOP_ID,
            from_district: DISTRICT_ID_FROM,
            to_district: parseInt(select.district_id)
        }
        apiTransport(get_service_id, 'post', distance).then(res => {
            const service = res.data.data[0];
            const data = {
                service_id: service.service_id,
                insurance_value: calculatorSubTotalPrice() - calculatorTotalDiscount(),
                to_ward_code: parseInt(ward[0]),
                to_district_id: distance.to_district,
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
                    required: "",
                    address: `${ward[1]} ${select.district_name} ${select.province_name}`
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
        paymentData.current = {
            payment,
            paymentOption: option
        }
    }
    const handleSubmitCheckout = async (values) => {
        if (data.price_ship > 0) {
            if (user && token && cart.length > 0) {
                const temp = cart.map(item => {
                    return item.id;
                });
                const obj = {
                    user_id: user.id,
                    firstName: values.firstName,
                    lastName: values.lastName,
                    email: values.email,
                    phone: values.phone,
                    address: `${values.address} ${data.address}`,
                    paymentOption: paymentData.current.paymentOption,
                    payment: paymentData.current.payment,
                    totalPrice: calculatorTotalPrice(),
                    transport_price: data.price_ship
                }
                const formData = new FormData();
                for (const key in obj) {
                    formData.append(key, obj[key]);
                }
                formData.append('cart[]', temp);
                localStorage.setItem(CART_LIST, JSON.stringify(temp));
                setLoading(true);
                if (obj.payment == 2) {
                    callApi('api/checkout/paypal/create', 'post', formData).then(res => {
                        localStorage.setItem(ORDER, res.data.order_id);
                        window.location.replace(res.data.redirect);
                    }).catch(e => {
                        if (e.response) {
                            alertErrors('Sorry, Server errors please try again!');
                            setLoading(false);
                        }
                    });
                } else {
                    setLoading(true);
                    callApi('api/checkout/create', 'post', formData).then(res => {
                        localStorage.setItem(TOTAL_CART, 0);
                        dispatch(actions.fetchSuccessAct([]));
                        setLoading(false);
                        alertSuccess(res.data.message);
                    }).catch(e => {
                        if (e.response) {
                            alertErrors('Sorry, Server errors please try again!');
                            setLoading(false);
                        }
                    });
                }
            } else {
                history.push('/login');
            }
        } else {
            setData({ ...data, required: "Ward is required" });
        }
    }
    return (
        <>
            <div className={loading ? "loading" : "loading active-loading"}>
                <Space size="middle">
                    <Spin size="large" />
                </Space>
            </div>
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
