import React, { useState, memo } from 'react'
import {
    Form,
    Input,
    Select,
    Modal
} from 'antd';
import { useDispatch, useSelector } from 'react-redux'
import * as trans from '../../../redux/Actions/Admin/transpAction';
import { apiWard } from '../../../services/adminApi';
import { STATUS_SUCCESS } from '../../../settings/config';
const { Option } = Select;

function ModalEditComponent(props) {
    let disabled = useSelector(state => state.TransportReducer.loading);
    let parentData = useSelector(state => state.TransportReducer.parentData);
    let errMessage = useSelector(state => state.TransportReducer.errors);
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    console.log(parentData);
    let styled = {
        marginBottom: "12px",
    }
    const handleSubmit = async (values) => {
        delete values.province_id;
        dispatch(trans.createWardAction(values, form));
    }
    return (
        <>
            <Modal
                title="Create"
                centered
                visible={false}
                onOk={form.submit}
                onCancel={() => { dispatch(trans.modalEditAct(false)); form.resetFields(); }}
                okText={<span>Edit</span>}
                width={500}
                okButtonProps={{ disabled: disabled }}
            >
                <Form form={form} name="control-ref"
                    onFinish={handleSubmit}
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }} >
                    <Form.Item
                        name="province_id"
                        label="Province"
                        rules={[
                            {
                                required: true,
                                message: "District is not required!"
                            },
                        ]}
                        style={styled}
                    >
                        <Select
                            placeholder="Select a option province"
                            allowClear
                        >
                            {/* {province?.map(item => {
                                return (
                                    <Option value={item.id} key={item.id}>{item.province_name}</Option>
                                )
                            })} */}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="district_id"
                        label="District"
                        rules={[
                            {
                                required: true,
                                message: "District is not required!"
                            },
                        ]}
                        style={styled}
                    >
                        <Select
                            placeholder="Select a option district"
                            allowClear
                        >
                            {/* {
                                district?.map(district => {
                                    return (
                                        <Option value={district.id} key={district.id}>
                                            {district.district_name}
                                        </Option>
                                    )
                                })
                            } */}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="ward_name"
                        label="Ward name"
                        style={styled}
                        rules={[
                            {
                                required: true,
                                message: "Ward name is not required!"
                            },
                            {
                                max: 254,
                                message: "Maximum 254 character!"
                            }
                        ]}>
                        <Input placeholder="Example tan phu ward" />
                    </Form.Item>
                    {
                        Object.keys(errMessage).length > 0 ?
                            <span style={{ color: "red", paddingLeft: "10px" }}>{errMessage.ward_name}</span> :
                            ''
                    }
                    <Form.Item
                        name="transport_price"
                        label="Transport price"
                        style={styled}
                        rules={[
                            {
                                required: true,
                                message: "Transport price is not required!"
                            },
                            {
                                max: 10,
                                message: "Maximum 10 number!"
                            }
                        ]}>
                        <Input type="number" placeholder="Example $2000" />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}

export default memo(ModalEditComponent);