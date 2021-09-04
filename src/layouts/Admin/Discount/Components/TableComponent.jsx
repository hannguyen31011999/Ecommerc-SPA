import React, { useEffect, useState, useRef } from 'react'
import moment from 'moment';
import { Table, Button, Input, Space, Popconfirm } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux'
import * as trans from '../modules/Action';
import ModalEdit from '../Modals/ModalEdit';

export default function TableComponent(props) {
    let discount = useSelector(state => state.DiscountReducer.data);
    let pagination = useSelector(state => state.DiscountReducer.pagination);
    let loading = useSelector(state => state.DiscountReducer.loading);
    let [seach, setSeach] = useState({
        searchText: '',
        searchedColumn: '',
    });
    let searchInput = useRef(null);
    const dispatch = useDispatch();
    useEffect(() => {
        if (Array.isArray(discount) && !discount.length > 0) {
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
    const handleEdit = (id) => {
        dispatch(trans.editAct(id));
    }
    const handleDetele = (id) => {
        dispatch(trans.deleteDiscountAction(id));
    }
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
            title: 'Discount name',
            dataIndex: 'discount_name',
            key: 'discount_name',
            ...getColumnSearchProps('discount_name'),
            sorter: (a, b) => a.discount_name.length - b.discount_name.length,
            sortDirections: ['descend', 'ascend']
        },
        {
            title: 'Discount type',
            dataIndex: 'discount_type',
            key: 'discount_type',
            ...getColumnSearchProps('discount_type'),
            sorter: (a, b) => a.discount_type.length - b.discount_type.length,
            sortDirections: ['descend', 'ascend']
        },
        {
            title: 'Discount value',
            dataIndex: 'discount_value',
            key: 'discount_value',
            ...getColumnSearchProps('discount_value'),
            sorter: (a, b) => a.discount_value.length - b.discount_value.length,
            sortDirections: ['descend', 'ascend']
        },
        {
            title: 'Date start',
            dataIndex: 'discount_start',
            key: 'discount_start',
            ...getColumnSearchProps('discount_start'),
            sorter: (a, b) => a.discount_start.length - b.discount_start.length,
            sortDirections: ['descend', 'ascend'],
            render: (text, data) => {
                return (
                    <span> {moment(data.discount_start).format('DD-M-YYYY HH:mm:ss')}</span >
                )
            }
        },
        {
            title: 'Date end',
            dataIndex: 'discount_end',
            key: 'discount_end',
            ...getColumnSearchProps('discount_end'),
            sorter: (a, b) => a.discount_end.length - b.discount_end.length,
            sortDirections: ['descend', 'ascend'],
            render: (text, data) => {
                return (
                    <span> {moment(data.discount_end).format('DD-M-YYYY HH:mm:ss')}</span >
                )
            }
        },
        {
            title: 'Action',
            key: 'action',
            render: (text) => {
                return (
                    <Space size="middle">
                        <Button onClick={() => { handleEdit(text.id) }}><i className="fa fa-edit"></i></Button>
                        <Popconfirm
                            placement="bottomRight"
                            title="You want to delete?"
                            onConfirm={() => { handleDetele(text.id) }}
                            okText="Yes"
                            cancelText="No"
                        >
                            <Button><i className="fa fa-trash"></i></Button>
                        </Popconfirm>
                    </Space>
                )
            }
        }
    ];
    return (
        <>
            {discount.length > 0 ? <ModalEdit /> : ''}
            <div className="col-12">
                < Table
                    columns={columns}
                    dataSource={discount}
                    pagination={pagination}
                    onChange={onChange}
                    loading={loading}
                    rowKey="id"
                />
            </div>
        </>
    )
}
