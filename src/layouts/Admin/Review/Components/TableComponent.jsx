import React, { useEffect, useState, useRef, memo } from 'react'
import { Table, Button, Input, Space, Popconfirm, Switch } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux'
import * as trans from '../modules/Actions';

function TableComponent() {
    let review = useSelector(state => state.ReviewReducer.data);
    let pagination = useSelector(state => state.ReviewReducer.pagination);
    let loading = useSelector(state => state.ReviewReducer.loading);
    let [seach, setSeach] = useState({
        searchText: '',
        searchedColumn: '',
    });
    let searchInput = useRef(null);
    const dispatch = useDispatch();
    useEffect(() => {
        if (Array.isArray(review) && !review.length > 0) {
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
    const handleUpdate = (id, status) => {
        dispatch(trans.updateAction(id, { review_status: status }));
    }
    const handleDetele = (id) => {
        dispatch(trans.deleteAction(id));
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
            title: 'Id_user',
            dataIndex: 'user_id',
            key: 'user_id',
            ...getColumnSearchProps('user_id'),
            sorter: (a, b) => a.user_id - b.user_id,
            sortDirections: ['descend', 'ascend']
        },
        {
            title: 'variant_id',
            dataIndex: 'product_variant_id',
            key: 'product_variant_id',
            ...getColumnSearchProps('product_variant_id'),
            sorter: (a, b) => a.product_variant_id - b.product_variant_id,
            sortDirections: ['descend', 'ascend']
        },
        {
            title: 'Name',
            dataIndex: 'review_name',
            key: 'review_name',
            ...getColumnSearchProps('review_name'),
            sorter: (a, b) => a.review_name.length - b.review_name.length,
            sortDirections: ['descend', 'ascend']
        },
        {
            title: 'Email',
            dataIndex: 'review_email',
            key: 'review_email',
            ...getColumnSearchProps('review_email'),
            sorter: (a, b) => a.review_email.length - b.review_email.length,
            sortDirections: ['descend', 'ascend']
        },
        {
            title: 'Phone',
            dataIndex: 'review_phone',
            key: 'review_phone',
            ...getColumnSearchProps('review_phone'),
            sorter: (a, b) => a.review_phone.length - b.review_phone.length,
            sortDirections: ['descend', 'ascend']
        },
        {
            title: 'Star',
            dataIndex: 'review_star',
            key: 'review_star',
            ...getColumnSearchProps('review_star'),
            sorter: (a, b) => a.review_star - b.review_star,
            sortDirections: ['descend', 'ascend']
        },
        {
            title: 'Content',
            dataIndex: 'review_content',
            key: 'review_content'
        },
        {
            title: 'Status',
            key: 'review_status',
            render: (text, data) => {
                return (
                    data.review_status === 1 ?
                        <Switch
                            checkedChildren="Block"
                            unCheckedChildren="Open"
                            defaultChecked={true}
                            onClick={() => handleUpdate(data.id, 2)} />
                        :
                        <Switch
                            checkedChildren="Block"
                            unCheckedChildren="Open"
                            defaultChecked={false}
                            onClick={() => handleUpdate(data.id, 1)} />
                )
            }
        },
        {
            title: 'Action',
            key: 'action',
            render: (text) => {
                return (
                    <Space size="middle">
                        <Popconfirm
                            placement="bottomRight"
                            title="You want to delete?"
                            onConfirm={() => { handleDetele(text.id) }}
                            okText="Yes"
                            cancelText="No"
                        >
                            <Button title="delete"><i className="fa fa-trash"></i></Button>
                        </Popconfirm>
                    </Space>
                )
            }
        }
    ];
    return (
        <>
            <div className="col-12">
                < Table
                    columns={columns}
                    dataSource={review}
                    pagination={pagination}
                    onChange={onChange}
                    loading={loading}
                    rowKey="id"
                />
            </div>
        </>
    )
}

export default memo(TableComponent);
