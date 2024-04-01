import { useState } from 'react';

import { AppBar, Toolbar, IconButton, Typography, Badge, Avatar, Tooltip, Box, Menu, MenuItem } from '@mui/material';
import { Notifications } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { logout } from '../../stores/slices/authSlice';

const Header = ({ page, role, name }) => {
    const dispatch = useDispatch();
    const [anchorElUser, setAnchorElUser] = useState(null);

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
        dispatch(logout());
    };

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

                <Box sx={{ flexGrow: 0 }}>
                    <Tooltip title="Open settings">
                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                            <Avatar alt={name} src="/static/images/avatar/2.jpg" />
                        </IconButton>
                    </Tooltip>
                    <Menu
                        sx={{ mt: '45px' }}
                        id="menu-appbar"
                        anchorEl={anchorElUser}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorElUser)}
                        onClose={handleCloseUserMenu}
                    >
                        <MenuItem onClick={handleCloseUserMenu}>
                            <Typography textAlign="center">Logout</Typography>
                        </MenuItem>
                    </Menu>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
