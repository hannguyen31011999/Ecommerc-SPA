import React from 'react'

export default function CartComponent() {
    return (
        <div className="col-lg-4 col-md-2 col-6 header__middle--right d-flex">
            <div className="header__middle--hotline d-lg-flex justify-content-end">
                <i className="lni lni-phone" />
                <h3>Hotline:<br />
                    <span>(+100) 123 456 7890</span>
                </h3>
            </div>
            <div className="header__middle--cart d-flex justify-content-end">
                <div className="header__middle--item">
                    <a href="#" className="header__middle--navlink">
                        <i className="lni lni-heart" />
                        <span className="header__middle--total">0</span>
                    </a>
                </div>
                <div className="header__middle--item">
                    <a href="#" className="header__middle--navlink">
                        <i className="lni lni-cart" />
                        <span className="header__middle--total">2</span>
                    </a>
                    <div className="header__middle--shopping">
                        <div className="header__cart--header">
                            <span>2 Items</span>
                            <a href="">View Cart</a>
                        </div>
                        <div className="header__cart--list">
                            <ul>
                                <li>
                                    <div className="header__cart--image">
                                        <a href="">
                                            <img src="./assets/img/item1.jpg" alt="*" />
                                        </a>
                                    </div>
                                    <div className="header__cart--content">
                                        <h4>
                                            <a href="">Apple Watch Series 6</a>
                                        </h4>
                                        <p>
                                            <span className="header__cart--quantity">1x</span>
                                            <span className="header__cart--amount">$99.00</span>
                                        </p>
                                    </div>
                                    <div className="header__cart--action">
                                        <a href="" title="Remove">
                                            <i className="lni lni-close" />
                                        </a>
                                    </div>
                                </li>
                                <li>
                                    <div className="header__cart--image">
                                        <a href="">
                                            <img src="./assets/img/item1.jpg" alt="*" />
                                        </a>
                                    </div>
                                    <div className="header__cart--content">
                                        <h4>
                                            <a href="">Apple Watch Series 6</a>
                                        </h4>
                                        <p>
                                            <span className="header__cart--quantity">1x</span>
                                            <span className="header__cart--amount">$99.00</span>
                                        </p>
                                    </div>
                                    <div className="header__cart--action">
                                        <a href="" title="Remove">
                                            <i className="lni lni-close" />
                                        </a>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className="header__cart--footer">
                            <div className="header__cart--total">
                                <span>Total</span>
                                <span className="header__cart--totalAmount">$198.00</span>
                            </div>
                            <div className="header__cart--btn">
                                <button className="btn btn-primary">Checkout</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
