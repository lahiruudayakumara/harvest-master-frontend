import React from 'react';
import { Box, Typography, List, ListItem, ListItemText, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';

import SpeedIcon from '@mui/icons-material/Speed';
import Logo from '../../components/logo';
import UseNavData from './config-navigation';

const NavMenu = ({ role }) => {
    const theme = useTheme();

    const menuItems = UseNavData.find(item => item.parent === role );
    return (
        <Box
            display={{ xs: 'none', sm: 'block' }}
            sx={{
                backgroundColor: '#2CA019', // Green color
                width: '100%',
                height: '100%',
                padding: 2, // Using directly, equivalent to theme.spacing(2)
                position: 'fixed',
                top: 0,
                left: 0,
                overflowY: 'auto',
                [theme.breakpoints.up('md')]: {
                    width: '250px',
                },
            }}
        >
            <Logo sx={{ width: '150px', height: 'auto' }} />

            <List>
                {menuItems.submenu.map((item, index) => {
                    const isActive = location.pathname === item.to;

                    return (
                        <ListItem
                            key={index}
                            button
                            component={Link}
                            to={item.to}
                            sx={{
                                '&:hover': {
                                    backgroundColor: isActive ? 'rgba(217, 217, 217, 0.25)' : 'rgba(217, 217, 217, 0.25)', // Change hover color based on active state
                                    borderRadius: '5px'
                                }
                            }}
                        >
                            <span style={{ color: 'white', marginRight: '8px' }}>{item.icon && item.icon}</span>
                            <ListItemText primary={item.text} style={{ color: 'white' }} />
                        </ListItem>
                    );
                })}
            </List>
        </Box>
    );
};

export default NavMenu;
