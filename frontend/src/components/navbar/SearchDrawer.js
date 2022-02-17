import { useState } from 'react';
import { Icon } from '@iconify/react';
import searchFill from '@iconify/icons-eva/search-fill';
import {
  Box,
  Input,
  Chip,
  Typography,
  Avatar,
  Button,
  InputAdornment,
  IconButton,
  MenuItem,
  FormControl,
  Select,
  Stack,
  Drawer,
} from '@mui/material';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import ImageIcon from '@mui/icons-material/Image';
import { Link } from 'react-router-dom';
import { styled, alpha } from '@mui/material/styles';
import {
  getUserSearchPage,
  getUserSearchBar,
  getFeedSearchBar,
} from '../../services/api/SearchApi';
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { textAlign } from '@mui/system';
const APPBAR_MOBILE = 64;
const APPBAR_DESKTOP = 92;

const SearchbarStyle = styled('div')(({ theme }) => ({
  top: 0,
  left: 0,
  zIndex: 99,
  width: '100%',
  display: 'flex',
  position: 'absolute',
  alignItems: 'center',
  height: APPBAR_MOBILE,
  backdropFilter: 'blur(6px)',
  WebkitBackdropFilter: 'blur(6px)', // Fix on Mobile
  padding: theme.spacing(0, 3),
  boxShadow: theme.customShadows.z8,
  backgroundColor: `${alpha(theme.palette.background.default, 0.72)}`,
  [theme.breakpoints.up('md')]: {
    height: APPBAR_DESKTOP,
    padding: theme.spacing(0, 5),
  },
}));

