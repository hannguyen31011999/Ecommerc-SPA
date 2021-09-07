import React, { useState } from 'react'


export default function MenuMobile(props) {
    const [visiable, setVisiable] = useState('');
    const openSubMenu = (e, name) => {
        e.preventDefault();
        if (e.target.classList[1] && visiable) {
            setVisiable('');
        } else {
            setVisiable(name);
        }
    }
    return (
        <div className={props.menu ? 'header__mobile toggle__menu' : 'header__mobile'} >
            <ul className="mobile__menu">
                <li className="mobile__item">
                    <a href="" className="mobile__navlink active">Home</a>
                </li>
                <li className="mobile__item">
                    <a href="" onClick={(e) => openSubMenu(e, 'page')} className={visiable === 'page' ? 'mobile__navlink navlink__active' : 'mobile__navlink'}>
                        Pages
                        <i className="fa fa-angle-down" />
                    </a>
                    <ul className={visiable === 'page' ? "mobile__submenu menu-active" : "mobile__submenu"}>
                        <li>
                            <a href="">Register</a>
                        </li>
                        <li>
                            <a href="">Login</a>
                        </li>
                        <li>
                            <a href="">Page 404</a>
                        </li>
                        <li>
                            <a href="">About Us</a>
                        </li>
                    </ul>
                </li>
                <li className="mobile__item">
                    <a href="" onClick={(e) => openSubMenu(e, 'shop')} className={visiable === 'shop' ? 'mobile__navlink navlink__active' : 'mobile__navlink'}>Shop
                        <i className="fa fa-angle-down" />
                    </a>
                    <ul className={visiable === 'shop' ? "mobile__submenu menu-active" : "mobile__submenu"}>
                        <li>
                            <a href="#">Product Detail</a>
                        </li>
                        <li>
                            <a href="#">Products</a>
                        </li>
                        <li>
                            <a href="#">Checkout</a>
                        </li>
                        <li>
                            <a href="#">Cart</a>
                        </li>
                    </ul>
                </li>
                <li className="mobile__item">
                    <a href="" className="mobile__navlink">Blog</a>
                </li>
                <li className="mobile__item">
                    <a href="" className="mobile__navlink">Contact Us</a>
                </li>
            </ul>
        </div>
    )
}
