import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

export default function HeaderCategory() {
    let categories = useSelector(state => state.HomeReducer.categories);
    const renderCategories = () => {
        return categories?.map(item => {
            if (item.products.length > 0) {
                return (
                    <li key={item.id}>
                        <NavLink to="">
                            {item.categories_name}
                            <i className="lni lni-chevron-right" />
                        </NavLink>
                        <ul className="header__categories--submenu">
                            {
                                item.products.map(product => {
                                    return (
                                        <li key={product.id}>
                                            <NavLink to="">{product.product_name}</NavLink>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </li>
                )
            }
            return (
                <li key={item.id}><NavLink to="">{item.categories_name}</NavLink></li>
            )
        });
    }
    return (
        <div className="header__bot--btn align-items-center">
            <span>
                <i className="lni lni-menu" />
                All categories
            </span>
            <ul className="header__categories--menu">
                {categories ? renderCategories() : ''}
            </ul>
        </div>
    )
}
