import React, { useEffect } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import ProductImage from './ProductImage'
import ProductInfo from './ProductInfo'
import ProductRating from './ProductRating'
import ProductReview from './ProductReview'
import ProductSku from './ProductSku'
import * as actions from './Modules/Actions';

export default function ProductDetail(props) {
    const dispatch = useDispatch();
    const path = useParams();
    useEffect(() => {
        dispatch(actions.fetchProductAction(path.slug));
    }, []);
    return (
        <>
            <section className="breadcrumb">
                <div className="container">
                    <div className="breadcrumb__content">
                        <ul className="breadcrumb__list">
                            <li className="breadcrumb__item">
                                <NavLink className="breadcrumb__navlink" to="/">
                                    <i className="lni lni-home" />
                                    Home
                                </NavLink>
                            </li>
                            <li className="breadcrumb__item">
                                Product Detail
                            </li>
                        </ul>
                    </div>
                </div>
            </section>
            <section className="product__detail">
                <div className="container">
                    <div className="product__top">
                        <div className="product__top--content row">
                            <ProductImage />
                            <ProductSku />
                        </div>
                    </div>
                    <ProductInfo />
                    <div className="product__bot">
                        <div className="row">
                            <ProductRating />
                            <ProductReview />
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
