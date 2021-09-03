import React, { useEffect, useState, useRef, memo, useCallback } from 'react'
import { Table, Button, Input, Space, Popconfirm, TreeSelect } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux'
import * as trans from '../modules/Actions';
import moment from 'moment';
import { useHistory } from 'react-router-dom';
import ModalContent from '../Modals/Product/ModalContent';
import ModalOption from '../Modals/Product/ModalOption';
import ModalEdit from '../Modals/Product/ModalEdit';
import ModalCreateVariant from '../Modals/Variant/ModalCreateVariant';
import ModalEditVariant from '../Modals/Variant/ModalEditVariant';
const { TreeNode } = TreeSelect;

export default function TableComponent(props) {
    let product = useSelector(state => state.ProductReducer.data);
    let pagination = useSelector(state => state.ProductReducer.pagination);
    let loading = useSelector(state => state.ProductReducer.loading);
    const history = useHistory();
    let [seach, setSeach] = useState({
        searchText: '',
        searchedColumn: '',
    });
    let searchInput = useRef(null);
    const dispatch = useDispatch();
    const [treeLine, setTreeLine] = useState(true);
    const [showLeafIcon, setShowLeafIcon] = useState(false);
    useEffect(() => {
        if (Array.isArray(product) && !product.length > 0) {
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
        dispatch(trans.deleteProductAction(id));
    }
    const handleChangeVariant = (values) => {
        if (values) {
            let temp = values.split('-');
            if (temp[1] !== 'values') {
                dispatch(trans.modalEditVariantAct({ product_id: temp[2], id: temp[1], isBool: true }));
            } else {
                history.push(`/admin/variant/${temp[3]}/sku`);
            }
        }
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
            title: 'Categories_id',
            dataIndex: 'categories_id',
            key: 'categories_id',
        },
        {
            title: 'Discount id',
            dataIndex: 'discount_id',
            key: 'discount_id',
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
            title: 'Variant Product',
            dataIndex: 'name',
            key: 'name',
            render: (text, data) => {
                return (
                    <TreeSelect
                        showSearch
                        style={{ width: '100%' }}
                        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                        placeholder="Select variant product"
                        allowClear={true}
                        treeDefaultExpandAll
                        onSelect={handleChangeVariant}
                        treeLine={
                            treeLine && {
                                showLeafIcon,
                            }
                        }
                        style={{
                            width: 300,
                        }}
                        key={data.id}
                    >
                        {
                            data.product_variants?.map(item => {
                                return (
                                    <TreeNode
                                        value={`variant-${item.id}-${data.id}`}
                                        title={item.product_variant_name}
                                        key={`variant-${item.id}-${data.id}`}>
                                        {
                                            data.product_skus?.map(values => {
                                                if (values.product_variant_id == item.id) {
                                                    return (
                                                        <TreeNode
                                                            value={`variant-values-${values.id}-${item.id}`}
                                                            title={values.color}
                                                            key={`variant-values-${values.id}-${item.id}`}>
                                                        </TreeNode>
                                                    )
                                                }
                                            })
                                        }
                                    </TreeNode>
                                )
                            })
                        }
                    </TreeSelect>
                )
            }
        },
        {
            title: 'Option',
            dataIndex: 'option',
            key: 'option',
            render: (text, data) => {
                return (
                    <Button onClick={() => { dispatch(trans.modalOptionAct(data.id)) }} title="Product option"><i className="fa fa-search-plus"></i></Button>
                )
            }
        },
        {
            title: 'Description',
            dataIndex: 'product_desc',
            key: 'product_desc',
            render: (text, data) => {
                return (
                    <Button onClick={() => {
                        dispatch(trans.modalContentAct(data.id));
                    }}>Detail</Button>
                )
            }
        },
        {
            title: 'Action',
            key: 'action',
            render: (tetext, data) => {
                return (
                    <Space size="middle">
                        <Button title="Add variant" onClick={() => { dispatch(trans.modalVariantAct({ id: data.id, isBool: true })) }}>
                            <i className="fa fa-plus"></i>
                        </Button>
                        <Button title="Edit product" onClick={() => {
                            dispatch(trans.editAct(data.id));
                        }}><i className="fa fa-edit"></i></Button>
                        <Popconfirm
                            placement="bottomRight"
                            title="You want to delete?"
                            onConfirm={() => { handleDetele(data.id) }}
                            okText="Yes"
                            cancelText="No"
                        >
                            <Button title="Delete product"><i className="fa fa-trash"></i></Button>
                        </Popconfirm>
                    </Space>
                )
            }
        }
    ];
    return (
        <>
            {product.length > 0 ? <ModalEdit /> : ''}
            {product.length > 0 ? <ModalContent /> : ''}
            {product.length > 0 ? <ModalOption /> : ''}
            {product.length > 0 ? <ModalCreateVariant /> : ''}
            {product.length > 0 ? <ModalEditVariant /> : ''}
            <div className="col-12">
                < Table
                    columns={columns}
                    dataSource={product}
                    pagination={pagination}
                    onChange={onChange}
                    loading={loading}
                    rowKey="id"
                />
            </div>
        </>
    )
}
