import React, { useEffect, useState } from 'react';
import { Select } from 'antd';
import { alertErrors, url_get_district, url_get_province, url_get_ward } from '../../../settings/config';
import { apiTransport } from '../../../utils/callApi';
const { Option } = Select;

export default function TransportComponent(props) {
    const [data, setData] = useState({
        province: [],
        district: [],
        ward: []
    });
    const [select, setSelect] = useState({
        province_id: null,
        district_id: null,
        ward_code: null
    })
    useEffect(() => {
        apiTransport(url_get_province).then(res => {
            if (res.data.code == 200) {
                setData({ ...data, province: res.data.data });
            }
        }).catch(e => {
            if (e.response) {
                alertErrors('Sorry, Server errors please try again!');
            }
        });
    }, []);
    const changeProvince = (value) => {
        apiTransport(`${url_get_district}?province_id=${value}`).then(res => {
            setData({ ...data, district: res.data.data });
            setSelect({ ...select, province_id: value });
        }).catch(e => {
            if (e.response) {
                alertErrors('Sorry, Server errors please try again!');
            }
        });
    }
    const changeDistrict = (value) => {
        apiTransport(`${url_get_ward}?district_id=${value}`).then(res => {
            setData({ ...data, ward: res.data.data });
            setSelect({ ...select, district_id: value });
        }).catch(e => {
            if (e.response) {
                alertErrors('Sorry, Server errors please try again!');
            }
        });
    }
    return (
        <>
            <div className="checkout__shipping">
                <div className="checkout__shipping--title">Shipping Address</div>
                <div className="checkout__shipping--content">
                    <div className="row">
                        <div className="col-lg-6 col-12 mt-4">
                            <label htmlFor="province" className="form-label">
                                Province
                            </label>
                            <Select
                                size="large"
                                showSearch
                                placeholder="Select province"
                                optionFilterProp="children"
                                onChange={changeProvince}
                                filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                                name="province_id"
                            >
                                {
                                    data.province?.map(item => {
                                        return (
                                            <Option value={item.ProvinceID} key={item.ProvinceID}>
                                                {item.ProvinceName}
                                            </Option>
                                        )
                                    })
                                }
                            </Select>
                        </div>
                        <div className="col-lg-6 col-12 mt-4">
                            <label htmlFor="district" className="form-label">
                                District
                            </label>
                            <Select
                                size="large"
                                showSearch
                                placeholder="Select province"
                                optionFilterProp="children"
                                onChange={changeDistrict}
                                filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                                name="district_id"
                            >
                                {
                                    data.district?.map(item => {
                                        return (
                                            <Option value={item.DistrictID} key={item.DistrictID}>
                                                {item.DistrictName}
                                            </Option>
                                        )
                                    })
                                }
                            </Select>
                        </div>
                        <div className="col-lg-6 col-12 mt-4">
                            <label htmlFor="ward" className="form-label">
                                Ward
                            </label>
                            <Select
                                size="large"
                                showSearch
                                placeholder="Select province"
                                optionFilterProp="children"
                                onChange={(value) => props.getTransport(value, select)}
                                filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                                name="district_id"
                            >
                                {
                                    data.ward?.map(item => {
                                        return (
                                            <Option value={item.WardCode} key={item.WardCode}>
                                                {item.WardName}
                                            </Option>
                                        )
                                    })
                                }
                            </Select>
                        </div>
                        <div className="col-lg-6 col-12 my-4">
                            <label htmlFor="address" className="form-label">
                                Address
                            </label>
                            <input type="phone" className="form-control" placeholder="Your address" />
                        </div>
                        <div className="checkout__transport">
                            <h4 className="transport__title">Select Delivery Option</h4>
                            <div className="transport__item active">
                                <img src="./assets/img/shipping-2.png" alt="*" />
                                <h5 className="transport__category">DHL Shipping</h5>
                            </div>
                            <div className="transport__item">
                                <img src="./assets/img/shipping-3.png" alt="*" />
                                <h5 className="transport__category">DPD Shipping</h5>
                            </div>
                            <div className="transport__item">
                                <img src="./assets/img/shipping-4.png" alt="*" />
                                <h5 className="transport__category">InPost Shipping</h5>
                            </div>
                            <div className="transport__item">
                                <img src="./assets/img/shipping-1.png" alt="*" />
                                <h5 className="transport__category">GHN Shipping</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
