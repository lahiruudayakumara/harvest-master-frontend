import { Outlet } from "react-router-dom";
import DashboardLayout from "../../layouts/dashboard";



const InventoryManagerDashboard = () => {
  return (
    <DashboardLayout role="Inventory Manager">
      <Outlet />
    </DashboardLayout>
  );
};

export default InventoryManagerDashboard;