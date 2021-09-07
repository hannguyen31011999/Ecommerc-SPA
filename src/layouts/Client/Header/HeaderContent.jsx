import React from 'react'
import CartComponent from './CartComponent';
import HeaderSeach from './HeaderSeach';

export default function HeaderContent() {
    return (
        <div className="header__middle">
            <div className="container">
                <div className="row align-items-center header__middle--content">
                    <div className="col-lg-3 col-md-4 col-6  header__middle--left">
                        <a href="#" className="navbar-brand">
                            <img src="./assets/img/logo.svg" alt="*" />
                        </a>
                    </div>
                    <HeaderSeach />
                    <CartComponent />
                </div>
            </div>
        </div>
    )
}
