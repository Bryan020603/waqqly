import {
  AppBar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import {
  useAuthActions,
  useAuthIsAuthenticatedSelector,
  useAuthUserAttributesSelector,
  useAuthUserSelector,
} from '@/shared/hooks/useAuthStore';
import { signOut } from 'aws-amplify/auth';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useState } from 'react';
import { PetOwnerNaviItems } from './PetOwnerNavItems';
import { PetWalkerNaviItems } from './PetWalkerNavItems';

export const Navigation = () => {
  const navigate = useNavigate();
  const user = useAuthUserSelector();
  const isAuthenticated = useAuthIsAuthenticatedSelector();
  const userAttributes = useAuthUserAttributesSelector();
  const { setUser, setUserSession, setUserAttributes } = useAuthActions();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isLoggedIn = Boolean(user) && isAuthenticated;

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      await signOut();
      setUser(undefined);
      setUserSession(undefined);
      setUserAttributes(undefined);
      handleClose();
      navigate('/sign-in');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AppBar position="fixed">
      <Toolbar>
        <Typography
          variant="h6"
          noWrap
          component={Link}
          to="/"
          sx={{
            mr: 2,
            fontWeight: 700,
            letterSpacing: '.3rem',
            color: 'inherit',
            textDecoration: 'none',
          }}
        >
          Waqqly
        </Typography>
        {isLoggedIn && (
          <Box sx={{ flexGrow: 1 }}>
            <Box
              component="ul"
              display="flex"
              justifyContent="center"
              alignItems="center"
              sx={{
                listStyle: 'none',
                '&  a': {
                  color: 'inherit',
                  textDecoration: 'none',
                },
              }}
              gap={2}
            >
              <PetOwnerNaviItems />
              <PetWalkerNaviItems />
            </Box>
          </Box>
        )}
        <Box sx={{ marginLeft: 'auto' }}>
          {isLoggedIn && (
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              gap={2}
            >
              <Typography>Hello, {userAttributes?.name}</Typography>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </Box>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};
