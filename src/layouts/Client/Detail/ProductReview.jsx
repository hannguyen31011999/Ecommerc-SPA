import React from 'react'

export default function ProductReview() {
    return (
        <>
            <div className="review__right col-lg-8">
                <div className="review__right--content">
                    <h4 className="review__title">Latest Reviews</h4>
                    <div className="review__list">
                        <div className="review__item">
                            <div className="review__image">
                                <img src={process.env.PUBLIC_URL + "/assets/img/user.png"} alt="*" />
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
                                <img src={process.env.PUBLIC_URL + "/assets/img/user.png"} alt="*" />
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
                                <img src={process.env.PUBLIC_URL + "/assets/img/user.png"} alt="*" />
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
        </>
    )
}
