import React from 'react'
import SpecialSale from './SpecialSale'
import SpecialBanner from './SpecialBanner';

export default function MainSpecial() {
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
                                <div className="col-md-4 col-12">
                                    <div className="special__item">
                                        <div className="special__image">
                                            <img src="./assets/img/product-1.jpg" alt="*" />
                                            <div className="special__btn">
                                                <a href="">
                                                    <i className="lni lni-cart" />
                                                    Add to Cart
                                                </a>
                                            </div>
                                        </div>
                                        <div className="special__info">
                                            <p className="special__category">Headphones</p>
                                            <h4 className="special__name"><a href="#">Wireless Headphone</a></h4>
                                            <ul className="special__review">
                                                <li><i className="lni lni-star-filled" /></li>
                                                <li><i className="lni lni-star-filled" /></li>
                                                <li><i className="lni lni-star-filled" /></li>
                                                <li><i className="lni lni-star-filled" /></li>
                                                <li><span>4.0 Review(s)</span></li>
                                            </ul>
                                            <div className="special__price">
                                                <span className="special__price--unit">$350.00</span>
                                                <span className="special__price--promotion">$335.00</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4 col-12">
                                    <div className="special__item">
                                        <div className="special__image">
                                            <img src="./assets/img/product-1.jpg" alt="*" />
                                            <div className="special__btn">
                                                <a href="">
                                                    <i className="lni lni-cart" />
                                                    Add to Cart
                                                </a>
                                            </div>
                                        </div>
                                        <div className="special__info">
                                            <p className="special__category">Headphones</p>
                                            <h4 className="special__name"><a href="#">Wireless Headphone</a></h4>
                                            <ul className="special__review">
                                                <li><i className="lni lni-star-filled" /></li>
                                                <li><i className="lni lni-star-filled" /></li>
                                                <li><i className="lni lni-star-filled" /></li>
                                                <li><i className="lni lni-star-filled" /></li>
                                                <li><span>4.0 Review(s)</span></li>
                                            </ul>
                                            <div className="special__price">
                                                <span className="special__price--unit">$350.00</span>
                                                <span className="special__price--promotion">$335.00</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4 col-12">
                                    <div className="special__item">
                                        <div className="special__image">
                                            <img src="./assets/img/product-1.jpg" alt="*" />
                                            <div className="special__btn">
                                                <a href="">
                                                    <i className="lni lni-cart" />
                                                    Add to Cart
                                                </a>
                                            </div>
                                        </div>
                                        <div className="special__info">
                                            <p className="special__category">Headphones</p>
                                            <h4 className="special__name"><a href="#">Wireless Headphone</a></h4>
                                            <ul className="special__review">
                                                <li><i className="lni lni-star-filled" /></li>
                                                <li><i className="lni lni-star-filled" /></li>
                                                <li><i className="lni lni-star-filled" /></li>
                                                <li><i className="lni lni-star-filled" /></li>
                                                <li><span>4.0 Review(s)</span></li>
                                            </ul>
                                            <div className="special__price">
                                                <span className="special__price--unit">$350.00</span>
                                                <span className="special__price--promotion">$335.00</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <SpecialBanner />
                        </div>
                        <div className="col-lg-4 col-12 special__right">
                            <SpecialSale />
                        </div>
                    </div>
                </div>
            </div>
        </section>

    )
}
