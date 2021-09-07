import React from 'react'
import { Result, Button } from 'antd';
import { useHistory } from 'react-router-dom';

export default function PageErrors(props) {
    const history = useHistory();
    return (
        <>
            <Result
                status="404"
                title="404"
                subTitle="Xin lỗi, trang bạn đã truy cập không tồn tại."
                extra={
                    <Button type="primary" onClick={() => { history.push('/') }}>Quay về trang chủ</Button>
                }
            />
        </>
    )
}
