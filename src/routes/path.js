import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import NotFoundPage from "../pages/404";
import LoginPage from "../pages/auth/admin/login";
import FinancialManagerDashboard from "./section/financial-manager-dashboard";
import FinancialManagerPayment from "../pages/financial-manager/financial-manager-payment";
import { InventoryAddProduct } from "../pages/inventory manager/inventory-add-product";
import { AddPostPlan } from "../pages/post-harvest/addPostPlan";
import InventoryManagerDashboard from "./section/Inventory-dashboard";
import { CurrentPostHarvestPlans } from "../pages/post-harvest/currentPostHarvestPlans";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
  },
  // {
  //     path: "/farmer",
  //     children: [
  //         {
  //             index: true,
  //             Component: Home,
  //         },

  //     ]
  // },
  // {
  //     path: "/buyer",
  //     children: [
  //         {
  //             index: true,
  //             Component: Home,
  //         },
  //     ]
  // },
  // {
  //     path: "/admin",
  //     children: [
  //         {
  //             index: true,
  //             Component: Home,
  //         },
  //     ]
  // },
  {
    path: "/financial-manager",
    Component: FinancialManagerDashboard,
    children: [
      {
        path: "payment",
        Component: FinancialManagerPayment,
      },
    ],
  },
  {
    path: "/inventory-manager",
    Component: InventoryManagerDashboard,
    children: [
      {
        path: "add-product",
        Component: InventoryAddProduct,
      },
    ],
  },
  {
    path: "/login",
    Component: LoginPage,
  },
  {
    path: "*",
    Component: NotFoundPage,
  },
  {
    path: "/postharvest",
    Component: AddPostPlan,
  },

  {
    path: "/postharvestplans",
    Component: CurrentPostHarvestPlans,
  },
]);
