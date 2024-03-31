import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, Badge, Avatar } from '@mui/material';
import { LegendToggleOutlined, Notifications } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { selectNav } from '../../stores/slices/adminNavSlice';
import { selectAuth } from '../../stores/slices/authSlice';

const Header = () => {
    const { displayName } = useSelector(selectNav);
    const { userRole, user } = useSelector(selectAuth);

    let updateUserRole = userRole;

    if (userRole == "ROLE_ADMIN") {
        updateUserRole = "Admin"
    } else if (userRole == "ROLE_FINANCIAL_MANAGER") {
        updateUserRole = "Financial Manager"
    } else if (userRole = "ROLE_LOGISTIC_HANDLER") {
        updateUserRole = "Logistic Handler"
    } else if (userRole = "ROLE_INSTRUCTOR") {
        updateUserRole = "Instructor"
    } else if (userRole = "ROLE_INVENTORY") {
        updateUserRole = "Inventory"
    }

    return (
        <AppBar
            position="static" color="transparent"
            sx={{
                backgroundColor: 'transparent',
                boxShadow: 'none',
            }}
        >
            <Toolbar>
                <Typography variant="h6"
                    marginLeft={{ xs: '0px', md: '250px' }}
                    sx={{
                        flexGrow: 1,
                        color: '#2CA019',
                        fontWeight: 'bold',
                    }}>
                    {displayName} : {updateUserRole} :  <span style={{ color: '#FFAB00' }}>{user.name}</span>
                </Typography>
                <IconButton color="inherit" sx={{ mr: 2 }}>
                    <Badge
                        badgeContent={24}
                        color="primary"
                    >
                        <Notifications sx={{ color: 'green' }} />
                    </Badge>
                </IconButton>
                <IconButton color="inherit">
                    <Avatar />
                </IconButton>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
