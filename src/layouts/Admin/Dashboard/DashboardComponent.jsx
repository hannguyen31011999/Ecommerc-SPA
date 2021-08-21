import React, { useEffect, useState } from 'react'
import checkLoginAdmin from '../../../hoc/checkLoginAdmin';
import { apiWard, apiAdmin } from '../../../services/adminApi';
import { Table, Button, Input, Space, Row, Col } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import CardDashboard from './CardDashboard';
import TableDashboard from './TableDashboard';

function DashboardComponent(props) {

    return (
        <div className="list-card row">
            <CardDashboard />
            <TableDashboard />
        </div>
    )
}

export default checkLoginAdmin(DashboardComponent)