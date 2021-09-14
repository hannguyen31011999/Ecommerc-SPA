import React from 'react'

export default function ModalReview() {
    return (
        <>
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
                                            <select name="star" className="form-select">
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
                                        <textarea name="content" cols={30} rows={8} className="form-control" defaultValue={""} />
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
