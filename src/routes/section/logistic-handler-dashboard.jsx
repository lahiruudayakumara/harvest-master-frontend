import React from "react";
import DashboardLayout from "../../layouts/dashboard";
import { Outlet } from "react-router-dom";

const LogisticHandlerDashboard = () => {
  return (
    <div>
      <DashboardLayout role="Logistic Handler">
        <Outlet />
      </DashboardLayout>
    </div>
  );
};

export default LogisticHandlerDashboard;
