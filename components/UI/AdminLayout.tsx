'use client';
import '@/lib/polyfills/globals'; // Must be the first import



import React, { useState, ReactNode, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  Menu,
  MenuItem,
  Tooltip,
  useMediaQuery,
  useTheme,
  Button
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Business as BusinessIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
  ChevronLeft as ChevronLeftIcon,
  AccountCircle as AccountCircleIcon,
  Email as EmailIcon,
  Handshake as HandshakeIcon,
  Newspaper as NewspaperIcon,
  Description as DescriptionIcon,
  Groups as GroupsIcon
} from '@mui/icons-material';

const drawerWidth = 240;

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  // Use dynamic import for auth to prevent static generation issues
  const [authState, setAuthState] = useState<{user: any, logout: () => Promise<void>}>({
    user: null,
    logout: async () => {}
  });
  
  // Load auth dynamically on the client side only
  useEffect(() => {
    const loadAuth = async () => {
      try {
        // Dynamic import of the auth context
        const { useAuth } = await import('@/lib/context/auth-context');
        // Use the hook inside the effect
        const auth = useAuth();
        setAuthState({
          user: auth.user,
          logout: auth.logout
        });
      } catch (error) {
        console.error('Failed to load auth:', error);
      }
    };
    
    loadAuth();
  }, []);
  
  const router = useRouter();
  const pathname = usePathname();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const [open, setOpen] = useState(!isMobile);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  
  // No authentication checks needed for admin routes
  
  const handleDrawerToggle = () => {
    setOpen(!open);
  };
  
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  
  const handleLogout = async () => {
    handleMenuClose();
    await authState.logout();
    router.push('/');
  };
  
  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/admin/dashboard' },
    { text: 'Sponsors', icon: <BusinessIcon />, path: '/admin/sponsors' },
    { text: 'Endorsements', icon: <HandshakeIcon />, path: '/admin/endorsements' },
    { text: 'Students', icon: <PeopleIcon />, path: '/admin/students' },
    { text: 'Media Partners', icon: <NewspaperIcon />, path: '/admin/media-partners' },
    { text: 'NRC Applications', icon: <DescriptionIcon />, path: '/admin/nrc-applications' },
    { text: 'Partners', icon: <GroupsIcon />, path: '/admin/partners' },
    { text: 'Messages', icon: <EmailIcon />, path: '/admin/messages' },
    { text: 'Settings', icon: <SettingsIcon />, path: '/admin/settings' },
  ];
  
  return (
    <Box sx={{ display: 'flex' }}>
      {/* App Bar */}
      <AppBar
        position="fixed"
        sx={{
          zIndex: theme.zIndex.drawer + 1,
          transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          ...(open && {
            marginLeft: drawerWidth,
            width: `calc(100% - ${drawerWidth}px)`,
            transition: theme.transitions.create(['width', 'margin'], {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
          }),
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerToggle}
            edge="start"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            NESA Africa Admin
          </Typography>
          
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button 
              color="inherit" 
              component={Link} 
              href="/"
              sx={{ mr: 2, display: { xs: 'none', sm: 'block' } }}
            >
              View Site
            </Button>
            
            <Tooltip title="Account settings">
              <IconButton
                onClick={handleMenuOpen}
                size="small"
                sx={{ ml: 2 }}
                aria-controls={Boolean(anchorEl) ? 'account-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={Boolean(anchorEl) ? 'true' : undefined}
              >
                <Avatar sx={{ width: 32, height: 32 }}>
                  A
                </Avatar>
              </IconButton>
            </Tooltip>
          </Box>
          
          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <MenuItem onClick={handleMenuClose}>
              <ListItemIcon>
                <AccountCircleIcon fontSize="small" />
              </ListItemIcon>
              Profile
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>
              <ListItemIcon>
                <SettingsIcon fontSize="small" />
              </ListItemIcon>
              Settings
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <LogoutIcon fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      
      {/* Drawer */}
      <Drawer
        variant={isMobile ? 'temporary' : 'persistent'}
        open={open}
        onClose={isMobile ? handleDrawerToggle : undefined}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto', mt: 2 }}>
          {!isMobile && (
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', px: 1 }}>
              <IconButton onClick={handleDrawerToggle}>
                <ChevronLeftIcon />
              </IconButton>
            </Box>
          )}
          
          <List>
            {menuItems.map((item) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton
                  component={Link}
                  href={item.path}
                  selected={pathname === item.path}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
      
      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1, p: 0 }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};

export default AdminLayout;