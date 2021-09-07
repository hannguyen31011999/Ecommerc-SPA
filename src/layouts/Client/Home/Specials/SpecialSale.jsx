import React from 'react'

export default function SpecialSale() {
    return (
        <div className="special__offer">
            <div className="special__image">
                <img src="./assets/img/offer-image.jpg" alt="*" />
            </div>
            <div className="special__text">
                <h2><a href="#">Bluetooth Headphone</a></h2>
                <ul className="special__offer--review">
                    <li><i className="lni lni-star-filled" /></li>
                    <li><i className="lni lni-star-filled" /></li>
                    <li><i className="lni lni-star-filled" /></li>
                    <li><i className="lni lni-star-filled" /></li>
                    <li><i className="lni lni-star-filled" /></li>
                    <li><span>5.0 Review(s)</span></li>
                </ul>
                <div className="special__offer--price">
                    <span className="price__unit">$200.00</span>
                    <span className="price__promotion">$400.00</span>
                </div>
                <p className="special__offer--desc">
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry
                    incididunt ut eiusmod tempor labores.
                </p>
            </div>
            <div className="special__timer">
                <div className="special__box">
                    <div className="special__number"><span>526</span></div>
                    <div className="special__char"><span>Days</span></div>
                </div>
                <div className="special__box">
                    <div className="special__number"><span>11</span></div>
                    <div className="special__char"><span>Hours</span></div>
                </div>
                <div className="special__box">
                    <div className="special__number"><span>11</span></div>
                    <div className="special__char"><span>Minutes</span></div>
                </div>
                <div className="special__box">
                    <div className="special__number"><span>55</span></div>
                    <div className="special__char"><span>Secondes</span></div>
                </div>
            </div>
        </div>
    )
}
