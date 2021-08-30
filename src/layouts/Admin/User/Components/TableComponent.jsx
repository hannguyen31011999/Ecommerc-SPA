import React, { useEffect, useState, useRef, memo, useCallback } from 'react'
import { Table, Button, Input, Space, Popconfirm, Switch } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux'
import * as trans from '../modules/Actions';
import moment from 'moment';
import ModalEdit from '../Modals/ModalEdit';

export default function TableComponent(props) {
    let user = useSelector(state => state.UserReducer.data);
    let pagination = useSelector(state => state.UserReducer.pagination);
    let loading = useSelector(state => state.UserReducer.loading);
    let [seach, setSeach] = useState({
        searchText: '',
        searchedColumn: '',
    });
    let searchInput = useRef(null);
    const dispatch = useDispatch();
    useEffect(() => {
        if (Array.isArray(user) && !user.length > 0) {
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
        dispatch(trans.deleteUserAction(id));
    }
    const handleChangeStatus = (id, isBool) => {
        console.log(isBool);
    }
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            width: '6%',
            ...getColumnSearchProps('id'),
            sorter: (a, b) => a.id - b.id,
            sortDirections: ['descend', 'ascend']
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            width: "18%",
            ...getColumnSearchProps('email'),
            sorter: (a, b) => a.email.length - b.email.length,
            sortDirections: ['descend', 'ascend']
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            width: "18%",
            ...getColumnSearchProps('name'),
            sorter: (a, b) => a.name.length - b.name.length,
            sortDirections: ['descend', 'ascend']
        },
        {
            title: 'Gender',
            dataIndex: 'gender',
            key: 'gender',
            width: "8%",
            ...getColumnSearchProps('gender'),
            sorter: (a, b) => a.gender.length - b.gender.length,
            sortDirections: ['descend', 'ascend'],
            render: (text, data) => {
                return (
                    <span>{data.gender === 1 ? 'Nam' : 'Nữ'}</span>
                )
            }
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone',
            width: "10%",
            ...getColumnSearchProps('phone'),
            sorter: (a, b) => a.phone.length - b.phone.length,
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
            width: "15%",
            ...getColumnSearchProps('address'),
            sorter: (a, b) => a.address.length - b.address.length,
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            width: "5%",
            ...getColumnSearchProps('status'),
            sorter: (a, b) => a.status.length - b.status.length,
            sortDirections: ['descend', 'ascend'],
            render: (text, data) => {
                return (
                    data.status == 1 ?
                        <Switch
                            checkedChildren="Block"
                            unCheckedChildren="Open"
                            defaultChecked={true}
                            onClick={() => handleChangeStatus(data.id, false)} />
                        :
                        <Switch
                            checkedChildren="Block"
                            unCheckedChildren="Open"
                            defaultChecked={false}
                            onClick={() => handleChangeStatus(data.id, true)} />
                )
            }
        },
        {
            title: 'Created',
            dataIndex: 'created_at',
            key: 'created_at',
            width: "10%",
            ...getColumnSearchProps('created_at'),
            sorter: (a, b) => a.created_at.length - b.created_at.length,
            sortDirections: ['descend', 'ascend'],
            render: (text) => {
                return (
                    <span> {moment(text.created_at).format('DD-M-YYYY')}</span>
                )
            }
        },
        {
            title: 'Action',
            key: 'action',
            width: "15%",
            render: (text, data) => {
                return (
                    <Space size="middle">
                        <Button onClick={() => { handleEdit(data.id) }}><i className="fa fa-edit"></i></Button>
                        <Popconfirm
                            placement="bottomRight"
                            title="You want to delete?"
                            onConfirm={() => { handleDetele(data.id) }}
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
            {user.length > 0 ? <ModalEdit /> : ''}
            <div className="col-12">
                < Table
                    columns={columns}
                    dataSource={user}
                    pagination={pagination}
                    onChange={onChange}
                    loading={loading}
                    rowKey="id"
                />
            </div>
        </>
    )
}
