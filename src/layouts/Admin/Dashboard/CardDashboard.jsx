import React from 'react'

export default function CardDashboard() {
    return (
        <>
            <div className="content__card col-12 col-sm-6 col-lg-3">
                <div className="content__item d-flex align-items-center">
                    <div className="content__text">
                        <p>Total Revenue</p>
                        <h5>350.000.000đ</h5>
                    </div>
                    <div className="content__icon">
                        <i className="fa fa-shopping-cart" />
                    </div>
                </div>
            </div>
            <div className="content__card col-12 col-sm-6 col-lg-3">
                <div className="content__item d-flex align-items-center">
                    <div className="content__text">
                        <p>Total Sales</p>
                        <h5>40.000</h5>
                    </div>
                    <div className="content__icon">
                        <i className="fa fa-shopping-cart" />
                    </div>
                </div>
            </div>
            <div className="content__card col-12 col-sm-6 col-lg-3">
                <div className="content__item d-flex align-items-center">
                    <div className="content__text">
                        <p>Total User</p>
                        <h5>400.000</h5>
                    </div>
                    <div className="content__icon">
                        <i className="fa fa-users"></i>
                    </div>
                </div>
            </div>
            <div className="content__card col-12 col-sm-6 col-lg-3">
                <div className="content__item d-flex align-items-center">
                    <div className="content__text">
                        <p>Total Visitor</p>
                        <h5>40.000</h5>
                    </div>
                    <div className="content__icon">
                        <i className="fa fa-eye"></i>
                    </div>
                </div>
            </div>
        </>
    )
}
