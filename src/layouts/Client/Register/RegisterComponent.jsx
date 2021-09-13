import React from 'react'

export default function RegisterComponent() {
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
            <section className="register">
                <div className="container">
                    <div className="register__content">
                        <form className="register__form">
                            <div className="register__title">
                                <h2>No Account? Register</h2>
                                <p>Registration takes less than a minute but gives you full control over your orders.</p>
                            </div>
                            <div className="register__group">
                                <label htmlFor="name"><span>*</span>Fullname</label>
                                <input type="text" name="name" className="form-control" />
                            </div>
                            <div className="register__group">
                                <label htmlFor="email"><span>*</span>Email</label>
                                <input type="email" name="email" className="form-control" />
                            </div>
                            <div className="register__group">
                                <label htmlFor="password"><span>*</span>Password</label>
                                <input type="password" name="password" className="form-control" />
                            </div>
                            <div className="register__group">
                                <label htmlFor="confirm-password"><span />
                                    <span>*</span>Confirm Password
                                </label>
                                <input type="password" name="confirm-password" className="form-control" />
                            </div>
                            <div className="register__group">
                                <label htmlFor="address"><span>*</span>Address</label>
                                <input type="text" name="address" className="form-control" />
                            </div>
                            <div className="register__group">
                                <label htmlFor="phone"><span>*</span>Number Phone</label>
                                <input type="text" name="phone" className="form-control" />
                            </div>
                            <div className="register__group">
                                <label htmlFor>Birth</label>
                                <input type="date" name="birth" className="form-control" />
                            </div>
                            <div className="register__group">
                                <label htmlFor>Gender</label>
                                <select name="gender" className="form-select">
                                    <option value>Select Gender</option>
                                    <option value={1}>Male</option>
                                    <option value={0}>Female</option>
                                </select>
                            </div>
                            <div className="register__btn">
                                <button>Register</button>
                            </div>
                            <div className="register__outer">
                                <p>Already have an account? <a href>Login Now</a></p>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </>
    )
}
