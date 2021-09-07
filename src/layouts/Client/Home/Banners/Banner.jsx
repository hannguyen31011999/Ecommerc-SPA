import React from 'react'

export default function Banner() {
    return (
        <>
            <div className="col-lg-4">
                <div className="row banner__content">
                    <div className="col-lg-12 col-md-6 banner__item">
                        <figure>
                            <img src="./assets/img/slider-bnr.jpg" alt="*" />
                        </figure>
                        <div className="banner__caption">
                            <p>New line required</p>
                            <h3>iPhone 12 Pro Max</h3>
                            <h4>$799.99</h4>
                        </div>
                    </div>
                    <div className="col-lg-12 col-md-6 banner__item">
                        <figure>
                            <img src="./assets/img/slider-bnr.jpg" alt="*" />
                        </figure>
                        <div className="banner__caption">
                            <p>New line required</p>
                            <h3>iPhone 12 Pro</h3>
                            <h4>$599.99</h4>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
