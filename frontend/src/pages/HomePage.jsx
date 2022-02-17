// material
import { Box, Grid, Container, Typography, Stack, Button } from '@mui/material';
// components
import Page from '../components/Page';
import homeImg from '../assets/images/grad_img.png';
import GradAnimatedButton from '../components/common/GradAnimatedButton';
import { useRecoilState, useRecoilValue } from 'recoil';
import { isLoggedState, loggedUserState } from '../atoms/atoms';
import { useEffect, useState } from 'react';
import { checkUserLogged } from '../utils/loggedUser';
// ----------------------------------------------------------------------

export default function HomePage() {
  const isLogged = useRecoilValue(isLoggedState);

  const [isLoggedUser, setIsLoggedUser] = useState(false);

  useEffect(() => {
    setIsLoggedUser(isLogged || checkUserLogged());
  }, [isLogged]);

  return (
    <Page title="Home">
      <Container maxWidth="md" sx={{ height: '60vh' }}>
        <Grid container spacing={2} my={10}>
          <Grid item xs={12} sm={6} md={6}>
            <Stack spacing={4} pb={3}>
              <Typography variant="h2" color="primary">
                Poll Whatever,
                <br />
                Anywhere
              </Typography>
              <Typography variant="h6" color="text.disabled" fontWeight={500}>
                투표를 만들어 고민을 나누고,
                <br />
                투표를 하면서 의견을 공유하세요
              </Typography>
            </Stack>

            {!isLoggedUser ? (
              <GradAnimatedButton href="/users/signup">
                <Typography variant="subtitle2" color="inline">
                  Get Started
                </Typography>
              </GradAnimatedButton>
            ) : (
              <GradAnimatedButton href="/polls/create" sx={{ width: 'max-content' }}>
                <Typography variant="subtitle2">&nbsp;+&nbsp;Create A Poll&nbsp;&nbsp;</Typography>
              </GradAnimatedButton>
            )}
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <img src={homeImg} alt="" />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
