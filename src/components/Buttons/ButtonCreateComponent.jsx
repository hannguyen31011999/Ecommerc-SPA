import React from 'react'
import { Button } from 'antd';

export default function ButtonCreateComponent(props) {
    return (
        <>
            <Button type="primary" >{`Create ${props.title}`}</Button>
        </>
    )
}
