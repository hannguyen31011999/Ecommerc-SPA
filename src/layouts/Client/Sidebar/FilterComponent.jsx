import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../Products/Modules/Actions';

export default function FilterComponent(props) {
    const data = useSelector(state => state.ProductClientReducer.product.data);
    const dataTemp = useSelector(state => state.ProductClientReducer.temp.data);
    const isCheck = useSelector(state => state.ProductClientReducer.filter.checkValue.isCheck);
    const type = useSelector(state => state.ProductClientReducer.filter.checkValue.value);
    const dispatch = useDispatch();
    const calculator = (key, data) => {
        let count = 0;
        switch (key) {
            case '0': {
                data.forEach(item => {
                    const product = item.product_skus[0];
                    if (product.sku_unit_price >= 50 && product.sku_unit_price < 101) {
                        ++count;
                    }
                });
                return count;
            }
            case '1': {
                data.forEach(item => {
                    const product = item.product_skus[0];
                    if (product.sku_unit_price > 100 && product.sku_unit_price < 501) {
                        ++count;
                    }
                });
                return count;
            }
            case '2': {
                data.forEach(item => {
                    const product = item.product_skus[0];
                    if (product.sku_unit_price > 500 && product.sku_unit_price < 1001) {
                        ++count;
                    }
                })
                return count;
            }
            case '3': {
                data.forEach(item => {
                    const product = item.product_skus[0];
                    if (product.sku_unit_price > 1000 && product.sku_unit_price < 2001) {
                        ++count;
                    }
                })
                return count;
            }
            default:
                return count;
        }
    }
    const handleCheckbox = (e) => {
        dispatch(actions.filterWithCheckbox(e.target.value));
    }
    return (
        <>
            <div className="product__filter--price">
                <h3>Filter by Price</h3>
                <div className="filter__list">
                    <div className="input-group">
                        <input className="form-check"
                            checked={isCheck && type === 'type-1'}
                            type="checkbox"
                            onChange={handleCheckbox} value="type-1" />
                        <label htmlFor="">$50 - 100 ({calculator('0', data.length > 0 ? data : dataTemp)})</label>
                    </div>
                    <div className="input-group">
                        <input className="form-check"
                            checked={isCheck && type === 'type-2'}
                            type="checkbox"
                            onChange={handleCheckbox} value="type-2" />
                        <label htmlFor="">$100 - 500 ({calculator('1', data.length > 0 ? data : dataTemp)})</label>
                    </div>
                    <div className="input-group">
                        <input className="form-check"
                            checked={isCheck && type === 'type-3'}
                            type="checkbox"
                            onChange={handleCheckbox} value="type-3" />
                        <label htmlFor="">$500 - 1000 ({calculator('2', data.length > 0 ? data : dataTemp)})</label>
                    </div>
                    <div className="input-group">
                        <input className="form-check"
                            checked={isCheck && type === 'type-4'}
                            type="checkbox"
                            onChange={handleCheckbox} value="type-4" />
                        <label htmlFor="">$1000 - 2000 ({calculator('3', data.length > 0 ? data : dataTemp)})</label>
                    </div>
                </div>
            </div>
        </>
    )
}
