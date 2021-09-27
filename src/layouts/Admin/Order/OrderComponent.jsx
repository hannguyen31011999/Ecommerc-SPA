import React, { useEffect, useState, useRef } from 'react'
import { Table, Button, Input, Space, Select } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined, DownloadOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux'
import moment from 'moment';
import * as trans from './modules/Actions';
import { NavLink } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { CSVLink } from 'react-csv';
const { Option } = Select;

const data = [
    ["firstname", "lastname", "email"],
    ["Ahmed", "Tomi", "ah@smthing.co.com"],
    ["Raed", "Labes", "rl@smthing.co.com"],
    ["Yezzi", "Min l3b", "ymin@cocococo.com"]
];

const renderMonth = () => {
    const data = Array.from({ length: 12 });
    return data.map((i, index) => {
        return <option value={index + 1} key={index}>{index + 1}</option>
    })
}

export default function OrderComponent(props) {
    let order = useSelector(state => state.OrderReducer.data);
    let excel = useSelector(state => state.OrderReducer.excel);
    let pagination = useSelector(state => state.OrderReducer.pagination);
    let loading = useSelector(state => state.OrderReducer.loading);
    let month = useRef();
    let date = new Date();
    let [seach, setSeach] = useState({
        searchText: '',
        searchedColumn: '',
    });
    let searchInput = useRef(null);
    const dispatch = useDispatch();
    useEffect(() => {
        if (Array.isArray(order) && !order.length > 0) {
            dispatch(trans.transAction(pagination.pageSize));
        } else {
            trans.loadingAct(false);
        }
    }, []);
    const onChange = (pagination) => {
        const { current, pageSize } = pagination;
        dispatch(trans.paginationAction(current, pageSize));
    }
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
            title: 'User',
            dataIndex: 'user_id',
            key: 'user_id',
            ...getColumnSearchProps('user_id'),
            sorter: (a, b) => a.user_id - b.user_id,
            sortDirections: ['descend', 'ascend']
        },
        {
            title: 'Email',
            dataIndex: 'order_email',
            key: 'order_email',
            ...getColumnSearchProps('order_email'),
            sorter: (a, b) => a.order_email.length - b.order_email.length,
            sortDirections: ['descend', 'ascend']
        },
        {
            title: 'Name',
            dataIndex: 'order_name',
            key: 'order_name',
            ...getColumnSearchProps('order_name'),
            sorter: (a, b) => a.order_name.length - b.order_name.length,
            sortDirections: ['descend', 'ascend']
        },
        {
            title: 'Address',
            dataIndex: 'order_address',
            key: 'order_address'
        },
        {
            title: 'Phone',
            dataIndex: 'order_phone',
            key: 'order_phone',
            ...getColumnSearchProps('order_phone'),
            sorter: (a, b) => a.order_phone.length - b.order_phone.length,
            sortDirections: ['descend', 'ascend']
        },
        {
            title: 'Payment',
            dataIndex: 'payment_option',
            key: 'payment_option',
            sorter: (a, b) => a.payment_option.length - b.payment_option.length,
            sortDirections: ['descend', 'ascend']
        },
        {
            title: 'Note',
            dataIndex: 'order_note',
            key: 'order_note'
        },
        {
            title: 'Status',
            dataIndex: 'order_status',
            key: 'order_status',
            sorter: (a, b) => a.order_status - b.order_status,
            sortDirections: ['descend', 'ascend'],
            render: (text, data) => {
                return (
                    <Select value={parseInt(data.order_status)} onChange={(values) => { handleChangeStatus(values, data.id) }}>
                        <Option value={1} disabled={true}>Comfirm</Option>
                        <Option value={2}>Relivering</Option>
                        <Option value={3} disabled={parseInt(data.order_status) === 3 || parseInt(data.order_status) === 1 ? true : false}>Relivered</Option>
                        <Option value={4}>Cancelled</Option>
                    </Select>
                )
            }
        },
        {
            title: 'Detail',
            render: (text, data) => {
                return (
                    <NavLink to={`/admin/order/detail?id=${data.id}`}>
                        Detail
                    </NavLink>
                )
            }
        },
        {
            title: 'Date',
            dataIndex: 'created_at',
            key: 'created_at',
            ...getColumnSearchProps('created_at'),
            sorter: (a, b) => a.created_at.length - b.created_at.length,
            sortDirections: ['descend', 'ascend'],
            render: (text, data) => {
                return (
                    <span>{moment(data.created_at).format("DD-MM-YYYY H:m:s")}</span>
                )
            }
        },
    ];
    const handleSeachInput = (e) => {
        const { value } = e.target;
        dispatch(trans.seachAction(15, value));
    }
    const handleChangeStatus = (values, id) => {
        const formData = new FormData();
        formData.append('order_status', parseInt(values));
        dispatch(trans.updateAction(id, formData));
    }
    const handleChangeMonth = (e) => {
        if (e.target.value) {
            month.current = e.target.value
            dispatch(trans.exportOrderAction(e.target.value));
        }
    }
    return (
        <>
            <ToastContainer />
            <div className="list-card row">
                <div className="col-12 col-sm-6 col-xl-3 mb-3">
                    <Input.Group compact>
                        <Input size="default" onChange={handleSeachInput} allowClear placeholder="Seach...." />
                    </Input.Group>
                </div>
                <div className="col-12 col-sm-6 col-xl-9 d-flex justify-content-end align-items-center">
                    <select className="select-month" onChange={handleChangeMonth}>
                        <option value="">Select month</option>
                        {renderMonth()}
                    </select>
                    <CSVLink
                        data={excel}
                        filename={`revenue-${month.current}-${date.getFullYear()}.csv`}
                        className="download-btn"
                        title="Export Excel">
                        <i className="lni lni-download"></i>
                    </CSVLink>
                </div>
                <div className="col-12">
                    < Table
                        columns={columns}
                        dataSource={order}
                        pagination={pagination}
                        onChange={onChange}
                        loading={loading}
                        rowKey="id"
                    />
                </div>
            </div>
        </>
    )
}
