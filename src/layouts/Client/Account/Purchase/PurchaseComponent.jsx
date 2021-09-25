import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Space, Spin } from 'antd';
import { INFO, STORAGE } from '../../../../settings/configUrl';
import { returnStatus } from '../../../../utils/helper';
import * as action from '../Modules/Actions';
import ComfirmComponent from './ComfirmComponent';
import DeliveringComponent from './DeliveringComponent';
import DeliveredComponent from './DeliveredComponent';


export default function PurchaseComponent(props) {
    const loading = useSelector(state => state.PurchaseReducer.loading);
    const data = useSelector(state => state.PurchaseReducer.total.data);
    const [visiable, setVisiable] = useState(0);
    const history = useHistory();
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem(INFO));
    const query = history.location.search.split("?type=");
    useEffect(() => {
        if (query.length < 2 && data.length < 1) {
            dispatch(action.fetchAllPurchaseAction(user.id));
        }
    }, []);
    const redirectPurchaseByType = (type) => {
        setVisiable(type);
        type === 0 ? history.push(`/purchase`) : history.push(`/purchase?type=${type}`);
    }
    const renderPurchase = (order) => {
        return order?.map(item => {
            return (
                <div className="purchase__order" key={item.id}>
                    <div className="purchase__status">
                        <p>{returnStatus(item.order_status)}</p>
                    </div>
                    <div className="purchase__list">
                        {
                            item.order_details?.map(ord => {
                                const sku = ord.product_skus;
                                return (
                                    <div className="purchase__item" key={ord.id}>
                                        <div className="purchase__image">
                                            <a href="*"><img src={`${STORAGE}/products/${sku.sku_image}`} alt="*" /></a>
                                        </div>
                                        <div className="purchase__product">
                                            <h4 className="product__name">
                                                <a href="*">{ord.product_name}</a>
                                            </h4>
                                            <h5 className="product__sku">Color: {sku.color}</h5>
                                            <p className="product__qty">x{ord.qty}</p>
                                        </div>
                                        <div className="purchase__price">
                                            <p>${ord.qty * ord.product_price}</p>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    {
                        item.order_status == 1 ?
                            <div className="purchase__action">
                                <button className="product__btn">Cancel</button>
                            </div> : ''
                    }
                </div>
            )
        });
    }
    return (
        <>
            <div className={loading ? "loading" : "loading active-loading"}>
                <Space size="middle">
                    <Spin size="large" />
                </Space>
            </div>
            <ul className="nav nav-tabs align-items-center" id="myTab" role="tablist">
                <li className={visiable === 0 ? "nav-item active-purchase" : "nav-item"} role="presentation">
                    <button onClick={() => redirectPurchaseByType(0)} className="nav-link active" id="total-tab" data-bs-toggle="tab" data-bs-target="#total" type="button" role="tab" aria-controls="total" aria-selected="true">Total</button>
                </li>
                <li className={visiable === 1 ? "nav-item active-purchase" : "nav-item"} role="presentation">
                    <button onClick={() => redirectPurchaseByType(1)} className="nav-link" id="wait-tab" data-bs-toggle="tab" data-bs-target="#wait" type="button" role="tab" aria-controls="wait" aria-selected="false">
                        Comfirmation
                    </button>
                </li>
                <li className={visiable === 2 ? "nav-item active-purchase" : "nav-item"} role="presentation">
                    <button onClick={() => redirectPurchaseByType(2)} className="nav-link" id="delivering-tab" data-bs-toggle="tab" data-bs-target="#delivering" type="button" role="tab" aria-controls="delivering" aria-selected="false">Delivering</button>
                </li>
                <li className={visiable === 3 ? "nav-item active-purchase" : "nav-item"} role="presentation">
                    <button onClick={() => redirectPurchaseByType(3)} className="nav-link" id="delivered-tab" data-bs-toggle="tab" data-bs-target="#delivered" type="button" role="tab" aria-controls="delivered" aria-selected="false">Delivered</button>
                </li>
                <li className={visiable === 4 ? "nav-item active-purchase" : "nav-item"} role="presentation">
                    <button onClick={() => redirectPurchaseByType(4)} className="nav-link" id="cancel-tab" data-bs-toggle="tab" data-bs-target="#cancel" type="button" role="tab" aria-controls="cancel" aria-selected="false">Cancelled</button>
                </li>
            </ul>
            <div className="purchase__seach">
                <input type="text" className="form-control" placeholder="Search by ID or Product name....." />
            </div>
            <div className="tab-content" id="myTabContent">
                <div className="tab-pane fade show active" id="total" role="tabpanel" aria-labelledby="total-tab">
                    {data.length > 0 ? renderPurchase(data) : ''}
                </div>
                <div className="tab-pane fade" id="wait" role="tabpanel" aria-labelledby="wait-tab">
                    <ComfirmComponent />
                </div>
                <div className="tab-pane fade" id="delivering" role="tabpanel" aria-labelledby="delivering-tab">
                    <DeliveringComponent />
                </div>
                <div className="tab-pane fade" id="delivered" role="tabpanel" aria-labelledby="delivered-tab">
                    <DeliveredComponent />
                </div>
                <div className="tab-pane fade" id="cancel" role="tabpanel" aria-labelledby="cancel-tab">
                    <div className="purchase__empty">
                        <figure>
                            <img src={process.env.PUBLIC_URL + "/img/order.png"} alt="*" />
                        </figure>
                        <h4 className="purchase__empty--title">No orders yet</h4>
                    </div>
                </div>
            </div>
        </>
    )
}
