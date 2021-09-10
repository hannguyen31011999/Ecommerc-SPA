import React from 'react';
import { STORAGE } from '../../../../settings/configUrl';
import SpecialTimer from './SpecialTimer';

export default function SpecialSale(props) {
    const data = props?.productDiscount;
    return (
        <>
            <div className="special__offer" >
                <div className="special__image">
                    <img src={`${STORAGE}/products/${data?.sku_image}`} alt="*" />
                </div>
                <div className="special__text">
                    <h2><a href="#">{data?.product_variant_name}</a></h2>
                    <ul className="special__offer--review">
                        <li><i className="lni lni-star-filled" /></li>
                        <li><i className="lni lni-star-filled" /></li>
                        <li><i className="lni lni-star-filled" /></li>
                        <li><i className="lni lni-star-filled" /></li>
                        <li><i className="lni lni-star-filled" /></li>
                        <li><span>5.0 Review(s)</span></li>
                    </ul>
                    <div className="special__offer--price">
                        <span className="price__unit">${data?.sku_promotion_price}</span>
                        <span className="price__promotion">${data?.sku_unit_price}</span>
                    </div>
                    <p className="special__offer--desc">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry
                        incididunt ut eiusmod tempor labores.
                    </p>
                </div>
                <SpecialTimer data={data} />
            </div>
        </>
    )
}