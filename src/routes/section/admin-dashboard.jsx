import React from 'react'
import DashboardLayout from '../../layouts/dashboard'
import { Outlet } from 'react-router-dom';

const AdminDashboard = () => {
  return (
    <DashboardLayout role="Admin">
        <Outlet />
    </DashboardLayout>
  )
}

export default AdminDashboard;