//------------------------------------------------------------
export default function SearchDrawer({ user, isUserLogged }) {
  const navigate = useNavigate();
  const location = useLocation();

  // api data
  const [param, setParam] = useState({
    userId: '',
    searchInfo: '',
  });
  // 검색 옵션
  const [option, setOption] = useState(1);
  // open
  const [state, setState] = useState({
    top: false,
  });

  //옵션 선택
  const handleChange = (event) => {
    setOption(event.target.value);
    setSearchList([]);
  };

  //검색바 정보
  const [searchList, setSearchList] = useState([]);

  //검색어
  const handleInput = (e) => {
    setParam({
      userId: user.user.userId,
      searchInfo: e.target.value,
    });
  };

  //검색한 결과 페이지 이동
  const handleSearch = async () => {
    if (option === 1) {
      const data = await getUserSearchPage(param);
      // console.log(data);
    }

    toggleDrawer('top', false);
  };

  //검색바
  const getList = async () => {
    if (option === 1) {
      const data = await getUserSearchBar(param);

      setSearchList(data.searchUserList);
    } else if (option === 2) {
      const data = await getFeedSearchBar(param);
      setSearchList(data.feedList);
    } else {
      setSearchList([]);
    }
  };

  useEffect(() => {
    getList();
  }, [param.searchInfo]);

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const UserNavigate = (e) => {
    if (location.pathname.length == 15) {
      var path = location.pathname.slice(0, 15);
      if (path === '/users/profile/') {
        navigate(e, { replace: true });
      } else {
        navigate(`/users/profile/${e}`, { replace: true });
      }
    } else {
      navigate(`/users/profile/${e}`, { replace: true });
    }
  };

  const FeedNavigate = (e) => {
    if (location.pathname.length == 7) {
      var path = location.pathname.slice(0, 7);
      if (path === '/polls/') {
        navigate(e, { replace: true });
      } else {
        navigate(e, { replace: true });
      }
    } else {
      navigate(`/poll/${e}`, { replace: true });
    }
  };

  const userlist = () => (
    <>
      {searchList.length > 0 && (
        <>
          {searchList.map((user, index) => (
            <Button
              sx={{
                width: 'auto',
                justifyContent: 'flex-start',
                marginLeft: 20,
                marginRight: 10,
                marginTop: 0.1,
                marginBottom: 0.1,
              }}
              onClick={() => {
                setState({ top: false });
                UserNavigate(user.userId);
              }}
              key={index}
            >
              <Avatar
                src={user.userProfilePhoto}
                alt="Profile Photo"
                shadow="xl"
                sx={{
                  width: '2rem',
                  height: '2rem',
                  border: 1,
                  borderColor: '#c5cae9',
                }}
              />
              <Typography component="span" variant="overline">
                &nbsp;&nbsp;{user.userNickname}
              </Typography>
              <Typography component="span" variant="caption" color="text.secondary">
                &nbsp;&nbsp;@{user.userId}
              </Typography>
            </Button>
          ))}
        </>
      )}
    </>
  );
  const feedlist = () => (
    <>
      {searchList.length > 0 && (
        <>
          {searchList.map((vote, index) => (
            <Button
              key={index}
              sx={{
                width: 'auto',
                justifyContent: 'flex-start',
                marginLeft: 20,
                marginRight: 10,
              }}
              onClick={() => {
                setState({ top: false });
                FeedNavigate(vote.voteId);
              }}
              key={index}
            >
              <Stack sx={{ justifyContent: 'center', alignItems: 'center', width: 80 }}>
                {vote.userAnonymousType ? (
                  <>
                    <Avatar
                      shadow="xl"
                      sx={{
                        width: '2rem',
                        height: '2rem',
                        border: 1,
                        borderColor: '#c5cae9',
                      }}
                    >
                      ?
                    </Avatar>

                    <Typography
                      sx={{
                        fontSize: '8px',
                        textAlign: 'center',
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingRight: 1,
                      }}
                      color="text.secondary"
                    >
                      &nbsp;&nbsp;익명 투표
                    </Typography>
                  </>
                ) : (
                  <>
                    <Avatar
                      src={vote.userProfilePhoto}
                      shadow="xl"
                      sx={{
                        width: '2rem',
                        height: '2rem',
                        border: 1,
                        borderColor: '#c5cae9',
                      }}
                    />
                    <Typography
                      sx={{
                        fontSize: '8px',
                        textAlign: 'center',
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingRight: 1,
                      }}
                      color="text.secondary"
                    >
                      &nbsp;&nbsp;{vote.author}
                    </Typography>
                  </>
                )}
              </Stack>
              {vote.voteType ? (
                <TextSnippetIcon sx={{ fontSize: '1.5rem', ml: 1 }} />
              ) : (
                <ImageIcon sx={{ fontSize: '1.5rem', ml: 2 }} />
              )}
              <Typography component="span" variant="subtitle1">
                &nbsp;&nbsp;{vote.voteName}&nbsp;&nbsp;
              </Typography>
              {vote.voteCategoriesName.map((item, index) => (
                <Chip label={item} sx={{ ml: 0.5 }} key={index}/>
              ))}
            </Button>
          ))}
        </>
      )}
    </>
  );

  return (
    <Stack>
      <IconButton onClick={toggleDrawer('top', true)}>
        <Icon icon={searchFill} width={20} height={20} />
      </IconButton>
      <Drawer anchor="top" open={state['top']} onClose={toggleDrawer('top', false)}>
        <Box
          sx={{ width: 'auto', height: 100 }}
          role="presentation"
          onClick={toggleDrawer('top', false)}
          onKeyDown={toggleDrawer('top', false)}
        ></Box>
        <SearchbarStyle>
          <Box sx={{ width: 180, padding: 2, alignItems: 'center' }}>
            <FormControl fullWidth>
              <Select
                id="demo-simple-select"
                value={option}
                onChange={handleChange}
                sx={{ width: 150, height: 40 }}
              >
                <MenuItem value={1}>유저검색</MenuItem>
                <MenuItem value={2}>피드검색</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Input
            autoFocus
            fullWidth
            disableUnderline
            placeholder={
              isUserLogged
                ? '검색 카테고리를 설정후 검색어를 입력해주세요'
                : '로그인 후 이용가능합니다'
            }
            disabled={!isUserLogged}
            startAdornment={
              <InputAdornment position="start">
                <Box
                  component={Icon}
                  icon={searchFill}
                  sx={{ color: 'text.disabled', width: '100%', height: 20 }}
                />
              </InputAdornment>
            }
            sx={{ mr: 1, fontWeight: 'fontWeightBold' }}
            onChange={handleInput}
          />
          <Button variant="contained" onClick={toggleDrawer('top', false)}>
            Close
          </Button>
        </SearchbarStyle>
        {option === 1 ? <>{userlist()}</> : <>{feedlist()}</>}
      </Drawer>
    </Stack>
  );
}
