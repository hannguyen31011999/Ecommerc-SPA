import React from 'react'

export default function LoginComponent() {
    return (
        <>
            <section className="breadcrumb">
                <div className="container">
                    <div className="breadcrumb__content">
                        <ul className="breadcrumb__list">
                            <li className="breadcrumb__item">
                                <a className="breadcrumb__navlink" href="">
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
            <section className="login">
                <div className="container">
                    <div className="login__content">
                        <div className="login__title">
                            <h2>Login Now</h2>
                            <p>You can login using your social media account or email address.</p>
                        </div>
                        <div className="login__social row">
                            <div className="col-md-4 login__item">
                                <a href="" className="login__facebook">
                                    <i className="lni lni-facebook-filled" />
                                    Facebook login
                                </a>
                            </div>
                            <div className="col-md-4 login__item">
                                <a href="" className="login__twitter">
                                    <i className="lni lni-twitter-original" />
                                    Twitter login
                                </a>
                            </div>
                            <div className="col-md-4 login__item">
                                <a href="" className="login__google">
                                    <i className="lni lni-google" />
                                    Google login
                                </a>
                            </div>
                        </div>
                        <div className="login__option">
                            <span>Or</span>
                        </div>
                        <form action="*" className="login__form">
                            <div className="login__group">
                                <label htmlFor="name" className="col-form-label">Email</label>
                                <input type="email" name="email" className="form-control" />
                            </div>
                            <div className="login__group">
                                <label htmlFor="password" className="col-form-label">Password</label>
                                <input type="password" name="password" className="form-control" />
                            </div>
                            <div className="login__remember">
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" defaultValue />
                                    <label className="form-check-label">
                                        Remember me
                                    </label>
                                </div>
                                <a href="">Forgot password?</a>
                            </div>
                            <div className="login__btn">
                                <button>Login</button>
                            </div>
                            <div className="login__outer">
                                <p>Don't have an account? <a href="">Register here </a></p>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </>
    )
}
