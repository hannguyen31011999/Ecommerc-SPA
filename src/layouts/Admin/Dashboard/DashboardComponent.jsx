import React from 'react'
import checkLoginAdmin from '../../../hoc/checkLoginAdmin';
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