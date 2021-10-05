import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Space, Spin } from 'antd';
import { ACCESS_TOKEN, INFO, STORAGE } from '../../../../settings/configUrl';
import InfiniteScroll from "react-infinite-scroll-component";
import * as action from '../Modules/Actions';
import ComfirmComponent from './ComfirmComponent';
import DeliveringComponent from './DeliveringComponent';
import DeliveredComponent from './DeliveredComponent';
import CancelComponent from './CancelComponent';
import { alertSuccess } from '../../../../settings/config';
import * as service from '../../../../services/purchase';


export default function PurchaseComponent(props) {
    const loading = useSelector(state => state.PurchaseReducer.loading);
    const data = useSelector(state => state.PurchaseReducer.total.data);
    const currentPage = useSelector(state => state.PurchaseReducer.total.currentPage);
    const lastPage = useSelector(state => state.PurchaseReducer.total.lastPage);
    const [current, setCurrent] = useState(false);
    const history = useHistory();
    const location = useLocation();
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem(INFO));
    const token = localStorage.getItem(ACCESS_TOKEN);
    const query = location.search.split("?type=");
    const path = location.pathname;
    useEffect(() => {
        alertSuccess(location.state);
        if (query.length < 2 && data.length < 1 && token) {
            dispatch(action.fetchAllPurchaseAction(user.id));
        }
    }, []);
    useEffect(() => {
        if (query[1] > 0 && query[1] === "5" && data.length < 1 && !current) {
            setCurrent(true);
            dispatch(action.fetchAllPurchaseAction(user.id));
        }
    }, [query]);
    const redirectPurchaseByType = (type) => {
        type === 0 ? history.push(`/purchase`) : history.push(`/purchase?type=${type}`);
    }
    const scrollPurchase = () => {
        if (currentPage < lastPage) {
            dispatch(action.paginationAllPurchaseAction(user.id, currentPage + 1));
        }
    }
    return (
        <>
            <div className={loading ? "loading" : "loading active-loading"}>
                <Space size="middle">
                    <Spin size="large" />
                </Space>
            </div>
            <ul className="nav nav-tabs align-items-center" id="myTab" role="tablist">
                <li className={query[1] === "5" || (path === "/purchase" && query.length === 1) ? "nav-item active-purchase" : "nav-item"} role="presentation">
                    <button onClick={() => redirectPurchaseByType(5)} className={query[1] === "5" || (path === "/purchase" && query.length === 1) ? "nav-link active" : "nav-link"} type="button">Total</button>
                </li>
                <li className={query[1] === "1" ? "nav-item active-purchase" : "nav-item"} role="presentation">
                    <button onClick={() => redirectPurchaseByType(1)} className={query[1] === "1" ? "nav-link active" : "nav-link"} type="button">
                        Comfirmation
                    </button>
                </li>
                <li className={query[1] === "2" ? "nav-item active-purchase" : "nav-item"} role="presentation">
                    <button onClick={() => redirectPurchaseByType(2)} className={query[1] === "2" ? "nav-link active" : "nav-link"} type="button">Delivering</button>
                </li>
                <li className={query[1] === "3" ? "nav-item active-purchase" : "nav-item"} role="presentation">
                    <button onClick={() => redirectPurchaseByType(3)} className={query[1] === "3" ? "nav-link active" : "nav-link"} type="button">Delivered</button>
                </li>
                <li className={query[1] === "4" ? "nav-item active-purchase" : "nav-item"} role="presentation">
                    <button onClick={() => redirectPurchaseByType(4)} className={query[1] === "4" ? "nav-link active" : "nav-link"} type="button" role="tab">Cancelled</button>
                </li>
            </ul>
            <div className="purchase__seach">
                <input type="text" className="form-control" placeholder="Search by code bill....." />
            </div>
            <div className="tab-content" id="myTabContent">
                <div className={query[1] === "5" || (path === "/purchase" && query.length === 1) ? "tab-pane active" : "tab-pane"} id="total" role="tabpanel" aria-labelledby="total-tab">
                    <InfiniteScroll
                        dataLength={data.length}
                        next={scrollPurchase}
                        hasMore={true}
                    >
                        {data.length > 0 ? service.renderPurchase(data) : <div className="purchase__empty">
                            <figure>
                                <img src={process.env.PUBLIC_URL + "/img/order.png"} alt="*" />
                            </figure>
                            <h4 className="purchase__empty--title">No orders yet</h4>
                        </div>}
                    </InfiniteScroll>
                </div>
                <div className={query[1] === "1" ? "tab-pane active" : "tab-pane"}>
                    <ComfirmComponent />
                </div>
                <div className={query[1] === "2" ? "tab-pane active" : "tab-pane"}>
                    <DeliveringComponent />
                </div>
                <div className={query[1] === "3" ? "tab-pane active" : "tab-pane"}>
                    <DeliveredComponent />
                </div>
                <div className={query[1] === "4" ? "tab-pane active" : "tab-pane"}>
                    <CancelComponent />
                </div>
            </div>
        </>
    )
}
