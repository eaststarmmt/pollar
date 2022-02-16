import { styled } from '@mui/system';
import PollListTabs from '../components/polls/PollListTabs';
import Page from '../components/Page';
import { Card, Grid, Stack, Typography } from '@mui/material';
import GradAnimatedButton from '../components/common/GradAnimatedButton';
import UserProfileCard from '../components/user/UserProfileCard';
import { useRecoilValue } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { isLoggedState } from '../atoms/atoms';
import { getLoggedUserId } from '../utils/loggedUser';

const RootStyle = styled(Page)(({ theme }) => ({
  // paddingLeft: 100,
  // paddingRight: 100,
  height: '72vh',
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

export default function PollsPage() {
  // 로그인된 사용자만 사용가능 (recoil state watch하자)
  const isLogged = useRecoilValue(isLoggedState);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogged && getLoggedUserId() === null) {
      // todo
      alert('회원에게만 제공되는 서비스입니다. ');
      navigate('/users/login');
    }
  }, []);

  return (
    <>
      <RootStyle title="Polls">
        {/* <Stack> */}
        {/* <Grid flexDirection="column" sx={{ mx: 'auto', textAlign: 'center' }}> */}
        <Stack>
          <Typography variant="h3" color="primary">
            Polls
          </Typography>
          <GradAnimatedButton href="/polls/create" sx={{ width: 'max-content', mt: 2 }}>
            <Typography variant="subtitle2">&nbsp;+&nbsp;Create A Poll&nbsp;&nbsp;</Typography>
          </GradAnimatedButton>
          <UserProfileCard />
        </Stack>
        {/* </Grid> */}
        <Grid
          container
          item
          justifyContent="center"
          flexDirection="column"
          sx={{ mx: 'auto', textAlign: 'center' }}
        >
          <PollListTabs />
        </Grid>
        {/* </Stack> */}
      </RootStyle>
    </>
  );
}
