import React from 'react'

export default function PurchaseComponent() {
    return (
        <>
            <ul className="nav nav-tabs align-items-center" id="myTab" role="tablist">
                <li className="nav-item active-purchase" role="presentation">
                    <button className="nav-link active" id="total-tab" data-bs-toggle="tab" data-bs-target="#total" type="button" role="tab" aria-controls="total" aria-selected="true">Total</button>
                </li>
                <li className="nav-item" role="presentation">
                    <button className="nav-link" id="wait-tab" data-bs-toggle="tab" data-bs-target="#wait" type="button" role="tab" aria-controls="wait" aria-selected="false">
                        Comfirmation
                    </button>
                </li>
                <li className="nav-item" role="presentation">
                    <button className="nav-link" id="delivering-tab" data-bs-toggle="tab" data-bs-target="#delivering" type="button" role="tab" aria-controls="delivering" aria-selected="false">Delivering</button>
                </li>
                <li className="nav-item" role="presentation">
                    <button className="nav-link" id="delivered-tab" data-bs-toggle="tab" data-bs-target="#delivered" type="button" role="tab" aria-controls="delivered" aria-selected="false">Delivered</button>
                </li>
                <li className="nav-item" role="presentation">
                    <button className="nav-link" id="cancel-tab" data-bs-toggle="tab" data-bs-target="#cancel" type="button" role="tab" aria-controls="cancel" aria-selected="false">Cancelled</button>
                </li>
            </ul>
            <div className="purchase__seach">
                <input type="text" className="form-control" placeholder="Search by ID or Product name....." />
            </div>
            <div className="tab-content" id="myTabContent">
                <div className="tab-pane fade show active" id="total" role="tabpanel" aria-labelledby="total-tab">
                    <div className="purchase__order">
                        <div className="purchase__status">
                            <p>Cancelled</p>
                        </div>
                        <div className="purchase__list">
                            <div className="purchase__item">
                                <div className="purchase__image">
                                    <a href="*"><img src="./assets/img/product-1.jpg" alt="*" /></a>
                                </div>
                                <div className="purchase__product">
                                    <h4 className="product__name">
                                        <a href="*">iPhone 12 Pro Max 256GB</a>
                                    </h4>
                                    <h5 className="product__sku">Color: Graphite</h5>
                                    <p className="product__qty">x1</p>
                                </div>
                                <div className="purchase__price">
                                    <p>$300</p>
                                </div>
                            </div>
                            <div className="purchase__item">
                                <div className="purchase__image">
                                    <a href="*"><img src="./assets/img/product-1.jpg" alt="*" /></a>
                                </div>
                                <div className="purchase__product">
                                    <h4 className="product__name">
                                        <a href="*">iPhone 12 Pro Max 256GB</a>
                                    </h4>
                                    <h5 className="product__sku">Color: Graphite</h5>
                                    <p className="product__qty">x1</p>
                                </div>
                                <div className="purchase__price">
                                    <p>$300</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="purchase__order">
                        <div className="purchase__status">
                            <p>Dellevering</p>
                        </div>
                        <div className="purchase__list">
                            <div className="purchase__item">
                                <div className="purchase__image">
                                    <a href="*"><img src="./assets/img/product-1.jpg" alt="*" /></a>
                                </div>
                                <div className="purchase__product">
                                    <h4 className="product__name">
                                        <a href="*">iPhone 12 Pro Max 256GB</a>
                                    </h4>
                                    <h5 className="product__sku">Color: Graphite</h5>
                                    <p className="product__qty">x1</p>
                                </div>
                                <div className="purchase__price">
                                    <p>$300</p>
                                </div>
                            </div>
                            <div className="purchase__item">
                                <div className="purchase__image">
                                    <a href="*"><img src="./assets/img/product-1.jpg" alt="*" /></a>
                                </div>
                                <div className="purchase__product">
                                    <h4 className="product__name">
                                        <a href="*">iPhone 12 Pro Max 256GB</a>
                                    </h4>
                                    <h5 className="product__sku">Color: Graphite</h5>
                                    <p className="product__qty">x1</p>
                                </div>
                                <div className="purchase__price">
                                    <p>$300</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="purchase__order">
                        <div className="purchase__status">
                            <p>Dellevered</p>
                        </div>
                        <div className="purchase__list">
                            <div className="purchase__item">
                                <div className="purchase__image">
                                    <a href="*"><img src="./assets/img/product-1.jpg" alt="*" /></a>
                                </div>
                                <div className="purchase__product">
                                    <h4 className="product__name">
                                        <a href="*">iPhone 12 Pro Max 256GB</a>
                                    </h4>
                                    <h5 className="product__sku">Color: Graphite</h5>
                                    <p className="product__qty">x1</p>
                                </div>
                                <div className="purchase__price">
                                    <p>$300</p>
                                </div>
                            </div>
                            <div className="purchase__item">
                                <div className="purchase__image">
                                    <a href="*"><img src="./assets/img/product-1.jpg" alt="*" /></a>
                                </div>
                                <div className="purchase__product">
                                    <h4 className="product__name">
                                        <a href="*">iPhone 12 Pro Max 256GB</a>
                                    </h4>
                                    <h5 className="product__sku">Color: Graphite</h5>
                                    <p className="product__qty">x1</p>
                                </div>
                                <div className="purchase__price">
                                    <p>$300</p>
                                </div>
                            </div>
                        </div>
                        <div className="purchase__action">
                            <button className="product__btn">Cancel</button>
                        </div>
                    </div>
                </div>
                <div className="tab-pane fade" id="wait" role="tabpanel" aria-labelledby="wait-tab">
                    ...
                </div>
                <div className="tab-pane fade" id="delivering" role="tabpanel" aria-labelledby="delivering-tab">
                    ...
                </div>
                <div className="tab-pane fade" id="delivered" role="tabpanel" aria-labelledby="delivered-tab">
                    ...
                </div>
                <div className="tab-pane fade" id="cancel" role="tabpanel" aria-labelledby="cancel-tab">
                    ...
                </div>
            </div>
        </>
    )
}
