import React from 'react'
import ScrollToTop from '../../components/Client/Buttons/ScrollToTop';
import { useSelector } from 'react-redux'
import withLayout from '../../hoc/withLayouts';
import MainHeader from './Header/MainHeader';
import MainFooter from './Footer/MainFooter';
import { Spin, Space } from 'antd';
function ClientTemplate(props) {
    const loading = useSelector(state => state.HomeReducer.loading);
    return (
        <>
            <MainHeader />
            {props.children}
            <MainFooter />
            <div className={loading ? "loading" : "loading active-loading"}>
                <Space size="middle">
                    <Spin size="large" />
                </Space>
            </div>
            <ScrollToTop />
        </>
    )
}

export default withLayout(ClientTemplate);