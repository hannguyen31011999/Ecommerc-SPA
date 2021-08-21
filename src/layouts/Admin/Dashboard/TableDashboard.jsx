import React, { useEffect, useState, useRef, useMemo } from 'react'
import { apiWard } from '../../../services/adminApi';
import { Table, Button, Input, Space, Popconfirm } from 'antd';
import { FolderAddOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import ModalComponent from './ModalComponent';
import { useSelector, useDispatch } from 'react-redux'
import * as trans from '../../../redux/Actions/Admin/transpAction';

export default function TableDashboard(props) {
    let [ward, setWard] = useState(useSelector(state => state.TransportReducer.data));
    let [pagination, setPagination] = useState(useSelector(state => state.TransportReducer.pagination));
    let [loading, setLoading] = useState(true);
    const [visible, setVisible] = useState(false);
    let [seach, setSeach] = useState({
        searchText: '',
        searchedColumn: '',
    });
    let searchInput = useRef(null);
    const dispatch = useDispatch();
    useEffect(() => {
        if (!ward.length > 0) {
            setLoading(true);
            apiWard.fetchApiWard(pagination.pageSize).then(res => {
                const result = res.data.data;
                dispatch(trans.listAction(result.data, { ...pagination, total: result.total }));
                setWard(result.data);
                setPagination({ ...pagination, total: result.total });
                setLoading(false);
            }).catch(e => {
            });
        } else {
            setLoading(false);
        }
    }, []);
    useMemo(() => {

    }, [ward, pagination]);
    const onChange = (pagination) => {
        const { current, pageSize } = pagination;
        setLoading(true);
        apiWard.changePagination(current, pageSize).then(res => {
            const result = res.data.data;
            dispatch(trans.listAction(result.data, { ...pagination, total: result.total }));
            setWard(result.data);
            setPagination({ current, pageSize, total: result.total });
            setLoading(false);
        }).catch(e => {

        })
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
    const handleCreate = (e) => {
        console.log(e);
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
                        <Button><i className="fa fa-edit"></i></Button>
                        <Popconfirm
                            placement="bottomRight"
                            title="You want to delete?"
                            onConfirm={handleCreate}
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
            <div className="col-12 col-sm-6 col-xl-3 mb-3">
                <Input.Group compact>
                    <Input.Search size="large" allowClear defaultValue="" placeholder="Seach...." onSearch={handleSeachInput} />
                </Input.Group>
            </div>
            <div className="col-12 col-sm-6 col-xl-9 d-flex justify-content-end">
                <Button type="primary" onClick={() => setVisible(true)} icon={<FolderAddOutlined />} size="large" />
            </div>
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
            <ModalComponent visible={visible} setVisible={setVisible} />
        </>

    )
}
