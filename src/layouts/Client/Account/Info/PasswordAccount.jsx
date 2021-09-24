import React, { useState } from 'react'
import * as yup from 'yup';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { apiPurchase } from '../../../../services/clientApi';
import { alertErrors, alertSuccess } from '../../../../settings/config';

const styled = {
    color: "#f73232",
    fontSize: "13px",
    display: "block",
    width: "100%",
    transform: "translateX(23%)",
    marginTop: "5px"
}

const schema = yup.object().shape({
    current_password: yup.string().min(6, 'Minimum 6 character').max(254, 'Maximum 254 character').required('Current password is required'),
    new_password: yup.string().min(6, 'Minimum 6 character').max(254, 'Maximum 254 character').required('New password is required'),
    confirm_password: yup.string().oneOf([yup.ref('new_password'), null], 'Confirm password must match')
});

export default function PasswordAccount(props) {
    const { register, handleSubmit, formState: { errors }, setError } = useForm({
        mode: 'onChange',
        resolver: yupResolver(schema),
    });
    return (
        <div className="row purchase__password">
            <div className="purchase__title">
                <h4>Change Password</h4>
                <p>For account security, please do not share your password with others</p>
            </div>
            <div className="col-lg-3 col-12"></div>
            <div className="col-lg-6 col-12">
                <form className="purchase__form">
                    <div className="purchase__group">
                        <label htmlFor="current-password" name="current_password" className="form-label">
                            Current Password
                        </label>
                        <input type="password" {...register('current_password')} name="current_password" className="form-control" />
                    </div>
                    <div className="purchase__group">
                        <label htmlFor="new-password" className="form-label">
                            New Password
                        </label>
                        <input type="password" {...register('new_password')} name="new_password" className="form-control" />
                    </div>
                    <div className="purchase__group">
                        <label htmlFor="comfirm-password" className="form-label">
                            Confirm Password
                        </label>
                        <input type="password" {...register('comfirm_password')} name="comfirm_password" className="form-control" />
                    </div>
                    <button type="submit" className="purchase__btn">Submit</button>
                </form>
            </div>
            <div className="col-lg-3 col-12"></div>
        </div>
    )
}
