import React, { useState, useRef } from 'react'
import {
    Form,
    Button,
    Modal,
    Steps,
    Upload
} from 'antd';
import { FolderAddOutlined, PlusOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux'
import * as trans from '../../modules/Actions';
import { init } from '../../../../../utils/getImage';
import { Editor } from '@tinymce/tinymce-react';
import { steps } from './Input';
const { Step } = Steps;


let styled = {
    marginBottom: "12px",
}

export default function ModalCreate(props) {
    let [visiable, setVisiable] = useState(false);
    let disabled = useSelector(state => state.ProductReducer.disabled);
    let data = useSelector(state => state.ProductReducer.relationship);
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const [current, setCurrent] = useState(0);
    let file = useRef({});
    let description = useRef('');
    let editorRef = useRef();
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
        if (image.fileList.length > 0) {
            formData = { ...formData, image: file.current, product_desc: description.current };
            let formCreate = new FormData();
            for (const key in formData) {
                formCreate.append(key, formData[key]);
            }
            dispatch(trans.createProductAction(formCreate, form, file, description, [image, setImage], setCurrent));
        } else {
            setErrors({ ...errors, image: 'Image is empty!' });
        }
    }
    const handleEditor = (values) => {
        if (values) {
            description.current = values;
            if (errors.content) setErrors({ ...errors, content: '' });
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
            <div className="col-12 col-sm-6 col-xl-9 d-flex justify-content-end">
                <Button type="primary" title="Create" onClick={() => { setVisiable(true); }} icon={<FolderAddOutlined />} size="default" />
            </div>
            <Modal
                title="Create"
                centered
                visible={visiable}
                onOk={form.submit}
                onCancel={() => {
                    setVisiable(false);
                    form.resetFields();
                    setImage({ ...image, fileList: [] });
                    setErrors({ image: '' });
                    setCurrent(0);
                    description.current = '';
                }}
                okText={<span>Create</span>}
                width={600}
                okButtonProps={{ disabled: disabled }}
                getContainer={false}
            >
                <Steps current={current}>
                    {steps.map(item => (
                        <Step key={item.title} title={item.title} />
                    ))}
                </Steps>
                <Form form={form} name="control-ref"
                    onFinish={handleSubmit}
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }} >
                    <div className="steps-content" style={{ margin: "20px 0px" }}>
                        {
                            current === 0 && current < 3 ?
                                <>
                                    {steps[current]?.content(data?.categories, data?.discount)}
                                    < Editor
                                        onInit={(evt, editor) => editorRef.current = editor}
                                        onEditorChange={handleEditor}
                                        apiKey="evhje833ytxlbsyda8yt3n6tqick01tx42fpkdao7qw3u5gt"
                                        init={init}
                                        initialValue={description.current ? description.current : ''}
                                    />
                                </>
                                : steps[current]?.content(data?.categories, data?.discount)
                        }
                        {
                            current > 2 ?
                                <>
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
                                ''
                        }
                    </div>
                </Form>
                <div className="steps-action">
                    {current < steps.length - 1 && (
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