import React from 'react'

export default function CustomerComponent() {
    return (
        <>
            <div className="checkout__info">
                <div className="checkout__info--title">Your Personal Details</div>
                <div className="checkout__info--content">
                    <div className="row">
                        <div className="col-lg-6 col-12 mt-4">
                            <label htmlFor="first-name" className="form-label">
                                First Name
                            </label>
                            <input type="text" name="first_name" className="form-control" placeholder="First Name" />
                        </div>
                        <div className="col-lg-6 col-12 mt-4">
                            <label htmlFor="last-name" className="form-label">
                                Last Name
                            </label>
                            <input type="text" name="last_name" className="form-control" placeholder="Last Name" />
                        </div>
                        <div className="col-lg-6 col-12 my-4">
                            <label htmlFor="email" className="form-label">
                                Email Address
                            </label>
                            <input type="email" className="form-control" placeholder="Email address" />
                        </div>
                        <div className="col-lg-6 col-12 my-lg-4 mb-4">
                            <label htmlFor="phone" className="form-label">
                                Phone Number
                            </label>
                            <input type="phone" className="form-control" placeholder="Phone Number" />
                        </div>
                        <div className="col-12">
                            <label htmlFor="note" className="form-label">
                                Note
                            </label>
                            <textarea className="form-control" name="note" rows={3} defaultValue={""} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
