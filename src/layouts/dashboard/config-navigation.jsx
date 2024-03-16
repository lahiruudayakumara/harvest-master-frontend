import SpeedIcon from '@mui/icons-material/Speed';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import FilterFramesIcon from '@mui/icons-material/FilterFrames';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import RowingIcon from '@mui/icons-material/Rowing';
import SettingsIcon from '@mui/icons-material/Settings';

const UseNavData = [
    {
        parent: 'Financial Manager',
        submenu: [
            { text: 'Dashboard', to: '/financial-manager', icon: <SpeedIcon /> },
            { text: 'Analytics', to: '/financial-manager/analytics', icon: <TrendingUpIcon /> },
            { text: 'Transaction', to: '/financial-manager/transaction', icon: <AutorenewIcon /> },
            { text: 'Payment', to: '/financial-manager/payment', icon: <FlightTakeoffIcon /> },
            { text: 'Manage Order', to: '/financial-manager/manage-order', icon: <FilterFramesIcon /> },
            { text: 'Support', to: '/financial-manager/support', icon: <SupportAgentIcon /> },
            { text: 'Log Activity', to: '/financial-manager/log-activity', icon: <RowingIcon /> },
            { text: 'Profile Setting', to: '/financial-manager/profile-setting', icon: <SettingsIcon /> },           
        ]
    },
    {
        parent: 'ADMIN',
        submenu: [
            { text: 'Dashboard', to: '/admin', icon: <SpeedIcon /> },
        ]
    },
];

export default  UseNavData;
