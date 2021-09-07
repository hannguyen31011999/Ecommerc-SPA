import React from 'react'

export default function HeaderTop() {
    return (
        <div className="header__topbar">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-8">
                    </div>
                    <div className="col-lg-4 col-12 d-flex justify-content-end align-items-center ">
                        <div className="header__topbar--right d-flex align-items-center">
                            <div className="header__topbar--user">
                                <i className="lni lni-user" />
                                <span>Username</span>
                            </div>
                            <ul className="header__topbar--login">
                                <li><a href="#">Sign In</a></li>
                                <li><a href="#">Resgister</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
