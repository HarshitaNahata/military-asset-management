import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    IconButton,
    Menu,
    MenuItem,
    Box,
    Divider,
} from '@mui/material';
import { AccountCircle, Menu as MenuIcon } from '@mui/icons-material';
import { logout } from '../../redux/slices/authSlice';

const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);

    const [anchorEl, setAnchorEl] = useState(null);
    const [mobileAnchorEl, setMobileAnchorEl] = useState(null);

    // Menu handling
    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleMobileMenu = (event) => {
        setMobileAnchorEl(event.currentTarget);
    };

    const handleMobileClose = () => {
        setMobileAnchorEl(null);
    };

    // Logout handler
    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
        handleClose();
    };

    return (
        <AppBar position="static" color="primary">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Military Asset Management System
                </Typography>

                {/* Desktop Menu */}
                <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                    <Button color="inherit" component={Link} to="/dashboard">
                        Dashboard
                    </Button>
                    <Button color="inherit" component={Link} to="/purchases">
                        Purchases
                    </Button>
                    <Button color="inherit" component={Link} to="/transfers">
                        Transfers
                    </Button>
                    <Button color="inherit" component={Link} to="/assignments">
                        Assignments
                    </Button>

                    {user && (
                        <>
                            <IconButton
                                size="large"
                                onClick={handleMenu}
                                color="inherit"
                            >
                                <AccountCircle />
                            </IconButton>
                            <Menu
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                <Typography sx={{ px: 2, py: 1 }}>
                                    {user.name} ({user.role})
                                </Typography>
                                <Divider />
                                <MenuItem onClick={handleLogout}>Logout</MenuItem>
                            </Menu>
                        </>
                    )}
                </Box>

                {/* Mobile Menu */}
                <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                    <IconButton
                        size="large"
                        onClick={handleMobileMenu}
                        color="inherit"
                    >
                        <MenuIcon />
                    </IconButton>
                    <Menu
                        anchorEl={mobileAnchorEl}
                        open={Boolean(mobileAnchorEl)}
                        onClose={handleMobileClose}
                    >
                        <MenuItem onClick={() => { navigate('/dashboard'); handleMobileClose(); }}>
                            Dashboard
                        </MenuItem>
                        <MenuItem onClick={() => { navigate('/purchases'); handleMobileClose(); }}>
                            Purchases
                        </MenuItem>
                        <MenuItem onClick={() => { navigate('/transfers'); handleMobileClose(); }}>
                            Transfers
                        </MenuItem>
                        <MenuItem onClick={() => { navigate('/assignments'); handleMobileClose(); }}>
                            Assignments
                        </MenuItem>
                        <Divider />
                        {user && (
                            <MenuItem onClick={handleLogout}>Logout</MenuItem>
                        )}
                    </Menu>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header;