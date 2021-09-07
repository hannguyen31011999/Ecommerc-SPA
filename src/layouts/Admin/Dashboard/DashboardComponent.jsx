import React from 'react'
import checkLoginAdmin from '../../../hoc/checkLoginAdmin';
import CardDashboard from './CardDashboard';

export default function DashboardComponent(props) {
    return (
        <div className="list-card row">
            <CardDashboard />
        </div>
    )
}

// export default checkLoginAdmin(DashboardComponent)