import React from 'react'
import { useSelector } from 'react-redux';
import { STORAGE } from '../../../settings/configUrl';

export default function ProductImage() {
    const product_sku = useSelector(state => state.ProductDetailReducer.product_sku);
    const renderListImage = () => {
        return product_sku?.map((sku, index) => {
            if (index < 1) {
                return (
                    <div className="gallery_image--item" key={sku.id}>
                        <img src={`${STORAGE}/products/${sku.sku_image}`} className="img-active" alt="*" />
                        <div className="gallery_image--title">
                            <span>{sku.sku_color}</span>
                        </div>
                    </div>
                )
            } else {
                return (
                    <div className="gallery_image--item" key={sku.id}>
                        <img src={`${STORAGE}/products/${sku.sku_image}`} alt="*" />
                        <div className="gallery_image--title">
                            <span>{sku.sku_color}</span>
                        </div>
                    </div>
                )
            }
        })
    }
    return (
        <>
            <div className="col-lg-6">
                <div className="product__image">
                    <div className="product__gallery">
                        <div className="product__gallery--image">
                            <img src={product_sku.length > 0 ? `${STORAGE}/products/${product_sku[0].sku_image}` : process.env.PUBLIC_URL + "/assets/img/product-4.jpg"} alt="*" />
                        </div>
                        <div className="gallery_image--list">
                            {product_sku.length > 0 ? renderListImage() : ''}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
