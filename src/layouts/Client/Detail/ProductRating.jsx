import React from 'react'
import ModalReview from './ModalReview'

export default function ProductRating() {
    return (
        <>
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
            <ModalReview />
        </>
    )
}
