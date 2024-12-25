'use client';

import React, { useState } from 'react';
import {
    Box,
    Chip,
    IconButton,
    Menu,
    MenuItem,
    Typography,
    Toolbar,
    AppBar,
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import CallIcon from '@mui/icons-material/Call';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

const drawerWidth = 240;

export default function DashboardLayout({ children }) {
    const [popoverAnchorEl, setPopoverAnchorEl] = useState(null);

    const handlePopoverOpen = (event) => setPopoverAnchorEl(event.currentTarget);
    const handlePopoverClose = () => setPopoverAnchorEl(null);

    return (
        <Box sx={{ display: 'flex' }}>
            {/* App Bar */}
            <AppBar
                position="fixed"
                sx={{
                    width: `calc(100% - ${drawerWidth}px)`,
                    ml: `${drawerWidth}px`,
                }}
            >
                <Toolbar>
                    <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
                        Toolpad Dashboard
                    </Typography>
                    <IconButton color="inherit" onClick={handlePopoverOpen}>
                        <MoreHorizIcon />
                    </IconButton>
                    <Menu
                        anchorEl={popoverAnchorEl}
                        open={Boolean(popoverAnchorEl)}
                        onClose={handlePopoverClose}
                    >
                        <MenuItem onClick={handlePopoverClose}>New call</MenuItem>
                        <MenuItem onClick={handlePopoverClose}>Mark all as read</MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>

            {/* Sidebar (Drawer) */}
            <Drawer
                variant="permanent"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
                }}
            >
                <Toolbar />
                <Box sx={{ overflow: 'auto' }}>
                    <List>
                        <ListItem button>
                            <ListItemIcon>
                                <PersonIcon />
                            </ListItemIcon>
                            <ListItemText primary="Contacts" />
                            <Chip label="7" color="primary" size="small" />
                        </ListItem>
                        <ListItem button>
                            <ListItemIcon>
                                <CallIcon />
                            </ListItemIcon>
                            <ListItemText primary="Calls" />
                        </ListItem>
                    </List>
                </Box>
            </Drawer>

            {/* Main Content */}
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    bgcolor: 'background.default',
                    p: 3,
                }}
            >
                <Toolbar />
                {children}
            </Box>
        </Box>
    );
}
