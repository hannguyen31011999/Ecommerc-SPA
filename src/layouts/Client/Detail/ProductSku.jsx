import React from 'react'
import { useSelector } from 'react-redux';
import moment from 'moment';

export default function ProductSku() {
    const categories = useSelector(state => state.ProductDetailReducer.categories);
    const product = useSelector(state => state.ProductDetailReducer.product);
    const discount = useSelector(state => state.ProductDetailReducer.discount);
    const variant = useSelector(state => state.ProductDetailReducer.variants);
    const product_sku = useSelector(state => state.ProductDetailReducer.product_sku);
    const renderRom = () => {
        return variant?.map((item, index) => {
            if (index < 1) {
                return (
                    <div className="product__rom--item rom-active" key={item.id}>
                        <span>{item.product_variant_rom}GB</span>
                    </div>
                )
            } else {
                return (
                    <div className="product__rom--item" key={item.id}>
                        <span>{item.product_variant_rom}GB</span>
                    </div>
                )
            }
        });
    }
    const renderColor = () => {
        return product_sku?.map((item, index) => {
            if (index < 1) {
                return (
                    <div className="product__color--item color-active" key={item.id}>
                        <span>{item.color}</span>
                    </div>
                )
            } else {
                return (
                    <div className="product__color--item" key={item.id}>
                        <span>{item.color}</span>
                    </div>
                )
            }
        })
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
                        <span className="product__price--promotion">${product_sku.length > 0 ? product_sku[0].sku_promotion_price ? product_sku[0].sku_promotion_price : product_sku[0].sku_unit_price : 0}</span>
                        <span className="product__price--unit">${product_sku.length > 0 ? product_sku[0].sku_promotion_price ? product_sku[0].sku_unit_price : 0 : 0}</span>
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
                    <div className="product__action">
                        <div className="product__action--quantity">
                            <input type="number" className="form-control" defaultValue={1} min={1} max={20} />
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
                    </div>
                </div>
            </div>
        </>
    )
}
