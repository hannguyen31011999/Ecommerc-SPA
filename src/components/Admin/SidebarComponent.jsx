import React, { useState } from 'react';
import { useHistory, NavLink } from 'react-router-dom';
import categories from '../../routes/categories';

export default function SidebarComponent(props) {
    let [active, setActive] = useState(props.match.path);
    const history = useHistory();
    const handleActive = (path) => {
        setActive(path);
        history.push(path);
    }
    const renderCategories = () => {
        return categories.map((item, index) => {
            if (item.children !== undefined) {
                return (
                    <li className="sidebar__item dropdown" key={index}>
                        <div className="sidebar__icon" title={item.name}>
                            {item.icon}
                        </div>
                        <div className="sidebar__title">
                            <NavLink to="">
                                {item.name}
                            </NavLink>
                        </div>
                        <ul className="sidebar__menu">
                            {
                                item.children.map((child, i) => {
                                    return (
                                        <li className="sidebar__navItem" key={i}>
                                            <NavLink to={child.url} className="sidebar__navlink">
                                                {child.name}
                                            </NavLink>
                                        </li>
                                    );
                                })
                            }
                        </ul>
                    </li>
                )
            } else {
                return (
                    <li className={`sidebar__item ${active === item.url ? 'active__item' : ''}`}
                        onClick={() => handleActive(item.url)} key={index}>
                        <div className="sidebar__icon" title="Product">
                            {item.icon}
                        </div>
                        <div className="sidebar__title">
                            <NavLink to={item.url}>
                                {item.name}
                            </NavLink>
                        </div>
                    </li>
                );
            }
        });
    }
    return (
        <div className="sidebar" id="sidebar">
            <div className="sidebar__logo text-center">
                <div className="sidebar__image">
                    <NavLink to="/admin/dashboard">
                        <img src="../img/admin.png" alt="*" />
                    </NavLink>
                </div>
            </div>
            <ul className="sidebar__list">
                {renderCategories()}
            </ul>
            <div className="sidebar__close text-center d-none d-lg-block">
                <button id="hide-sidebar"><i className="fa fa-angle-left" /></button>
            </div>
        </div>
    )
}