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
import { PostHarvestDetails } from "../pages/post-harvest/postHarvestDetails";
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
import AdminDashboard from "./section/admin-dashboard";
import AdminAccount from "../pages/admin/admin-account";
import Inquiries from "src/pages/instructor/inquiries";
import Solution from "src/pages/instructor/solution";
import LogisticHandlerLogActivity from "src/pages/logistic-handler/logistic-handler-log-activity";
import { MainView } from "./section/main-view";

import SupportDeskSolutions from "src/pages/support-desk/support-solutions-main";
import { WeatherView } from "src/pages/post-harvest/weatherDetails";
import HarvestPlans from "../pages/harvetPlans";
import PreHarvestPlans from "../pages/pre-harvest/preHarvestPlans";
import MyPreHarvestPlans from "../pages/pre-harvest/myPreHarvestPlans";
import PreHarvestPlanDetails from "../pages/pre-harvest/preHarvestPlanDetails";
import InquriesAdd from "src/pages/Inquiries/inquiriesAdd";
import InquiriesView from "src/pages/Inquiries/inquiriesView";

import { ProductInventory } from "src/pages/inventory product/inventory-main";
import PostHarvestHome from "src/pages/post-harvest/post-harvest-home";
import MyPostHarvestPlans from "src/pages/post-harvest/post-harvest-planlist";
import SupportPersonnelDashboard from "./section/support-dashboard";
import SupportTableView from "src/section/support-desk/support-table";
import { SupportAddSolution } from "src/section/support-desk/add-support-solution";
import OrderView from "src/pages/cart/order-view";
import FaqView from "src/section/support-desk/faq-menue";
import { CartView } from "src/pages/cart/cart-main";
import { WishListView } from "src/pages/wishList/wishlist-main";
import AddDiscounts from "src/components/cart/add-discounts";
import SupportDeskDashboard from "src/section/support-desk/support-desk-dashboard-view";
import FarmerProfilePage from "src/pages/profiles/Farmer";
import StockCartView from "src/pages/paddystock-cart/stock-cart-view";
import { AboutPage } from "src/pages/about-us/aboutus";
import FinancialManagerRefund from "src/pages/financial-manager/financial-manager-refund";
import DiscountTable from "src/components/cart/view-discounts";


export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainView,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "profile-farmer",
        Component: FarmerProfilePage,
      },
      {
        path: "communitymarket",
        Component: CommunityMarket,
      },
      {
        path: "paddystockcart",
        Component: StockCartView,
      },
      {
        path: "/postharvestplans",
        Component: MyPostHarvestPlans,
      },
      {
        path: "/cart",
        Component: CartView,
      },
      {
        path: "/order-view",
        Component: OrderView,
      },
      {
        path: "/wishlist",
        Component: WishListView,
      },
      {
        path: "my-requests",
        Component: SupportDeskSolutions,
      },
      {
        path: "harvest-plans",
        Component: HarvestPlans,
      },
      {
        path: "post-harvest-plans",
        Component: PostHarvestHome,
      },
      {
        path: "pre-harvest-plans",
        Component: PreHarvestPlans,
      },
      {
        path: "my-pre-harvest-plans",
        Component: MyPreHarvestPlans,
      },
      {
        path: "pre-harvest-plan-details/:fieldId",
        Component: PreHarvestPlanDetails,
      },
      {
        path: "inquiries-Add",
        Component: InquriesAdd,
      },
      {
        path: "inquiries-View",
        Component: InquiriesView,
      },

      {
        path: "Inventory",
        Component: ProductInventory,
      },
      {
         path: "about",
         Component: AboutPage,
      },
      {
        path: "/discount",
        Component: AddDiscounts,
      },
      {
        path: "/viewDiscounts",
        Component: DiscountTable,
      },
    ],
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
    path: "/admin",
    Component: AdminDashboard,
    children: [
      {
        index: true,
        Component: AdminAccount,
      },
    ],
  },
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
        path: "refunds",
        Component: FinancialManagerRefund,
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
        Component: LogisticHandlerLogActivity,
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
    path: "/support-personnel",
    Component: SupportPersonnelDashboard,
    children: [
      {
        index: true,
        Component: SupportDeskDashboard,
      },
      {
        path: "add-solution",
        Component: SupportAddSolution,
      },
      {
        path: "faq-menue",
        Component: FaqView,
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
    path: "/supportdesk",
    Component: SupportDesk,
  },
  {
    path: "/postharvestdetail/:id",
    Component: PostHarvestDetails,
  },
  {
    path: "/weather",
    Component: WeatherView,
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
      },
      {
        path: "inquiries",
        Component: Inquiries,
      },
      {
        path: "solutions",
        Component: Solution,
      },
      
    ],
    
  },
  
  
]);
