import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, Badge, Avatar } from '@mui/material';
import { Notifications } from '@mui/icons-material';

const Header = ({ page, role, name }) => {
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
                    {page} : {role} :  <span style={{ color: '#FFAB00' }}>{name}</span>
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
