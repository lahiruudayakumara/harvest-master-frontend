import { useState } from 'react';
import PropTypes from "prop-types";
import { Notifications } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { logout } from 'src/stores/slices/authSlice';
import { useNavigate } from 'react-router-dom';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';


const Header = ({ page, role, name }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [anchorElUser, setAnchorElUser] = useState(null);

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handlelogout = () => {
        dispatch(logout());
        navigate('/login');
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
                    {page} : {role} :  <span style={{ color: '#FFAB00' }}>{name}</span>
                </Typography>

                {/* <IconButton color="inherit" sx={{ mr: 2 }}>
                    <Badge
                        badgeContent={24}
                        color="primary"
                    >
                        <Notifications sx={{ color: 'green' }} />
                    </Badge>
                </IconButton> */}

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
                        <MenuItem onClick={handlelogout}>
                            <Typography textAlign="center">Logout</Typography>
                        </MenuItem>
                    </Menu>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

Header.propTypes = {
    page: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
};

export default Header;
