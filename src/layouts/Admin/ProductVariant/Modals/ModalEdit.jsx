import React, { useState, useRef } from 'react'
import {
    Form,
    Input,
    Button,
    Modal,
    Upload
} from 'antd';
import { FolderAddOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from "react-router-dom";
import * as trans from '../modules/Actions';
import { STORAGE } from '../../../../settings/configUrl';

let styled = {
    marginBottom: "12px",
}

export default function ModalEdit() {
    let visiable = useSelector(state => state.ProductVariantReducer.modal);
    let disabled = useSelector(state => state.ProductVariantReducer.disabled);
    let data = useSelector(state => state.ProductVariantReducer.dataEdit);
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const [fileList, setFileList] = useState([
    ]);
    let [errors, setErrors] = useState({
        image: ''
    });
    let file = useRef({});
    const onChange = ({ fileList: newFileList }) => {
        setFileList(newFileList);
    };
    const onPreview = async file => {
        let src = file.url;
        if (!src) {
            src = await new Promise(resolve => {
                const reader = new FileReader();
                reader.readAsDataURL(file.originFileObj);
                reader.onload = () => resolve(reader.result);
            });
        }
        const image = new Image();
        image.src = src;
        const imgWindow = window.open(src);
        imgWindow.document.write(image.outerHTML);
    };
    const handleSubmit = (values) => {
        let dataEdit = {};
        let formData = new FormData();
        if (fileList.length > 0 && file.current) {
            dataEdit = { ...values, image: file.current }
        } else {
            dataEdit = { ...values }
        }
        for (const key in dataEdit) {
            formData.append(key, dataEdit[key]);
        }
        dispatch(trans.updateSkuAction(data.id, formData, form));
    }
    const setFieldData = () => {
        if (data) {
            form.setFieldsValue({
                sku_unit_price: data.sku_unit_price,
                sku_promotion_price: data.sku_promotion_price,
                color: data.color
            })
        }
    }
    return (
        <>
            {data ? setFieldData() : ''}
            <Modal
                title="Edit"
                centered
                visible={visiable}
                onOk={form.submit}
                onCancel={() => {
                    dispatch(trans.modalAct(false));
                    setFileList([]);
                }}
                okText={<span>Update</span>}
                width={500}
                okButtonProps={{ disabled: disabled }}
                getContainer={false}
            >
                <Form form={form} name="control-ref"
                    onFinish={handleSubmit}
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }} >
                    <Form.Item
                        name="color"
                        label="Color"
                        style={styled}
                        rules={[
                            {
                                required: true,
                                message: "Color is empty!"
                            },
                            {
                                max: 50,
                                message: "Maximum 50 character!"
                            }
                        ]}>
                        <Input placeholder="Example graphite " />
                    </Form.Item>
                    <label htmlFor="" style={styled}><span style={{ color: "red" }}>*</span>&nbsp;Image</label>
                    <Upload
                        listType="picture-card"
                        fileList={fileList.length > 0 ? fileList : [{
                            url: `${STORAGE}/products/${data?.sku_image}`
                        }]}
                        onChange={onChange}
                        onPreview={onPreview}
                        maxCount={1}
                        beforeUpload={img => {
                            file.current = img;
                        }}
                    >
                        {'Upload File'}
                    </Upload>
                    <span style={{ color: "red", display: "block", marginBottom: "12px" }}>{errors ? errors.image : ''}</span>
                </Form>
            </Modal>
        </>
    )
}
