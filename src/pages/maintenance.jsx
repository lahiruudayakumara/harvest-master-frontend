import React from 'react'
import { Helmet } from 'react-helmet'
import MaintenanceView from '../section/error/maintenance-view'

const Maintenance = () => {
    return (
        <>
            <Helmet>
                <title>This page Under Maintenance</title>
            </Helmet>
            <MaintenanceView />
        </>
    )
}

export default Maintenance