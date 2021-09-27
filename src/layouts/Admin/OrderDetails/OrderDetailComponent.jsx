import React, { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { ACCESS_TOKEN } from '../../../settings/configUrl';
import { callApiAdmin } from '../../../utils/callApi';
import { Table, Button, Input, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import moment from 'moment';

export default function OrderDetailComponent() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const location = useLocation();
    const query = location.search.split("?id=")[1];
    useEffect(() => {
        setLoading(true);
        callApiAdmin(`order/detail/${query}?token=${localStorage.getItem(ACCESS_TOKEN)}`)
            .then(res => {
                setLoading(false);
                setData(res.data.data);
            }).catch(e => {

            });
    }, [query]);
    let [seach, setSeach] = useState({
        searchText: '',
        searchedColumn: '',
    });
    let searchInput = useRef(null);
    const getColumnSearchProps = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={node => {
                        searchInput = node;
                    }}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{ marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Search
                    </Button>
                    <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({ closeDropdown: false });
                            setSeach({
                                searchText: selectedKeys[0],
                                searchedColumn: dataIndex,
                            })
                        }}
                    >
                        Filter
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
        onFilter: (value, record) =>
            record[dataIndex]
                ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
                : '',
        onFilterDropdownVisibleChange: visible => {
            if (visible) {
                setTimeout(() => searchInput.select(), 100);
            }
        },
        render: text =>
            seach.searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                    searchWords={[seach.searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSeach({
            searchText: selectedKeys[0],
            searchedColumn: dataIndex,
        })
    };
    const handleReset = clearFilters => {
        clearFilters();
        setSeach({ ...seach, searchText: '' });
    };
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            ...getColumnSearchProps('id'),
            sorter: (a, b) => a.id - b.id,
            sortDirections: ['descend', 'ascend']
        },
        {
            title: 'Order ID',
            dataIndex: 'order_id',
            key: 'order_id',
            ...getColumnSearchProps('order_id'),
            sorter: (a, b) => a.order_id - b.order_id,
            sortDirections: ['descend', 'ascend']
        },
        {
            title: 'Sku ID',
            dataIndex: 'sku_id',
            key: 'sku_id',
            ...getColumnSearchProps('sku_id'),
            sorter: (a, b) => a.sku_id - b.sku_id,
            sortDirections: ['descend', 'ascend']
        },
        {
            title: 'Product name',
            dataIndex: 'product_name',
            key: 'product_name',
            ...getColumnSearchProps('product_name'),
            sorter: (a, b) => a.product_name.length - b.product_name.length,
            sortDirections: ['descend', 'ascend']
        },
        {
            title: 'Price',
            dataIndex: 'product_price',
            key: 'product_price',
            ...getColumnSearchProps('product_price'),
            sorter: (a, b) => a.product_price - b.product_price,
            sortDirections: ['descend', 'ascend']
        },
        {
            title: 'Quantity',
            dataIndex: 'qty',
            key: 'qty',
        },
        {
            title: 'Discount',
            dataIndex: 'discount',
            key: 'discount'
        },
        {
            title: 'Created at',
            dataIndex: 'created_at',
            key: 'created_at',
            render: (t, data) => {
                return (
                    <span>{moment(data.created_at).format("DD-MM-YYYY H:m")}</span>
                )
            }
        }
    ];
    return (
        <>
            <div className="list-card row">
                <div className="col-12">
                    < Table
                        columns={columns}
                        dataSource={data}
                        loading={loading}
                        rowKey="id"
                    />
                </div>
            </div>
        </>
    )
}
