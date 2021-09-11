import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { alertErrors, alertSuccess } from '../../../../settings/config';
import { STORAGE } from '../../../../settings/configUrl';
import { makeid } from '../../../../utils/helper';
import * as trans from '../Modules/Actions';
import * as cart from '../../../../redux/Actions/User/CartActions';

const calculator = (unit, promotion) => {
    const sum = (unit - promotion) / unit * 100;
    return parseInt(sum);
}

export default function ProductList() {
    const product = useSelector(state => state.HomeReducer.product);
    const discount = useSelector(state => state.HomeReducer.discount);
    const dispatch = useDispatch();
    useEffect(() => {
        if (!(Array.isArray(product.data) && product.data.length > 0)) {
            dispatch(trans.fetchProductAction());
        }
    }, []);
    const addToCart = (e, item, gift = null) => {
        e.preventDefault();
        const { first_product_skus, inventory_managements, slugs } = item;
        if (first_product_skus[0].sku_qty > 0 && inventory_managements[0].status !== 0) {
            const data = {
                sku_id: first_product_skus[0].id,
                name: item.product_variant_name,
                unit_price: first_product_skus[0].sku_unit_price,
                promotion_price: first_product_skus[0].promotion_price ? first_product_skus[0].promotion_price : 0,
                color: first_product_skus[0].color,
                slug: slugs[0].slug_url,
                discount: gift ? gift : 0,
                image: first_product_skus[0].sku_image,
                qty: 1
            }
            dispatch(cart.addCartAct(data));
            alertSuccess('Add product success')
        } else {
            alertErrors('Sorry, Product is out of stock!');
        }

    }
    const renderListProduct = () => {
        return product.data?.map((item, index) => {
            const sku = item?.first_product_skus[0];
            const gift = discount.filter(gift => gift.id == item.product_id)[0];
            const slug = item.slugs[0];
            return (
                <div className="col-lg-3 col-md-6 col-12" key={item.id}>
                    <div className="product__item">
                        <div className="product__image">
                            <img src={`${STORAGE}/products/${sku.sku_image}`} alt="*" />
                            <div className="product__btn">
                                <a href="" onClick={(e) => { addToCart(e, item, gift?.discount_value) }}>
                                    <i className="lni lni-cart" />
                                    Add to Cart
                                </a>
                            </div>
                        </div>
                        <div className="product__info">
                            <p className="product__category">Smartphone</p>
                            <h4 className="product__name">
                                <NavLink to={slug.slug_url}>
                                    {item.product_variant_name}
                                </NavLink>
                            </h4>
                            <ul className="product__review">
                                <li><i className="lni lni-star-filled" /></li>
                                <li><i className="lni lni-star-filled" /></li>
                                <li><i className="lni lni-star-filled" /></li>
                                <li><i className="lni lni-star-filled" /></li>
                                <li><span>4.0 Review(s)</span></li>
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
                                <span>{gift ? `Gift ${gift.discount_value}$` : ''}</span>
                            </div>
                        </div>
                        {
                            sku.sku_promotion_price ?
                                <div className="product__tag sale">
                                    <span>-{calculator(sku.sku_unit_price, sku.sku_promotion_price)}%</span>
                                </div> : index % 2 === 0 ? <div className="product__tag new">
                                    <span>New</span>
                                </div> : ''
                        }
                    </div>
                </div>
            )
        });
    }
    const handleLoadProduct = () => {
        dispatch(trans.loadMoreProductAction(product.nextPage));
    }
    return (
        <div className="product__list row">
            {renderListProduct()}
            <div className="load-more text-center">
                {
                    product.data.length < product.total ?
                        <button onClick={handleLoadProduct}>Load more {product.total - product.data.length} Product</button> : ''
                }
            </div>
        </div>
    )
}
