import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import menu2Fill from '@iconify/icons-eva/menu-2-fill';
// material
import { alpha, styled } from '@mui/material/styles';
import { Box, AppBar, Toolbar, IconButton, Button, Typography, Container } from '@mui/material';
// components
import MobileHidden from '../common/MobileHidden';
//
import Searchbar from './Searchbar';
import AccountPopover from './AccountPopover';
// recoil
import { useRecoilState, useRecoilValue } from 'recoil';
import { isLoggedState, isUserInfoUpdatedState, loggedUserState } from '../../atoms/atoms';

import { NavLogo } from './Logo';

import logo from '../../assets/images/pollar_logo.svg';

import sidebarConfig from './SidebarConfig';
import NavSection from './NavSection';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { checkUserLogged, getLoggedUserId, getLoggedUserInfo } from '../../utils/loggedUser';
import NotificationsPopover from '../notification/NotificationsPopover';
import SearchDrawer from './SearchDrawer';
import GradAnimatedButton from '../common/GradAnimatedButton';
import { getUserInfo } from '../../services/api/UserApi';

// ----------------------------------------------------------------------

const DRAWER_WIDTH = 280;
const APPBAR_MOBILE = 64;
const APPBAR_DESKTOP = 92;

const RootStyle = styled(AppBar)(({ theme }) => ({
  boxShadow: 'none',
  backdropFilter: 'blur(1px)',
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

export default function Navbar({ onOpenSidebar, isFullLayout }) {
  // todo 삭제
  // const [loggedUser, setLoggedUser] = useRecoilState(loggedUserState);
  // 아래로 대체
  const isLogged = useRecoilValue(isLoggedState);
  // const [isUserInfoUpdated, setIsUserInfoUpdated] = useRecoilState(isUserInfoUpdatedState);
  const isUserInfoUpdated = useRecoilValue(isUserInfoUpdatedState);

  // (해결)
  //// 문제점: 새로고침 시 recoil state 날라감 (line 90)
  // JWT 검사로 변경 필요
  const [loggedUserInfo, setLoggedUserInfo] = useState();

  // // 사용자 정보 변경 시 바로바로 반영되게끔 하기 위해 api를 매번 요청
  // const getUserAccountInfo = async () => {
  //   const data = await getUserInfo(getLoggedUserId());
  //   console.log(data);
  //   setLoggedUserInfo(data);
  // };

  useEffect(() => {
    // localStorage에서 정보 가져옴
    const localStorageUserInfo = getLoggedUserInfo();
    // 로그인 상태라면, 사용자 정보를 가져옴
    //? recoil만 사용했을 경우, 새로고침 시 데이터가 초기화되기 때문에, localstorage도 함께 검사
    if (isLogged || checkUserLogged()) {
      // localStorage에서 정보 반영
      setLoggedUserInfo(localStorageUserInfo);
      //// 갱신된 사용자정보 반영 후 check
      //// setIsUserInfoUpdated(false);
    } else {
      // 로그아웃된 상태라면, 사용자 정보 초기화
      setLoggedUserInfo();
    }
    // getUserAccountInfo();
  }, [isLogged, isUserInfoUpdated]); //? 로그아웃 시, 감지를 하기 위해서 recoil을 deps에 추가하는 방식으로 설계함

  return (
    <RootStyle sx={isFullLayout ? { backgroundColor: 'transparent' } : null}>
      <Container maxWidth="lg">
        <ToolbarStyle>
          {/* <MobileHidden width="lgUp">
            <IconButton onClick={onOpenSidebar} sx={{ mr: 1, color: 'text.primary' }}>
              <Icon icon={menu2Fill} />
            </IconButton>
          </MobileHidden> */}

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
                <NavSection navConfig={sidebarConfig} mr={10} />

                <Searchbar />
                <Box sx={{ flexGrow: 1 }} />
                {/* loggedUserId 가 undefined인지 여부에 따라서 Navbar 구성 변경 */}
                {loggedUserInfo ? (
                  <>
                    <NotificationsPopover />
                    <AccountPopover account={loggedUserInfo} />
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
      </Container>
    </RootStyle>
  );
}
