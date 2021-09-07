import React, { useState, useEffect, useRef } from 'react'
import {
    Form,
    Button,
    Modal,
    Steps,
    Upload
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux'
import * as trans from '../../modules/Actions';
import { createVariant } from '../Product/Input';
const { Step } = Steps;
let styled = {
    marginBottom: "12px",
}

export default function ModalCreateVariant() {
    let visiable = useSelector(state => state.ProductReducer.modalVariant);
    let disabled = useSelector(state => state.ProductReducer.disabled);
    let product_id = useSelector(state => state.ProductReducer?.product_id);
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const [current, setCurrent] = useState(0);
    let file = useRef({});
    let [image, setImage] = useState({
        previewVisible: false,
        previewImage: '',
        previewTitle: '',
        fileList: [
        ]
    });
    let [errors, setErrors] = useState({
        image: ''
    });
    const next = () => {
        setCurrent(current + 1);
    };
    const prev = () => {
        setCurrent(current - 1);
    };
    const handleSubmit = (values) => {
        let formData = form.getFieldsValue(true);
        let formCreate = new FormData();
        if (image.fileList.length > 0 && file.current) {
            formData = { ...formData, image: file.current };
            for (const key in formData) {
                formCreate.append(key, formData[key]);
            }
            dispatch(trans.createVariantAction(product_id, formCreate, form, file, [image, setImage]));
        } else {
            setErrors({ ...errors, image: 'Image is empty!' });
        }
    }
    const handleCancel = () => setImage({ ...image, previewVisible: false });

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
    const handleChange = ({ fileList }) => {
        setErrors({ ...errors, image: '' });
        setImage({ fileList });
    };
    return (
        <>
            <Modal
                title="Create Variant"
                centered
                visible={visiable}
                onOk={form.submit}
                onCancel={() => {
                    form.resetFields();
                    setImage({ ...image, fileList: [] });
                    setErrors({ image: '' });
                    setCurrent(0);
                    dispatch(trans.modalVariantAct({ id: product_id, isBool: false }))
                }}
                okText={<span>Create</span>}
                width={600}
                okButtonProps={{ disabled: disabled }}
                getContainer={false}
            >
                <Steps current={current}>
                    {createVariant.map(item => (
                        <Step key={item.title} title={item.title} />
                    ))}
                </Steps>
                <Form form={form} name="control-ref"
                    onFinish={handleSubmit}
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }} >
                    <div className="steps-content" style={{ margin: "20px 0px" }}>
                        {
                            current > 0 ?
                                <>
                                    {createVariant[current]?.content()}
                                    <label htmlFor="" style={styled}><span style={{ color: "red" }}>*</span>&nbsp;Image</label>
                                    <Upload
                                        listType="picture-card"
                                        fileList={image?.fileList}
                                        onPreview={onPreview}
                                        onChange={handleChange}
                                        maxCount={1}
                                        accept="image/png, image/jpeg,image/jpg"
                                        beforeUpload={image => {
                                            file.current = image;
                                        }}
                                        key={current}
                                    >
                                        <div>
                                            <PlusOutlined />
                                            <div style={{ marginTop: 8 }}>Upload</div>
                                        </div>
                                    </Upload>
                                    <span style={{ color: "red", display: "block", marginBottom: "12px" }}>{errors ? errors.image : ''}</span>
                                </> :
                                createVariant[current]?.content()
                        }
                    </div>
                </Form>
                <div className="steps-action">
                    {current < createVariant.length - 1 && (
                        <Button type="primary" onClick={() => next()}>
                            Next
                        </Button>
                    )}
                    {current > 0 && (
                        <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
                            Previous
                        </Button>
                    )}
                </div>
            </Modal>
        </>
    )
}
