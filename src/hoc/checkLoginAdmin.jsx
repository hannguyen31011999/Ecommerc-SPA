import React from 'react'
import { Redirect } from 'react-router-dom';
import HeaderComponent from '../components/Admin/HeaderComponent';
import SidebarComponent from '../components/Admin/SidebarComponent';
import apiAdmin from '../services/adminApi';
import { ACCESS_TOKEN, TIMESTAMP, HEADER_BEARER } from '../settings/configUrl';
import { useHistory } from 'react-router-dom';
import { handleCompareTime, handleExpired, handleRefreshToken } from '../utils/expired';

const checkLoginAdmin = (WrapperComponent) => (props) => {
    const history = useHistory();
    if (localStorage.getItem(ACCESS_TOKEN) !== null) {
        if (handleCompareTime()) handleRefreshToken(history, props, true);
        return (
            <div className="wrapper">
                <SidebarComponent {...props} />
                <div className="content">
                    <div className="main__content">
                        <HeaderComponent {...props} />
                        <div className="bread-crumb">
                        </div>
                        <WrapperComponent {...props}></WrapperComponent>
                    </div>
                </div>
            </div>
        )
    }
    return <Redirect to="/admin" />
}

export default checkLoginAdmin;