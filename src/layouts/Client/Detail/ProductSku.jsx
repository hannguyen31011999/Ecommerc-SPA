import React, { memo } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom'
import * as actions from './Modules/Actions';
import * as cartAct from '../../../redux/Actions/User/CartActions';
import moment from 'moment';
import { INFO, ACCESS_TOKEN } from '../../../settings/configUrl';
import { alertErrors } from '../../../settings/config';

function ProductSku(props) {
    const categories = useSelector(state => state.ProductDetailReducer.categories);
    const product = useSelector(state => state.ProductDetailReducer.product);
    const discount = useSelector(state => state.ProductDetailReducer.discount);
    const variant = useSelector(state => state.ProductDetailReducer.variants);
    const product_sku = useSelector(state => state.ProductDetailReducer.product_sku);
    const slugs = useSelector(state => state.ProductDetailReducer.slug);
    const inventory = useSelector(state => state.ProductDetailReducer.inventory);
    const image = useSelector(state => state.ProductDetailReducer.image);
    const cart = useSelector(state => state.CartReducer.cart);
    const history = useHistory();
    const dispatch = useDispatch();
    const renderRom = () => {
        return variant?.map((item, index) => {
            const url = slugs.filter(slug => slug.product_variant_id == item.id)[0];
            if (item.id == product.id) {
                return (
                    <div className="product__rom--item rom-active" key={item.id} onClick={() => { props.redirect(url.slug_url) }}>
                        <span>{item.product_variant_rom}GB</span>
                    </div>
                )
            } else {
                return (
                    <div className="product__rom--item" key={item.id} onClick={() => { props.redirect(url.slug_url) }}>
                        <span>{item.product_variant_rom}GB</span>
                    </div>
                )
            }
        });
    }
    const changeImage = (sku) => {
        dispatch(actions.changeImageAct(sku));
    }
    const renderColor = () => {
        return product_sku?.map((item, index) => {
            if (image.id == item.id) {
                return (
                    <div className="product__color--item color-active" key={item.id}
                        onClick={() => changeImage(item)}>
                        <span>{item.color}</span>
                    </div>
                )
            } else {
                return (
                    <div className="product__color--item" key={item.id}
                        onClick={() => changeImage(item)}>
                        <span>{item.color}</span>
                    </div>
                )
            }
        })
    }
    const addToCart = (e) => {
        e.preventDefault();
        const user = JSON.parse(localStorage.getItem(INFO));
        const token = localStorage.getItem(ACCESS_TOKEN);
        const sku = inventory?.filter(inv => inv.sku_id == image.id)[0];
        if (token && user) {
            const data = {
                sku_id: image.id,
                name: product.product_variant_name,
                unit_price: image.sku_unit_price,
                promotion_price: image.sku_promotion_price ? image.sku_promotion_price : 0,
                color: image.color,
                slug: slugs.filter(slug => slug.product_variant_id == product.id)[0].slug_url,
                discount: discount.discount_value,
                image: image.sku_image,
                qty: parseInt(e.target[0].value),
                user_id: user.id
            }
            if (sku.status == 1 && sku.qty >= parseInt(e.target[0].value)) {
                const temp = cart.filter(cart => cart.sku_id == image.id)[0];
                if (temp) {
                    if ((temp.qty + parseInt(e.target[0].value)) > sku.qty) {
                        alertErrors('Sorry, Product is out of stock!');
                    } else {
                        dispatch(cartAct.createCartAction(data));
                    }
                } else {
                    dispatch(cartAct.createCartAction(data));
                }
            } else {
                alertErrors('Sorry, Product is out of stock!');
            }
        } else {
            history.push('/login');
        }
    }
    return (
        <>
            <div className="col-lg-6">
                <div className="product__top--info">
                    <div className="product__title">
                        <h3>{product?.product_variant_name}</h3>
                    </div>
                    <div className="product__category">
                        <h4>
                            <i className="lni lni-tag" />
                            Categories: <a href="">{categories?.categories_name}</a>
                        </h4>
                    </div>
                    <div className="product__price">
                        <span className="product__price--promotion">${product_sku.length > 0 ? image.sku_promotion_price ? image.sku_promotion_price : image.sku_unit_price : 0}</span>
                        <span className="product__price--unit">{product_sku.length > 0 && image.sku_promotion_price ? `$ ${image.sku_unit_price}` : ''}</span>
                    </div>
                    <div className="product__rom">
                        {
                            variant.length > 0 ? renderRom() : ''
                        }
                    </div>
                    <div className="product__color">
                        {
                            product_sku.length > 0 ? renderColor() : ''
                        }
                    </div>
                    <div className="product__discount">
                        {
                            discount?.id ?
                                <div className="product__discount--content">
                                    <h4>{discount.discount_name} {discount.discount_value}$</h4>
                                    <p>Prices and promotions are expected to apply until &nbsp;
                                        {moment(discount.discount_end).format('DD-MM-YYYY H:m')}
                                    </p>
                                </div> : ''
                        }
                    </div>
                    <form onSubmit={addToCart} className="product__action">
                        <div className="product__action--quantity">
                            <input type="number" className="form-control" defaultValue={1} min={1} max={5} />
                        </div>
                        <div className="product__action--item">
                            <button className="product__btn--add">Add To Cart</button>
                        </div>
                        <div className="product__action--item">
                            <button className="product__btn--compare">
                                <i className="lni lni-reload" />
                                Compare
                            </button>
                        </div>
                        <div className="product__action--item">
                            <button className="product__btn--wishlist">
                                <i className="lni lni-heart" />
                                To Wishlist
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default memo(ProductSku);