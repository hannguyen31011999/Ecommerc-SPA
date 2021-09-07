import React from 'react';
import { useSelector } from 'react-redux';

export default function HeaderSeach() {
    let categories = useSelector(state => state.HomeReducer.categories);
    const renderCategories = () => {
        return categories?.map(item => {
            return (
                <option value={item.id} key={item.id}>{item.categories_name}</option>
            )
        });
    }
    return (
        <div className="col-lg-5 col-md-6  header__middle--center">
            <div className="header__middle--select">
                <select className="form-select">
                    <option value="">All</option>
                    {categories ? renderCategories() : ''}
                </select>
            </div>
            <div className="header__middle--input">
                <input type="text" className="form-control" placeholder="Seach" />
            </div>
            <div className="header__middle--btn">
                <button className="btn btn-primary">
                    <i className="lni lni-search-alt" />
                </button>
            </div>
        </div>
    )
}
