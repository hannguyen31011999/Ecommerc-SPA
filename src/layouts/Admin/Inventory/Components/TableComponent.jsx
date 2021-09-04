import React, { useEffect, useState, useRef, memo, useCallback } from 'react'
import { Table, Button, Input, Space, Select } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux'
import * as trans from '../modules/Actions';
import { formatCurrency } from '../../../../utils/getImage';
import ModalEdit from '../Modals/ModalEdit';
// import ModalEdit from '../Modals/ModalEdit';
const { Option } = Select;

export default function TableComponent() {
    let inventory = useSelector(state => state.InventoryReducer.data);
    let pagination = useSelector(state => state.InventoryReducer.pagination);
    let loading = useSelector(state => state.InventoryReducer.loading);
    let [seach, setSeach] = useState({
        searchText: '',
        searchedColumn: '',
    });
    let searchInput = useRef(null);
    const dispatch = useDispatch();
    useEffect(() => {
        if (Array.isArray(inventory) && !inventory.length > 0) {
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
    const handleChangeStatus = (status, id) => {
        dispatch(trans.updateStatusAction(id, { status }));
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
            title: 'Product name',
            dataIndex: 'variant_id',
            key: 'variant_id',
            ...getColumnSearchProps('variant_id'),
            sorter: (a, b) => a.variant_id - b.variant_id,
            sortDirections: ['descend', 'ascend'],
            render: (text, data) => {
                return (
                    <span>{data.product_variants?.product_variant_name}</span>
                )
            }
        },
        {
            title: 'Color',
            dataIndex: 'sku_id',
            key: 'sku_id',
            ...getColumnSearchProps('sku_id'),
            sorter: (a, b) => a.sku_id - b.sku_id,
            sortDirections: ['descend', 'ascend'],
            render: (text, data) => {
                return (
                    <span>{data.product_skus?.color}</span>
                )
            }
        },
        {
            title: 'Quantity',
            dataIndex: 'qty',
            key: 'qty',
            ...getColumnSearchProps('qty'),
            sorter: (a, b) => a.variant_id - b.variant_id,
            sortDirections: ['descend', 'ascend']
        },
        {
            title: 'Price unit',
            dataIndex: 'unit_price',
            key: 'unit_price',
            ...getColumnSearchProps('unit_price'),
            sorter: (a, b) => a.unit_price - b.unit_price,
            sortDirections: ['descend', 'ascend'],
            render: (text, data) => {
                return (
                    <span>{formatCurrency(data.unit_price)}</span>
                )
            }
        },
        {
            title: 'Price promotion',
            dataIndex: 'promotion_price',
            key: 'promotion_price',
            ...getColumnSearchProps('promotion_price'),
            sorter: (a, b) => a.promotion_price - b.promotion_price,
            sortDirections: ['descend', 'ascend'],
            render: (text, data) => {
                return (
                    <span>{formatCurrency(data.promotion_price)}</span>
                )
            }
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            ...getColumnSearchProps('status'),
            render: (text, data) => {
                return (
                    <Select value={data.status} onChange={(e) => { handleChangeStatus(e, data.id) }}>
                        <Option value={0}>Pending</Option>
                        <Option value={1}>Success</Option>
                        <Option value={2}>Update</Option>
                    </Select>
                )
            }
        },
        {
            title: 'Action',
            key: 'action',
            render: (text) => {
                return (
                    <Space size="middle">
                        <Button title="Edit" onClick={() => { handleEdit(text.id) }}><i className="fa fa-edit"></i></Button>
                    </Space>
                )
            }
        }
    ];
    return (
        <>
            {inventory.length > 0 ? <ModalEdit /> : ''}
            <div className="col-12">
                < Table
                    columns={columns}
                    dataSource={inventory}
                    pagination={pagination}
                    onChange={onChange}
                    loading={loading}
                    rowKey="id"
                />
            </div>
        </>
    )
}
