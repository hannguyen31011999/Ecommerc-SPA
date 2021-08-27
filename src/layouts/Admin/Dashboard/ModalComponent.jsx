import React, { useState, memo, useEffect } from 'react'
import {
    Form,
    Input,
    Button,
    Select,
    Modal
} from 'antd';
import { FolderAddOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux'
import * as trans from '../../../redux/Actions/Admin/transpAction';
import { apiWard } from '../../../services/adminApi';
import { STATUS_SUCCESS } from '../../../settings/config';
const { Option } = Select;

function ModalComponent(props) {
    let [visiable, setVisiable] = useState(false);
    let disabled = useSelector(state => state.TransportReducer.loading);
    let [district, setDistrict] = useState([]);
    let errMessage = useSelector(state => state.TransportReducer.errors);
    let province = useSelector(state => state.TransportReducer.province);
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    let styled = {
        marginBottom: "12px",
    }
    useEffect(() => {
        dispatch(trans.fetchProvinceAction());
    }, [dispatch]);
    console.log(province);
    const changeProvince = async (values) => {
        try {
            const res = await apiWard.fetchApiDistrict(values);
            if (res.data.status_code === STATUS_SUCCESS) {
                setDistrict(res.data.data);
            }
        } catch (err) {
            alert(err.message);
        }
    }
    const handleSubmit = async (values) => {
        delete values.province_id;
        dispatch(trans.createWardAction(values, form));
    }
    return (
        <>
            <div className="col-12 col-sm-6 col-xl-9 d-flex justify-content-end">
                <Button type="primary" onClick={() => setVisiable(true)} icon={<FolderAddOutlined />} size="default" />
            </div>
            <Modal
                title="Create"
                centered
                visible={visiable}
                onOk={form.submit}
                onCancel={() => { setVisiable(false); form.resetFields() }}
                okText={<span>Create</span>}
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
                            allowClear onChange={changeProvince}
                        >
                            {province?.map(item => {
                                return (
                                    <Option value={item.id} key={item.id}>{item.province_name}</Option>
                                )
                            })}
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
                            {
                                district?.map(district => {
                                    return (
                                        <Option value={district.id} key={district.id}>
                                            {district.district_name}
                                        </Option>
                                    )
                                })
                            }
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
export default memo(ModalComponent);