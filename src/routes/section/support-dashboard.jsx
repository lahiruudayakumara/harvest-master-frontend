import { Outlet } from "react-router-dom";
import DashboardLayout from "../../layouts/dashboard";



const SupportPersonnelDashboard = () => {
  return (
    <DashboardLayout role="Support Personnel">
      <Outlet />
    </DashboardLayout>
  );
};

export default SupportPersonnelDashboard;