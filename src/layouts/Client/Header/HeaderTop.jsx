import React from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { apiLogin } from '../../../services/clientApi'
import { ACCESS_TOKEN, INFO, TIMESTAMP, TOTAL_CART } from '../../../settings/configUrl'
import * as action from '../../../redux/Actions/User/CartActions';
import { logoutAuthAction } from '../../../redux/Actions/Admin/authActions';
export default function HeaderTop(props) {
    const history = useHistory();
    const dispatch = useDispatch();
    const handleLogout = async (e) => {
        e.preventDefault();
        try {
            const res = apiLogin.logout();
            localStorage.removeItem(INFO);
            localStorage.removeItem(ACCESS_TOKEN);
            localStorage.removeItem(TOTAL_CART);
            localStorage.removeItem(TIMESTAMP);
            dispatch(action.fetchSuccessAct([]));
            dispatch(logoutAuthAction(false));
            history.push('/login');
        } catch (e) {

        }
    }
    const redirectPage = (e, slug) => {
        e.preventDefault();
        history.push(slug);
    }
    return (
        <div className="header__topbar">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-8">
                    </div>
                    <div className="col-lg-4 col-12 d-flex justify-content-end align-items-center ">
                        <div className="header__topbar--right d-flex align-items-center">
                            <div className="header__topbar--user">
                                {
                                    localStorage.getItem(INFO) &&
                                    <a href="">
                                        <i className="lni lni-user" />{JSON.parse(localStorage.getItem(INFO)).name}
                                    </a>
                                }
                                <ul className="topbar__user">
                                    <li>
                                        <NavLink to="/account/profile">Account</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/purchase">Purchase Order</NavLink>
                                    </li>
                                    <li>
                                        <a href="*" onClick={(e) => handleLogout(e)}>Logout</a>
                                    </li>
                                </ul>
                            </div>
                            {
                                localStorage.getItem(INFO) ?
                                    '' :
                                    <ul className="header__topbar--login">
                                        <li><NavLink to="/login">Sign In</NavLink></li>
                                        <li><NavLink to="/register">Resgister</NavLink></li>
                                    </ul>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
