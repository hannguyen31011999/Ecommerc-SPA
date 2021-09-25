import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import { Space, Spin } from 'antd';
import { INFO, STORAGE } from '../../../../settings/configUrl';
import { returnStatus } from '../../../../utils/helper';
import { useSelector, useDispatch } from 'react-redux';
import * as action from '../Modules/Actions';
import InfiniteScroll from 'react-infinite-scroll-component';

export default function DeliveredComponent() {
    const [current, setCurrent] = useState(false);
    const loading = useSelector(state => state.PurchaseReducer.loading);
    const data = useSelector(state => state.PurchaseReducer.delivered.data);
    const currentPage = useSelector(state => state.PurchaseReducer.delivered.currentPage);
    const lastPage = useSelector(state => state.PurchaseReducer.delivered.lastPage);
    const history = useHistory();
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem(INFO));
    const query = history.location.search.split("?type=");
    useEffect(() => {
        if (query[1] > 0 && query[1] === "3" && data.length < 1 && !current) {
            setCurrent(true);
            dispatch(action.fetchPurchaseForStatusAction(user.id, query[1]));
        }
    }, [query]);
    const renderPurchase = (order) => {
        return order?.map(item => {
            return (
                <div className="purchase__order" key={item.id}>
                    <div className="purchase__status">
                        <p>Code:{item.id}</p>
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
    const scrollPurchase = () => {
        if (currentPage < lastPage) {
            dispatch(action.paginationPurchaseStatusAction(user.id, query[1], currentPage + 1));
        }
    }
    return (
        <>
            <div className={loading ? "loading" : "loading active-loading"}>
                <Space size="middle">
                    <Spin size="large" />
                </Space>
            </div>
            <InfiniteScroll
                dataLength={data.length}
                next={scrollPurchase}
                hasMore={true}
            >
                {data.length > 0 ? renderPurchase(data) :
                    <div className="purchase__empty">
                        <figure>
                            <img src={process.env.PUBLIC_URL + "/img/order.png"} alt="*" />
                        </figure>
                        <h4 className="purchase__empty--title">No orders yet</h4>
                    </div>
                }
            </InfiniteScroll>
        </>
    )
}
