import React from 'react'

export default function ProductDetail() {
    return (
        <>
            <section className="breadcrumb">
                <div className="container">
                    <div className="breadcrumb__content">
                        <ul className="breadcrumb__list">
                            <li className="breadcrumb__item">
                                <a className="breadcrumb__navlink" href>
                                    <i className="lni lni-home" />
                                    Home
                                </a>
                            </li>
                            <li className="breadcrumb__item">
                                Single Product
                            </li>
                        </ul>
                    </div>
                </div>
            </section>
            <section className="product__detail">
                <div className="container">
                    <div className="product__top">
                        <div className="product__top--content row">
                            <div className="col-lg-6">
                                <div className="product__image">
                                    <div className="product__gallery">
                                        <div className="product__gallery--image">
                                            <img src="./assets/img/01.jpg" alt />
                                        </div>
                                        <div className="gallery_image--list">
                                            <div className="gallery_image--item">
                                                <img src="./assets/img/01.jpg" className="img-active" alt />
                                                <div className="gallery_image--title">
                                                    <span>Graphite</span>
                                                </div>
                                            </div>
                                            <div className="gallery_image--item">
                                                <img src="./assets/img/02.jpg" alt />
                                                <div className="gallery_image--title">
                                                    <span>Red</span>
                                                </div>
                                            </div>
                                            <div className="gallery_image--item">
                                                <img src="./assets/img/03.jpg" alt />
                                                <div className="gallery_image--title">
                                                    <span>Blue</span>
                                                </div>
                                            </div>
                                            <div className="gallery_image--item">
                                                <img src="./assets/img/04.jpg" alt />
                                                <div className="gallery_image--title">
                                                    <span>Silver</span>
                                                </div>
                                            </div>
                                            <div className="gallery_image--item">
                                                <img src="./assets/img/05.jpg" alt />
                                                <div className="gallery_image--title">
                                                    <span>Black</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="product__top--info">
                                    <div className="product__title">
                                        <h3>GoPro Karma Camera Drone</h3>
                                    </div>
                                    <div className="product__category">
                                        <h4>
                                            <i className="lni lni-tag" />
                                            Drones: <a href>Action cameras</a>
                                        </h4>
                                    </div>
                                    <div className="product__price">
                                        <span className="product__price--promotion">$850</span>
                                        <span className="product__price--unit">$945</span>
                                    </div>
                                    <div className="product__rom">
                                        <div className="product__rom--item rom-active">
                                            <span>64GB</span>
                                        </div>
                                        <div className="product__rom--item">
                                            <span>128GB</span>
                                        </div>
                                        <div className="product__rom--item">
                                            <span>254GB</span>
                                        </div>
                                        <div className="product__rom--item">
                                            <span>512GB</span>
                                        </div>
                                    </div>
                                    <div className="product__color">
                                        <div className="product__color--item color-active">
                                            <span>Graphite</span>
                                        </div>
                                        <div className="product__color--item">
                                            <span>Red</span>
                                        </div>
                                        <div className="product__color--item">
                                            <span>Blue</span>
                                        </div>
                                        <div className="product__color--item">
                                            <span>Silver</span>
                                        </div>
                                        <div className="product__color--item">
                                            <span>Black</span>
                                        </div>
                                    </div>
                                    <div className="product__discount">
                                        <div className="product__discount--content">
                                            <h4>Promotions worth 50$</h4>
                                            <p>Prices and promotions are expected to apply until 23:00 15/09</p>
                                        </div>
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
                        </div>
                    </div>
                    <div className="product__middle">
                        <div className="row">
                            <div className="product__middle--left col-lg-6">
                                <div className="product__middle--detail">
                                    <h4>Details</h4>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                                        ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                                        ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
                                        reprehenderit in voluptate velit esse cillum dolore eu fugiat.</p>
                                </div>
                                <div className="product__middle--feature">
                                    <h4>Features</h4>
                                    <ul>
                                        <li>Capture 4K30 Video and 12MP Photos</li>
                                        <li>Game-Style Controller with Touchscreen</li>
                                        <li>View Live Camera Feed</li>
                                        <li>Full Control of HERO6 Black</li>
                                        <li>Use App for Dedicated Camera Operation</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="product__middle--right col-lg-6">
                                <div className="product__specification">
                                    <h4>Specifications</h4>
                                    <ul>
                                        <li>Weight: <span>35.5oz (1006g)</span></li>
                                        <li>Maximum <span>Speed: 35 mph (15 m/s)</span></li>
                                        <li>Maximum Distance: <span>Up to 9,840ft (3,000m)</span></li>
                                        <li>Operating Frequency: <span>2.4GHz</span></li>
                                        <li>Manufacturer: <span>GoPro, USA</span></li>
                                    </ul>
                                </div>
                                <div className="product__shipping">
                                    <h4>Shipping Option</h4>
                                    <ul>
                                        <li>Courier: <span>2 - 4 days, $22.50</span></li>
                                        <li>Local Shipping: <span>up to one week, $10.00</span></li>
                                        <li>UPS Ground Shipping: <span>4 - 6 days, $18.00</span></li>
                                        <li>Unishop Global Export: <span>3 - 4 days, $25.00</span></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="product__bot">
                        <div className="row">
                            <div className="review__left col-lg-4 mb-4">
                                <h4 className="review__title">4.5 (Overall)</h4>
                                <ul>
                                    <li>
                                        <span>5 stars - 38</span>
                                        <i className="lni lni-star-filled" />
                                        <i className="lni lni-star-filled" />
                                        <i className="lni lni-star-filled" />
                                        <i className="lni lni-star-filled" />
                                        <i className="lni lni-star-filled" />
                                    </li>
                                    <li>
                                        <span>4 stars - 10</span>
                                        <i className="lni lni-star-filled" />
                                        <i className="lni lni-star-filled" />
                                        <i className="lni lni-star-filled" />
                                        <i className="lni lni-star-filled" />
                                        <i className="lni lni-star" />
                                    </li>
                                    <li>
                                        <span>3 stars - 3</span>
                                        <i className="lni lni-star-filled" />
                                        <i className="lni lni-star-filled" />
                                        <i className="lni lni-star-filled" />
                                        <i className="lni lni-star" />
                                        <i className="lni lni-star" />
                                    </li>
                                    <li>
                                        <span>2 stars - 1</span>
                                        <i className="lni lni-star-filled" />
                                        <i className="lni lni-star-filled" />
                                        <i className="lni lni-star" />
                                        <i className="lni lni-star" />
                                        <i className="lni lni-star" />
                                    </li>
                                    <li>
                                        <span>1 star - 0</span>
                                        <i className="lni lni-star-filled" />
                                        <i className="lni lni-star" />
                                        <i className="lni lni-star" />
                                        <i className="lni lni-star" />
                                        <i className="lni lni-star" />
                                    </li>
                                </ul>
                                <button type="button" className="review__btn" data-bs-toggle="modal" data-bs-target="#modalReview">
                                    Leave a Review
                                </button>
                            </div>
                            <div className="review__right col-lg-8">
                                <div className="review__right--content">
                                    <h4 className="review__title">Latest Reviews</h4>
                                    <div className="review__list">
                                        <div className="review__item">
                                            <div className="review__image">
                                                <img src="./assets/img/user.png" alt />
                                            </div>
                                            <div className="review__text">
                                                <h4 className="review__name">
                                                    Jacob Hammond
                                                </h4>
                                                <ul className="review__start--list">
                                                    <li><i className="lni lni-star-filled" /></li>
                                                    <li><i className="lni lni-star-filled" /></li>
                                                    <li><i className="lni lni-star-filled" /></li>
                                                    <li><i className="lni lni-star-filled" /></li>
                                                    <li><i className="lni lni-star" /></li>
                                                </ul>
                                                <div className="review__content">
                                                    <p>
                                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                                                        tempor...
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="review__item">
                                            <div className="review__image">
                                                <img src="./assets/img/user.png" alt />
                                            </div>
                                            <div className="review__text">
                                                <h4 className="review__name">
                                                    Jese Lingrad
                                                </h4>
                                                <ul className="review__start--list">
                                                    <li><i className="lni lni-star-filled" /></li>
                                                    <li><i className="lni lni-star-filled" /></li>
                                                    <li><i className="lni lni-star-filled" /></li>
                                                    <li><i className="lni lni-star-filled" /></li>
                                                    <li><i className="lni lni-star" /></li>
                                                </ul>
                                                <div className="review__content">
                                                    <p>
                                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                                                        tempor...
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="review__item">
                                            <div className="review__image">
                                                <img src="./assets/img/user.png" alt />
                                            </div>
                                            <div className="review__text">
                                                <h4 className="review__name">
                                                    Romeo Lukaku
                                                </h4>
                                                <ul className="review__start--list">
                                                    <li><i className="lni lni-star-filled" /></li>
                                                    <li><i className="lni lni-star-filled" /></li>
                                                    <li><i className="lni lni-star-filled" /></li>
                                                    <li><i className="lni lni-star-filled" /></li>
                                                    <li><i className="lni lni-star-filled" /></li>
                                                </ul>
                                                <div className="review__content">
                                                    <p>
                                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                                                        tempor...
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="review__load">
                                        <button className="load-more">Load more 15 review</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div className="modal fade" id="modalReview" tabIndex={-1} aria-labelledby="modalReviewLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Leave a Review</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                        </div>
                        <div className="modal-body">
                            <form action="*">
                                <div className="row">
                                    <div className="col-6">
                                        <div className="review__form mb-3">
                                            <label htmlFor="name" className="col-form-label">Your Name</label>
                                            <input type="text" name="name" className="form-control" />
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="review__form mb-3">
                                            <label htmlFor="name" className="col-form-label">Your Email</label>
                                            <input type="email" name="email" className="form-control" />
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="review__form mb-3">
                                            <label htmlFor="name" className="col-form-label">Your Phone</label>
                                            <input type="text" name="name" className="form-control" />
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="review__form mb-3">
                                            <label htmlFor="name" className="col-form-label">Rating</label>
                                            <select name="star" id className="form-select">
                                                <option value={5}>5 Stars</option>
                                                <option value={4}>4 Stars</option>
                                                <option value={3}>3 Stars</option>
                                                <option value={2}>2 Stars</option>
                                                <option value={1}>1 Stars</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-12 mb-3">
                                        <label htmlFor="name" className="col-form-label">Review</label>
                                        <textarea name id cols={30} rows={8} className="form-control" defaultValue={""} />
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary">Submit Review</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
