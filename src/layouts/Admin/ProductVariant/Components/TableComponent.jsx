import React, { useEffect, useState, useRef, memo, useCallback } from 'react'
import { useParams, useHistory } from "react-router-dom";
import { Table, Button, Input, Space, Popconfirm } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { formatCurrency } from '../../../../utils/getImage';
import * as trans from '../modules/Actions';
import { STORAGE } from '../../../../settings/configUrl';
import ModalEdit from '../Modals/ModalEdit';


export default function TableComponent(props) {
    let variant = useSelector(state => state.ProductVariantReducer.data);
    let pagination = useSelector(state => state.ProductVariantReducer.pagination);
    let loading = useSelector(state => state.ProductVariantReducer.loading);
    const dispatch = useDispatch();
    let searchInput = useRef(null);
    let [seach, setSeach] = useState({
        searchText: '',
        searchedColumn: '',
    });
    const { id } = useParams();
    useEffect(() => {
        dispatch(trans.transAction(id, pagination.pageSize));
    }, [id]);
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
        dispatch(trans.deleteSkuAction(id));
    }
    const onReviewImage = (url) => {
        window.open(url);
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
            title: 'Product_id',
            dataIndex: 'product_id',
            key: 'product_id',
            ...getColumnSearchProps('product_id'),
            sorter: (a, b) => a.id - b.id,
            sortDirections: ['descend', 'ascend']
        },
        {
            title: 'Variant_id',
            dataIndex: 'product_variant_id',
            key: 'product_variant_id',
            ...getColumnSearchProps('product_variant_id'),
            sorter: (a, b) => a.id - b.id,
            sortDirections: ['descend', 'ascend']
        },
        {
            title: 'Price unit',
            dataIndex: 'sku_unit_price',
            key: 'sku_unit_price',
            ...getColumnSearchProps('categories_name'),
            sorter: (a, b) => a.categories_name.length - b.categories_name.length,
            sortDirections: ['descend', 'ascend'],
            render: (text, data) => {
                return (
                    <span>{formatCurrency(data.sku_unit_price)}</span>
                )
            }
        },
        {
            title: 'Price unit',
            dataIndex: 'sku_promotion_price',
            key: 'sku_promotion_price',
            ...getColumnSearchProps('categories_name'),
            sorter: (a, b) => a.categories_name.length - b.categories_name.length,
            sortDirections: ['descend', 'ascend'],
            render: (text, data) => {
                return (
                    <span>{formatCurrency(data.sku_promotion_price)}</span>
                )
            }
        },
        {
            title: 'Quantity',
            dataIndex: 'sku_qty',
            key: 'sku_qty',
        },
        {
            title: 'Color',
            dataIndex: 'color',
            key: 'color',
        },
        {
            title: 'Image',
            dataIndex: 'sku_image',
            key: 'sku_image',
            render: (text, data) => {
                return <img src={`${STORAGE}/products/${data.sku_image}`} height={45} width={45} onClick={() => onReviewImage(`${STORAGE}/products/${data.sku_image}`)} style={{ cursor: "pointer" }} />
            }
        },
        {
            title: 'Action',
            key: 'action',
            render: (text) => {
                return (
                    <Space size="middle">
                        <Button title="Edit" onClick={() => { handleEdit(text.id) }}><i className="fa fa-edit"></i></Button>
                        <Popconfirm
                            placement="bottomRight"
                            title="You want to delete?"
                            onConfirm={() => { handleDetele(text.id) }}
                            okText="Yes"
                            cancelText="No"
                        >
                            <Button title="Delete"><i className="fa fa-trash"></i></Button>
                        </Popconfirm>
                    </Space>
                )
            }
        }
    ];
    return (
        <>
            {variant.length > 0 ? <ModalEdit /> : ''}
            <div className="col-12">
                < Table
                    columns={columns}
                    dataSource={variant}
                    pagination={pagination}
                    loading={loading}
                    rowKey="id"
                />
            </div>
        </>
    )
}
