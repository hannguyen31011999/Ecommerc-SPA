import React, { useState, useEffect, useRef } from 'react'
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
import { editSteps } from './Input';
const { Step } = Steps;

export default function ModalEdit() {
    let visiable = useSelector(state => state.ProductReducer.modal);
    let disabled = useSelector(state => state.ProductReducer.disabled);
    let dataEdit = useSelector(state => state.ProductReducer.dataEdit);
    let data = useSelector(state => state.ProductReducer.relationship);
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const [current, setCurrent] = useState(0);
    let description = useRef('');
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
        let dataUpdate = form.getFieldsValue(true);
        const formData = new FormData();
        for (const key in dataUpdate) {
            formData.append(key, dataUpdate[key]);
        }
        dispatch(trans.updateProductAction(dataEdit.id, formData, form, [current, setCurrent]));
    }
    const handleEditor = (values) => {
        if (values) {
            description.current = values;
            if (errors.content) setErrors({ ...errors, content: '' });
        }
    }
    const setFieldProduct = () => {
        if (dataEdit?.categories_id) {
            form.setFieldsValue({
                categories_id: dataEdit.categories_id,
                discount_id: dataEdit.discount_id,
                product_name: dataEdit.product_name,
                screen: dataEdit?.product_options[0].screen,
                screen_resolution: dataEdit?.product_options[0].screen_resolution,
                operating_system: dataEdit?.product_options[0].operating_system,
                cpu: dataEdit?.product_options[0].cpu,
                gpu: dataEdit?.product_options[0].gpu,
                ram: dataEdit?.product_options[0].ram,
                camera: dataEdit?.product_options[0].camera,
                pin: dataEdit?.product_options[0].pin
            });
        }
    }
    return (
        <>
            {setFieldProduct()}
            <Modal
                title="Edit"
                centered
                visible={visiable}
                onOk={form.submit}
                onCancel={() => {
                    dispatch(trans.modalAct(false));
                }}
                okText={<span>Update</span>}
                width={775}
                okButtonProps={{ disabled: disabled }}
                getContainer={false}
            >
                <Steps current={current}>
                    {editSteps.map(item => (
                        <Step key={item.title} title={item.title} />
                    ))}
                </Steps>
                <Form form={form} name="control-ref"
                    onFinish={handleSubmit}
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }} >
                    <div className="steps-content" style={{ margin: "20px 0px" }}>
                        {
                            current < 1 ?
                                <>
                                    {
                                        editSteps[current].content(data?.categories, data?.discount)
                                    }
                                    < Editor
                                        onEditorChange={handleEditor}
                                        initialValue={dataEdit?.product_desc}
                                        apiKey="evhje833ytxlbsyda8yt3n6tqick01tx42fpkdao7qw3u5gt"
                                        init={init}
                                    />
                                </>


                                :
                                editSteps[current].content(data?.categories, data?.discount)
                        }
                    </div>
                </Form>
                <div className="steps-action">
                    {current < editSteps.length - 1 && (
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
