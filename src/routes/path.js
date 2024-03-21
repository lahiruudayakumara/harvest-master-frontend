import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/home";
import NotFoundPage from "../pages/404";
import LoginPage from "../pages/auth/admin/login";
import FinancialManagerDashboard from "./section/financial-manager-dashboard";
import FinancialManagerPayment from "../pages/financial-manager/financial-manager-payment";
import { InventoryAddProduct } from "../pages/inventory manager/inventory-add-product";
import { AddPostPlan } from "../pages/post-harvest/addPostPlan";
import InventoryManagerDashboard from "./section/Inventory-dashboard";
import { CurrentPostHarvestPlans } from "../pages/post-harvest/currentPostHarvestPlans";
import { PostHarvestDetails} from "../pages/post-harvest/postHarvestDetails";
import { CommunityMarket } from "../pages/paddy-inventory/community-market";
import LogisticHandlerDashboard from "./section/logistic-handler-dashboard";
import LogisticHandlerAccount from "../pages/logistic-handler/logistic-handler-account";
import InventoryManagerDashboardPage from "../pages/inventory manager/inventory-manager-dashboard";
import FinancialManagerAccount from "../pages/financial-manager/financial-manager-account";
import FinancialManagerTranstraction from "../pages/financial-manager/financial-manager-transtraction";
import Maintenance from "../pages/maintenance";
import Cart from "../pages/cart/Cart";
import CartItem from "../components/cart/CartItem";
import LogisticHandlerPendingOrders from "../pages/logistic-handler/logistic-handler-pending-orders";
import FinancialManagerManageOrder from "../pages/financial-manager/financial-manager-manage-order";
import SupportDesk from "../pages/support-desk/support-desk-main";
import InstructorDashboard from "./section/instructor-dashboard";
import InstructorAccount from "../pages/instructor/instructor-account";

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
        Component: FinancialManagerAccount,
      },
      {
        path: "payment",
        Component: FinancialManagerPayment,
      },
      {
        path: "transtraction",
        Component: FinancialManagerTranstraction,
      },
      {
        path: "manage-order",
        Component: FinancialManagerManageOrder,
      },
      {
        path: "support",
        Component: Maintenance,
      },
      {
        path: "profile-setting",
        Component: Maintenance,
      },
      {
        path: "log-activity",
        Component: Maintenance,
      },
      {
        path: "analytics",
        Component: Maintenance,
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
      {
        path: "analytics",
        Component: Maintenance,
      },
      {
        path: "stocks",
        Component: Maintenance,
      },
      {
        path: "pending-order",
        Component: LogisticHandlerPendingOrders,
      },
      {
        path: "support",
        Component: Maintenance,
      },
      {
        path: "log-activity",
        Component: Maintenance,
      },
      {
        path: "profile-setting",
        Component: Maintenance,
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
  {
    path: "/cart",
    Component:Cart,
  },
  {
    path: "/supportdesk",
    Component: SupportDesk,
  },
  {
    path: "/postharvestdetail",
    Component: PostHarvestDetails,
  },
  {
    path: "/communitymarket",
    Component: CommunityMarket,
  },
  {
    path: "/instructor",
    Component: InstructorDashboard,
    children: [
      {
        index: true,
        Component: InstructorAccount,
      }
    ]
  }
]);
