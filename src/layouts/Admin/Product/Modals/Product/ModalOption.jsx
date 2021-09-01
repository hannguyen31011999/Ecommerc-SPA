import React, { memo } from 'react'
import {
    Modal
} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import * as trans from '../../modules/Actions';

export default function ModalOption() {
    let data = useSelector(state => state.ProductReducer?.dataEdit);
    let modalContent = useSelector(state => state.ProductReducer?.modalOption);
    let option = data?.product_options ? data?.product_options[0] : {};
    const dispatch = useDispatch();
    return (
        <>
            {
                modalContent ?
                    <Modal
                        title="Option"
                        centered
                        visible={modalContent}
                        onCancel={() => { dispatch(trans.modalAct(false)) }}
                        width={600}
                    >
                        <table class="table table-success table-striped">
                            <tbody>
                                <tr>
                                    <td>Screen</td>
                                    <td>{option.screen}</td>
                                </tr>
                                <tr>
                                    <td>Screen Resolution</td>
                                    <td>{option.screen_resolution}</td>
                                </tr>
                                <tr>
                                    <td>Operating System</td>
                                    <td>{option.operating_system}</td>
                                </tr>
                                <tr>
                                    <td>Cpu</td>
                                    <td>{option.cpu}</td>
                                </tr>
                                <tr>
                                    <td>Gpu</td>
                                    <td>{option.gpu}</td>
                                </tr>
                                <tr>
                                    <td>Ram</td>
                                    <td>{option.ram}</td>
                                </tr>
                                <tr>
                                    <td>Camera</td>
                                    <td>{option.camera}</td>
                                </tr>
                                <tr>
                                    <td>Pin</td>
                                    <td>{option.pin}</td>
                                </tr>
                            </tbody>
                        </table>
                    </Modal>
                    : ''
            }
        </>
    )
}
