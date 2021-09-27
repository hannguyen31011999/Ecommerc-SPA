import React from 'react';
import { useHistory, Link } from 'react-router-dom';
import HeaderComponent from '../../components/Admin/HeaderComponent';
import SidebarComponent from '../../components/Admin/SidebarComponent';
import { Breadcrumb } from 'antd';
import withLayout from '../../hoc/withLayouts';

const capitalizeFirstLetter = string => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function AdminTemplate(props) {
    const history = useHistory();
    const length = history.location.pathname.split('/').length;
    const breadcrumb = history.location.pathname.split('/')[length - 1];
    return (
        <div className="wrapper" >
            <SidebarComponent {...props} />
            <div className="content">
                <div className="main__content">
                    <HeaderComponent {...props} />
                    <div className="bread-crumb">
                        <Breadcrumb>
                            <Breadcrumb.Item><Link to="/admin/dashboard">Dashboard</Link></Breadcrumb.Item>
                            <Breadcrumb.Item>
                                {
                                    breadcrumb === 'dashboard' ?
                                        '' : capitalizeFirstLetter(breadcrumb)
                                }
                            </Breadcrumb.Item>
                        </Breadcrumb>
                    </div>
                    {props.children}
                </div>
            </div>
        </div >
    )
}

export default withLayout(AdminTemplate);