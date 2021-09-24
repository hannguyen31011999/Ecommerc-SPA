import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import BreadCrumb from '../Breadcrumb/BreadCrumb'
import { NavLink, useHistory } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup';
import { Space, Spin } from 'antd';
import { apiLogin } from '../../../services/clientApi';
import { handleExpired } from '../../../utils/expired';
import { INFO } from '../../../settings/configUrl';
import { authUserAction } from '../../../redux/Actions/Admin/authActions';

const schema = yup.object().shape({
    email: yup.string().max(100).email().required(),
    password: yup.string().min(6).max(254).required()
});

export default function LoginComponent(props) {
    const [loading, setLoading] = useState(false);
    const [messageError, setMessageError] = useState('');
    const history = useHistory();
    const dispatch = useDispatch();
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        mode: 'onChange',
        resolver: yupResolver(schema),
    });
    const onSubmitHandler = async (data) => {
        setLoading(true);
        const formData = new FormData();
        for (const key in data) {
            formData.append(key, data[key]);
        }
        const res = await apiLogin.login(formData);
        if (res.data.status_code === 200) {
            let timestamp = new Date(res.data.timestamp.time);
            let miliseconds = timestamp.getTime();
            handleExpired(res.data.timestamp.expired, miliseconds, res.data.token);
            localStorage.setItem(INFO, JSON.stringify(res.data.user));
            dispatch(authUserAction(true));
            history.push('/');
        } else {
            setMessageError(res.data.message);
            setLoading(false);
        }
    };
    return (
        <>
            <div className={loading ? "loading" : "loading active-loading"}>
                <Space size="middle">
                    <Spin size="large" />
                </Space>
            </div>
            <BreadCrumb />
            <section className="login">
                <div className="container">
                    <div className="login__content">
                        <div className="login__title">
                            <h2>Login Now</h2>
                            <p>You can login using your social media account or email address.</p>
                        </div>
                        <div className="login__social row">
                            <div className="col-md-4 login__item">
                                <a href="https://gridshop-demo.000webhostapp.com/api/redirect/facebook" className="login__facebook">
                                    <i className="lni lni-facebook-filled" />
                                    Facebook login
                                </a>
                            </div>
                            <div className="col-md-4 login__item">
                                <a href="" className="login__twitter">
                                    <i className="lni lni-twitter-original" />
                                    Twitter login
                                </a>
                            </div>
                            <div className="col-md-4 login__item">
                                <a href="" className="login__google">
                                    <i className="lni lni-google" />
                                    Google login
                                </a>
                            </div>
                        </div>
                        <div className="login__option">
                            <span>Or</span>
                        </div>
                        <form onSubmit={handleSubmit(onSubmitHandler)} className="login__form">
                            <div className="login__group">
                                <label htmlFor="email" className="col-form-label">Email</label>
                                <input type="email" {...register("email")} name="email" className="form-control" />
                                {errors.email &&
                                    <span className="login__error">{errors.email.message}</span>
                                }
                            </div>
                            <div className="login__group">
                                <label htmlFor="password" className="col-form-label">Password</label>
                                <input type="password" {...register("password")} name="password" className="form-control" />
                                {errors.password &&
                                    <span className="login__error">{errors.password.message}</span>
                                }
                                {
                                    messageError && <span className="login__error">{messageError}</span>
                                }
                            </div>
                            <div className="login__remember">
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" defaultValue />
                                    <label className="form-check-label">
                                        Remember me
                                    </label>
                                </div>
                                <a href="">Forgot password?</a>
                            </div>
                            <div className="login__btn">
                                <button>Login</button>
                            </div>
                            <div className="login__outer">
                                <p>Don't have an account? <NavLink to="/register">Register here </NavLink></p>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </>
    )
}
