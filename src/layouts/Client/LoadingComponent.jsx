import React from 'react';
import { useSelector } from 'react-redux';
import { Spin, Space } from 'antd';
export default function LoadingComponent() {
    const loading = useSelector(state => state.HomeReducer.loading);
    const loadingCart = useSelector(state => state.CartReducer.loading);
    return (
        <>
            <div className={loading ? "loading" : "loading active-loading"}>
                <Space size="middle">
                    <Spin size="large" />
                </Space>
            </div>
            <div className={loadingCart ? "loading" : "loading active-loading"}>
                <Space size="middle">
                    <Spin size="large" />
                </Space>
            </div>
        </>
    )
}
