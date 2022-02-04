import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import menu2Fill from '@iconify/icons-eva/menu-2-fill';
// material
import { alpha, styled } from '@mui/material/styles';
import { Box, AppBar, Toolbar, IconButton, Button, Typography } from '@mui/material';
// components
import MobileHidden from '../common/MobileHidden';
//
import Searchbar from './Searchbar';
import AccountPopover from './AccountPopover';
import LanguagePopover from './LanguagePopover';
import NotificationsPopover from './NotificationsPopover';
// recoil
import { useRecoilState } from 'recoil';
import { loggedUserState } from '../../atoms/atoms';

import { NavLogo } from './Logo';

import logo from '../../assets/images/pollar_logo.svg';

import sidebarConfig from './SidebarConfig';
import NavSection from './NavSection';
import { Link } from 'react-router-dom';

// ----------------------------------------------------------------------

const DRAWER_WIDTH = 280;
const APPBAR_MOBILE = 64;
const APPBAR_DESKTOP = 92;

const RootStyle = styled(AppBar)(({ theme }) => ({
  boxShadow: 'none',
  backdropFilter: 'blur(6px)',
  WebkitBackdropFilter: 'blur(6px)', // Fix on Mobile
  backgroundColor: alpha(theme.palette.background.default, 0.72),
  // [theme.breakpoints.up('lg')]: {
  //   width: `calc(100% - ${DRAWER_WIDTH + 1}px)`,
  // },
}));

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
  minHeight: APPBAR_MOBILE,
  backgroundColor: 'transparent',
  [theme.breakpoints.up('lg')]: {
    minHeight: APPBAR_DESKTOP,
    padding: theme.spacing(0, 5),
  },
}));

// ----------------------------------------------------------------------

Navbar.propTypes = {
  onOpenSidebar: PropTypes.func,
};

export default function Navbar({ onOpenSidebar }) {
  const [loggedUser, setLoggedUser] = useRecoilState(loggedUserState);
  // todo 문제점: 새로고침 시 recoil state 날라감 (line 90)
  // JWT 검사로 변경 필요

  return (
    <RootStyle>
      <ToolbarStyle>
        <MobileHidden width="lgUp">
          <IconButton onClick={onOpenSidebar} sx={{ mr: 1, color: 'text.primary' }}>
            <Icon icon={menu2Fill} />
          </IconButton>
        </MobileHidden>

        <Box sx={{ flexGrow: 1 }}>
          <AppBar
            position="static"
            sx={{
              boxShadow: 'none',
              backgroundColor: 'transparent',
            }}
          >
            <Toolbar sx={{ backgroundColor: 'transparent' }}>
              <NavLogo component={Link} to="/">
                {/* <NavIcon /> */}
                <Box component="img" src={logo} sx={{ width: 35, height: 35 }} />
                <Typography variant="h3" sx={{ pl: 1, pr: 2, fontStyle: 'bold' }}>
                  Pollar
                </Typography>
              </NavLogo>
              <NavSection navConfig={sidebarConfig} />

              <Searchbar />
              <Box sx={{ flexGrow: 1 }} />
              {loggedUser.userId ? (
                <>
                  <NotificationsPopover />
                  <AccountPopover />
                </>
              ) : (
                <>
                  <Button href="/users/login" variant="text" color="primary">
                    Login
                  </Button>
                  <Button href="/users/signup" variant="contained">
                    Sign Up
                  </Button>
                </>
              )}
            </Toolbar>
          </AppBar>
        </Box>
      </ToolbarStyle>
    </RootStyle>
  );
}
