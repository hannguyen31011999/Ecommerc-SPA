import React, { useEffect, useState, useRef, useMemo } from 'react'
import { Table, Button, Input, Space, Popconfirm } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux'
import * as trans from '../../../redux/Actions/Admin/transpAction';
import ModalComponent from './ModalComponent';
import { ToastContainer } from 'react-toastify';
import ModalEditComponent from './ModalEditComponent';

export default function TableDashboard(props) {
    let ward = useSelector(state => state.TransportReducer.data);
    let pagination = useSelector(state => state.TransportReducer.pagination);
    let loading = useSelector(state => state.TransportReducer.loading);
    let [visiable, setVisiable] = useState(false);
    let [seach, setSeach] = useState({
        searchText: '',
        searchedColumn: '',
    });
    let searchInput = useRef(null);
    const dispatch = useDispatch();
    useEffect(() => {
        if (Array.isArray(ward) && !ward.length > 0) {
            dispatch(trans.transAction(pagination.pageSize));
        } else {
            trans.loadingAct(false);
        }
    }, [dispatch]);
    console.log(987);
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
    const handleSeachInput = (values) => {
        if (values) {

        }
    }
    const handleEdit = (id) => {
        dispatch(trans.editWardAction(id));
    }
    const handleDetele = (id) => {
        dispatch(trans.loadingAct(true));
        dispatch(trans.deleteWardAction(id));
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
            title: 'District_id',
            dataIndex: 'district_id',
            key: 'district_id',
            ...getColumnSearchProps('district_id')
        },
        {
            title: 'Ward Name',
            dataIndex: 'ward_name',
            key: 'ward_name',
            ...getColumnSearchProps('ward_name'),
            sorter: (a, b) => a.ward_name.length - b.ward_name.length,
            sortDirections: ['descend', 'ascend']
        },
        {
            title: 'Price',
            dataIndex: 'transport_price',
            key: 'transport_price',
            ...getColumnSearchProps('transport_price'),
            sorter: (a, b) => a.transport_price - b.transport_price,
            sortDirections: ['descend', 'ascend']
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
            <ToastContainer />
            <div className="col-12 col-sm-6 col-xl-3 mb-3">
                <Input.Group compact>
                    <Input.Search size="default" allowClear defaultValue="" placeholder="Seach...." onSearch={handleSeachInput} />
                </Input.Group>
            </div>
            <ModalComponent />
            <ModalEditComponent />
            <div className="col-12">
                < Table
                    columns={columns}
                    dataSource={ward}
                    pagination={pagination}
                    onChange={onChange}
                    loading={loading}
                    rowKey="id"
                />
            </div>
        </>

    )
}
