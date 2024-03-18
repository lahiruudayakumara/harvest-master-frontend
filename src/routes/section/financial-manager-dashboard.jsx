import React from 'react'
import DashboardLayout from '../../layouts/dashboard'
import { Outlet } from 'react-router-dom'

const FinancialManagerDashboard = () => {
  return (
    <DashboardLayout role="Financial Manager">
        <Outlet />
    </DashboardLayout>
  )
}

export default FinancialManagerDashboard

