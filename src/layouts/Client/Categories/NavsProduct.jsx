import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { STORAGE } from '../../../settings/configUrl';
import * as actions from '../Products/Modules/Actions';

export default function NavsProduct() {
    const product = useSelector(state => state.ProductClientReducer.product);
    const discountProduct = useSelector(state => state.ProductClientReducer.discount);
    const dispatch = useDispatch();
    const history = useHistory();
    const params = history.location.search.split('=')[1];
    useEffect(() => {
        dispatch(actions.fetchCategoriesProductAction(params));
    }, [params]);
    const redirectSku = (e, slug) => {
        e.preventDefault();
        history.push(`/detail/${slug}`);
    }
    const renderProductGrid = () => {
        return product.data?.map((item, index) => {
            const sku = item.product_skus[0];
            const discount = discountProduct?.filter(disc => disc.id == item.product_id)[0].discounts;
            return (
                <div className="col-lg-4 col-md-6 col-12" key={item.id}>
                    <div className="product__item">
                        <div className="product__image">
                            <img src={`${STORAGE}/products/${sku.sku_image}`} alt="*" />
                            <div className="product__btn">
                                <a href="*">
                                    <i className="lni lni-cart" />
                                    Add to Cart
                                </a>
                            </div>
                        </div>
                        <div className="product__info">
                            <h4 className="product__name">
                                <a href="*"
                                    onClick={(e) => redirectSku(e, item.slugs[0].slug_url)}>
                                    {item.product_variant_name}
                                </a>
                            </h4>
                            <ul className="product__review">
                                <li><i className="lni lni-star-filled" /></li>
                                <li><i className="lni lni-star-filled" /></li>
                                <li><i className="lni lni-star-filled" /></li>
                                <li><i className="lni lni-star-filled" /></li>
                                <li className="product__grid--review"><span>4.0 Review(s)</span></li>
                            </ul>
                            <div className="product__price">
                                <span className="product__price--unit">
                                    ${
                                        sku.sku_promotion_price ?
                                            sku.sku_promotion_price : sku.sku_unit_price
                                    }
                                </span>
                                {
                                    sku.sku_promotion_price ?
                                        <span className="product__price--promotion">
                                            ${sku.sku_unit_price}
                                        </span> : ''
                                }
                            </div>
                            <div className="product__discount">
                                {
                                    discount?.discount_value ?
                                        <span>Gift ${discount.discount_value}</span> : ''
                                }
                            </div>
                        </div>
                    </div>
                </div>
            )
        });
    }
    const renderProductList = () => {
        return product.data?.map(item => {
            const sku = item.product_skus[0];
            const discount = discountProduct.filter(item => item.id == item.product_id)?.discounts;
            return (
                <div className="product__item" key={item.id}>
                    <div className="product__image">
                        <img src={`${STORAGE}/products/${sku.sku_image}`} alt="*" />
                        <div className="product__btn">
                            <a href="*">
                                <i className="lni lni-cart" />
                                Add to Cart
                            </a>
                        </div>
                    </div>
                    <div className="product__info">
                        <h4 className="product__name">
                            <a href="*"
                                onClick={(e) => redirectSku(e, item.slugs[0].slug_url)}>
                                {item.product_variant_name}
                            </a>
                        </h4>
                        <ul className="product__review">
                            <li><i className="lni lni-star-filled" /></li>
                            <li><i className="lni lni-star-filled" /></li>
                            <li><i className="lni lni-star-filled" /></li>
                            <li><i className="lni lni-star-filled" /></li>
                            <li className="product__grid--review"><span>4.0 Review(s)</span></li>
                        </ul>
                        <div className="product__price">
                            <span className="product__price--unit">
                                ${
                                    sku.sku_promotion_price ?
                                        sku.sku_promotion_price : sku.sku_unit_price
                                }
                            </span>
                            {
                                sku.sku_promotion_price ?
                                    <span className="product__price--promotion">
                                        ${sku.sku_unit_price}
                                    </span> : ''
                            }
                        </div>
                        <div className="product__discount">
                            {
                                discount?.discount_value ?
                                    <span>Gift ${discount.discount_value}</span> : ''
                            }
                        </div>
                    </div>
                </div>
            )
        })
    }
    return (
        <>
            <div className="tab-content" id="nav-tabContent">
                <div className="tab-pane fade show active" id="nav-grid" role="tabpanel" aria-labelledby="nav-grid-tab">
                    <div className="product__tab--grid row">
                        {discountProduct.length > 0 ? renderProductGrid() : ''}
                    </div>
                </div>
                <div className="tab-pane fade" id="nav-list" role="tabpanel" aria-labelledby="nav-list-tab">
                    <div className="product__tab--list">
                        {discountProduct.length > 0 ? renderProductList() : ''}
                    </div>
                </div>
            </div>
        </>
    )
}
