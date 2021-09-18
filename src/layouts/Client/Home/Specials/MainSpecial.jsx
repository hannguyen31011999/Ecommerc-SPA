import React, { useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import SpecialSale from './SpecialSale'
import SpecialBanner from './SpecialBanner';
import * as trans from '../Modules/Actions';
import { NavLink, useHistory } from 'react-router-dom';
import { ACCESS_TOKEN, INFO, STORAGE } from '../../../../settings/configUrl';
import { alertErrors } from '../../../../settings/config';
import * as actions from '../../../../redux/Actions/User/CartActions';

export default function MainSpecial() {
    const { product, productDiscount } = useSelector(state => state.HomeReducer.special);
    const discount = useSelector(state => state.HomeReducer.discount);
    const cart = useSelector(state => state.CartReducer.cart);
    const history = useHistory();
    const dispatch = useDispatch();
    useEffect(() => {
        if (Array.isArray(discount) && discount.length <= 0) {
            dispatch(trans.fetchProductDiscountAction());
        }
    }, []);
    const addToCart = async (e, item, gift = null) => {
        e.preventDefault();
        const user = JSON.parse(localStorage.getItem(INFO));
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (user && token) {
            const { product_skus, slugs } = item;
            const temp = cart?.filter(cart => cart.sku_id == product_skus[0].id)[0];
            if (product_skus[0].sku_qty > 0) {
                const data = {
                    sku_id: product_skus[0].id,
                    name: item.product_variant_name,
                    unit_price: product_skus[0].sku_unit_price,
                    promotion_price: product_skus[0].sku_promotion_price ? product_skus[0].sku_promotion_price : 0,
                    color: product_skus[0].color,
                    slug: slugs[0].slug_url,
                    discount: gift ? gift : 0,
                    image: product_skus[0].sku_image,
                    qty: 1,
                    user_id: user.id
                }
                if (temp) {
                    if (temp.qty >= product_skus[0].sku_qty) {
                        alertErrors('Sorry, Product is out of stock!');
                    } else {
                        dispatch(actions.createCartAction(data));
                    }
                } else {
                    dispatch(actions.createCartAction(data));
                }
            } else {
                alertErrors('Sorry, Product is out of stock!');
            }
        } else {
            history.push('/login');
        }
    }
    const renderProduct = () => {
        return product?.map(item => {
            const gift = discount.filter(gift => gift.id == item.product_id)[0];
            const sku = item.product_skus[0];
            const slug = item.slugs[0];
            return (
                <div className="col-md-4 col-12" key={item.id}>
                    <div className="special__item">
                        <div className="special__image">
                            <img src={`${STORAGE}/products/${sku.sku_image}`} alt="*" />
                            <div className="special__btn">
                                <a href="" onClick={(e) => { addToCart(e, item, gift?.discount_value) }}>
                                    <i className="lni lni-cart" />
                                    Add to Cart
                                </a>
                            </div>
                        </div>
                        <div className="special__info">
                            <p className="special__category">Smartphone</p>
                            <h4 className="special__name">
                                <NavLink to={`/detail/${slug.slug_url}`}>
                                    {item.product_variant_name}
                                </NavLink>
                            </h4>
                            <ul className="special__review">
                                <li><i className="lni lni-star-filled" /></li>
                                <li><i className="lni lni-star-filled" /></li>
                                <li><i className="lni lni-star-filled" /></li>
                                <li><i className="lni lni-star-filled" /></li>
                                <li><span>4.0 Review(s)</span></li>
                            </ul>
                            <div className="special__price">
                                <span className="special__price--unit">
                                    ${sku.sku_promotion_price}
                                </span>
                                <span className="special__price--promotion">
                                    ${sku.sku_unit_price}
                                </span>
                            </div>
                            <div className="special__discount">
                                <span>Gift ${gift?.discount_value}</span>
                            </div>
                        </div>
                    </div>
                </div>
            )
        })
    }
    return (
        <section className="special">
            <div className="container">
                <div className="special__title">
                    <h2>Special Offer</h2>
                    <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered
                        alteration in some form.</p>
                </div>
                <div className="special__content">
                    <div className="row">
                        <div className="col-lg-8 col-12 special__left">
                            <div className="special__list row">
                                {product.length > 0 ? renderProduct() : ''}
                            </div>
                            <SpecialBanner />
                        </div>
                        <div className="col-lg-4 col-12 special__right">
                            <SpecialSale productDiscount={productDiscount} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
