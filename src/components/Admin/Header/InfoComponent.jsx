import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom';
import NotificationComponent from './NotificationComponent';
import { useSelector, useDispatch } from 'react-redux'
import { apiAdmin } from '../../../services/adminApi';
import * as infoAction from '../../../redux/Actions/Admin/infoAction';
import { useHistory } from 'react-router-dom';
import { ACCESS_TOKEN, TIMESTAMP } from '../../../settings/configUrl';
import { memo } from 'react';

function InfoComponent(props) {
    const history = useHistory();
    const dispatch = useDispatch();
    let user = useSelector(state => state.InfoReducer.user);
    useEffect(() => {
        if (!Object.keys(user).length > 0) {
            dispatch(infoAction.responseApi());
        }
    }, [dispatch]);
    const handleLogout = async (e) => {
        e.preventDefault();
        await apiAdmin.fetchApiLogout().then(res => {
            if (res.data.status_code === 200) {
                localStorage.removeItem(ACCESS_TOKEN);
                localStorage.removeItem(TIMESTAMP);
                history.push('/admin');
            }
        }).catch(e => {
            console.log(e);
        })
    }
    return (
        <>
            <ul className="navbar-nav flex-row justify-content-end align-items-center">
                <li className="nav-item d-block d-md-none">
                    <NavLink to="" className="nav-link content__icon--right">
                        <i className="fa fa-search" />
                    </NavLink>
                </li>
                <li className="nav-item dropdown">
                    <NavLink className="nav-link" to="" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <span className="d-none d-sm-inline-block">{user.email}</span>
                        <img src="../img/man.png" alt="*" height={25} width={25} />
                    </NavLink>
                    <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                        <li>
                            <a className="dropdown-item" href="*">
                                <i className="fa fa-user" />
                                Account
                            </a>
                        </li>
                        <li>
                            <a className="dropdown-item" href="*">
                                <i className="fa fa-cog" />
                                Setting
                            </a>
                        </li>
                        <li onClick={handleLogout}>
                            <a className="dropdown-item" href="">
                                <i className="fa fa-outdent" />
                                Logout
                            </a>
                        </li>
                    </ul>
                </li>
                <li className="nav-item">
                    <NavLink to="" className="nav-link content__icon--right">
                        <i className="fa fa-bell" />
                        <span className="notification">12</span>
                    </NavLink>
                </li>
                <NotificationComponent />
            </ul>
        </>
    )
}

export default memo(InfoComponent);