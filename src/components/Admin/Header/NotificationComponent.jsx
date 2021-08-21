import React from 'react'
import { NavLink } from 'react-router-dom';

export default function NotificationComponent() {
    return (
        <>
            <li className="nav-item dropdown">
                <NavLink to="" className="nav-link content__icon--right" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <i className="fa fa-envelope" />
                    <span className="notification">10</span>
                </NavLink>
                <ul className="dropdown-menu menu-custom" aria-labelledby="navbarDropdown">
                    <li className="message-title">
                        Message Center
                    </li>
                    <li className="message-item d-flex">
                        <figure>
                            <img src="../img/man.png" width={40} height={40} alt="*" />
                        </figure>
                        <div className="message-text">
                            <h5>Hi there! I am wondering if you can help me with a
                                problem I've been having.</h5>
                            <p>Emily Fowler · 58m</p>
                        </div>
                    </li>
                    <li className="message-item d-flex">
                        <figure>
                            <img src="../img/man.png" width={40} height={40} alt="*" />
                        </figure>
                        <div className="message-text">
                            <h5>Hi there! I am wondering if you can help me with a
                                problem I've been having.</h5>
                            <p>Emily Fowler · 58m</p>
                        </div>
                    </li>
                    <li className="message-item d-flex">
                        <figure>
                            <img src="../img/man.png" width={40} height={40} alt="*" />
                        </figure>
                        <div className="message-text">
                            <h5>Hi there! I am wondering if you can help me with a
                                problem I've been having.</h5>
                            <p>Emily Fowler · 58m</p>
                        </div>
                        <hr />
                    </li>
                    <li className="message-read">
                        <NavLink to="">Read more</NavLink>
                    </li>
                </ul>
            </li>
        </>
    )
}
