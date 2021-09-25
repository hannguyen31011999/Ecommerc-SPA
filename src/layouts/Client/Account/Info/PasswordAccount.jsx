import React, { useState } from 'react'
import * as yup from 'yup';
import { useForm } from "react-hook-form";
import { INFO } from '../../../../settings/configUrl';
import { yupResolver } from "@hookform/resolvers/yup";
import { apiPurchase } from '../../../../services/clientApi';
import { alertErrors, alertSuccess } from '../../../../settings/config';
import { Space, Spin } from 'antd';

const styled = {
    color: "#f73232",
    fontSize: "13px",
    display: "block",
    width: "100%",
    // transform: "translateX(23%)",
    // marginTop: "5px"
}

const schema = yup.object().shape({
    current_password: yup.string().required('Current password is required').min(6, 'Minimum 6 character').max(254, 'Maximum 254 character'),
    new_password: yup.string().required('New password is required').min(6, 'Minimum 6 character').max(254, 'Maximum 254 character'),
    same_password: yup.string().oneOf([yup.ref('new_password'), null], 'Confirm password must match')
});

export default function PasswordAccount(props) {
    const { register, handleSubmit, formState: { errors }, reset, setError } = useForm({
        mode: 'onChange',
        resolver: yupResolver(schema),
    });
    const [loading, setLoading] = useState(false);
    const user = JSON.parse(localStorage.getItem(INFO));
    const submitChangePassword = async (values) => {
        try {
            const formData = new FormData();
            for (const key in values) {
                formData.append(key, values[key]);
            }
            setLoading(true);
            const res = await apiPurchase.changePassword(user.id, formData);
            console.log(res.data);
            if (res.data.status_code == 200) {
                setLoading(false);
                reset();
                alertSuccess("Change password success");
            } else {
                setLoading(false);
                if (res.data.message) {
                    setError("current_password", {
                        type: "manual",
                        message: res.data.message
                    });
                } else {
                    console.log(Object.entries(res.data.data));
                    for (const [key, value] of Object.entries(res.data.data)) {
                        setError(key, {
                            type: "manual",
                            message: value[0]
                        });
                    }
                }
            }
        } catch (e) {
            if (e.response) {
                setLoading(false);
                alertErrors('Sorry, Please try again!');
            }
        }
    }
    return (
        <>
            <div className={loading ? "loading" : "loading active-loading"}>
                <Space size="middle">
                    <Spin size="large" />
                </Space>
            </div>
            <div className="row purchase__password">
                <div className="purchase__title">
                    <h4>Change Password</h4>
                    <p>For account security, please do not share your password with others</p>
                </div>
                <div className="col-lg-3 col-12"></div>
                <div className="col-lg-6 col-12">
                    <form className="purchase__form" onSubmit={handleSubmit(submitChangePassword)}>
                        <div className="purchase__group">
                            <label htmlFor="current-password" name="current_password" className="form-label">
                                Current Password
                            </label>
                            <input type="password" {...register('current_password')} name="current_password" className="form-control" />
                            {errors.current_password && <span style={styled}>{errors.current_password.message}</span>}
                        </div>
                        <div className="purchase__group">
                            <label htmlFor="new-password" className="form-label">
                                New Password
                            </label>
                            <input type="password" {...register('new_password')} name="new_password" className="form-control" />
                            {errors.new_password && <span style={styled}>{errors.new_password.message}</span>}
                        </div>
                        <div className="purchase__group">
                            <label htmlFor="comfirm-password" className="form-label">
                                Confirm Password
                            </label>
                            <input type="password" {...register('same_password')} name="same_password" className="form-control" />
                            {errors.same_password && <span style={styled}>{errors.same_password.message}</span>}
                        </div>
                        <button type="submit" className="purchase__btn">Submit</button>
                    </form>
                </div>
                <div className="col-lg-3 col-12"></div>
            </div>
        </>
    )
}
