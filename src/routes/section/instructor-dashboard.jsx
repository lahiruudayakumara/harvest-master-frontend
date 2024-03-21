import DashboardLayout from '../../layouts/dashboard'
import { Outlet } from 'react-router-dom'

const InstructorDashboard = () => {
  return (
    <DashboardLayout role="Instructor">
        <Outlet />
    </DashboardLayout>
  )
}

export default InstructorDashboard