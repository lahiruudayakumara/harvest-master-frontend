import React from 'react'
import DashboardLayout from '../../layouts/dashboard'
import { Outlet } from 'react-router-dom';

const AdminDashboard = () => {
  return (
    <DashboardLayout>
        <Outlet />
    </DashboardLayout>
  )
}

export default AdminDashboard;