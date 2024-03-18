import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/home";
import NotFoundPage from "../pages/404";
import LoginPage from "../pages/auth/admin/login";
import FinancialManagerDashboard from "./section/financial-manager-dashboard";
import FinancialManagerPayment from "../pages/financial-manager/financial-manager-payment";
import { InventoryAddProduct } from "../pages/inventory manager/inventory-add-product";
import { AddPostPlan } from "../pages/post-harvest/addPostPlan";
import InventoryManagerDashboard from "./section/Inventory-dashboard";

import { FinancialManagerAccountView } from "../section/financial-manager/account/view";

import { CurrentPostHarvestPlans } from "../pages/post-harvest/currentPostHarvestPlans";
import LogisticHandlerDashboard from "./section/logistic-handler-dashboard";
import LogisticHandlerAccount from "../pages/logistic-handler/logistic-handler-account";
import InventoryManagerDashboardPage from "../pages/inventory manager/inventory-manager-dashboard";

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
        index: true,
        Component: FinancialManagerAccountView,
      },
      {
        path: "payment",
        Component: FinancialManagerPayment,
      },
    ],
  },

  {
    path: "/logistic-handler",
    Component: LogisticHandlerDashboard,
    children: [
      {
        index: true,
        Component: LogisticHandlerAccount,
      },
    ],
  },

  {
    path: "/inventory-manager",
    Component: InventoryManagerDashboard,
    children: [
      {
        index: true,
        Component: InventoryManagerDashboardPage,
      },
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
