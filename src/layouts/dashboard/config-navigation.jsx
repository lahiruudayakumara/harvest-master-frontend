import SpeedIcon from "@mui/icons-material/Speed";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import FilterFramesIcon from "@mui/icons-material/FilterFrames";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import RowingIcon from "@mui/icons-material/Rowing";
import SettingsIcon from "@mui/icons-material/Settings";
import StorefrontIcon from "@mui/icons-material/Storefront";
import QuizIcon from '@mui/icons-material/Quiz';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import HistoryIcon from '@mui/icons-material/History';

const UseNavData = [
  {
    parent: "Financial Manager",
    submenu: [
      { text: "Dashboard", to: "/financial-manager", icon: <SpeedIcon /> },
      { text: "Analytics", to: "/financial-manager/analytics", icon: <TrendingUpIcon /> },
      { text: "Transaction", to: "/financial-manager/transtraction", icon: <AutorenewIcon /> },
      { text: "Payment", to: "/financial-manager/payment", icon: <FlightTakeoffIcon /> },
      { text: "Manage Order", to: "/financial-manager/manage-order", icon: <FilterFramesIcon /> },
      { text: "Support", to: "/financial-manager/support", icon: <SupportAgentIcon /> },
      { text: "Log Activity", to: "/financial-manager/log-activity", icon: <RowingIcon /> },
      { text: "Profile Setting", to: "/financial-manager/profile-setting", icon: <SettingsIcon /> },
    ],
  },

  {
    parent: "Logistic Handler",
    submenu: [
      { text: "Dashboard", to: "/logistic-handler", icon: <SpeedIcon /> },
      { text: "Analytics", to: "/logistic-handler/analytics", icon: <TrendingUpIcon /> },
      { text: "Stocks", to: "/logistic-handler/stocks", icon: <StorefrontIcon /> },
      { text: "Pending orders", to: "/logistic-handler/pending-orders", icon: <PendingActionsIcon /> },
      { text: "Support", to: "/logistic-handler/support", icon: <QuizIcon /> },
      { text: "Log Activity", to: "/logistic-handler/log-activity", icon: <HistoryIcon /> },
      { text: "Profile Setting", to: "/logistic-handler/profile-setting", icon: <SettingsIcon /> },
    ],
  },

  {
    parent: "Inventory Manager",
    submenu: [
      { text: "Dashboard", to: "/inventory-manager", icon: <SpeedIcon /> },
      {
        text: "Add Product",
        to: "/inventory-manager/add-product",
        icon: <TrendingUpIcon />,
      },
    ],
  },

  {
    parent: "ADMIN",
    submenu: [{ text: "Dashboard", to: "/admin", icon: <SpeedIcon /> }],
  },
];

export default UseNavData;
