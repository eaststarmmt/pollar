// material
import { Box, Grid, Container, Typography, Stack, Button } from '@mui/material';
// components
import Page from '../components/Page';
import homeImg from '../assets/images/grad_img.png';
import GradAnimatedButton from '../components/common/GradAnimatedButton';
import { useRecoilState } from 'recoil';
import { loggedUserState } from '../atoms/atoms';
// ----------------------------------------------------------------------

export default function HomePage() {
  const [loggedUser, setLoggedUser] = useRecoilState(loggedUserState);

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
              <Typography variant="h6" color="text.disabled">
                투표를 만들어 고민을 나누고,
                <br />
                투표를 하면서 의견을 나눠주세요.
              </Typography>
            </Stack>

            {!loggedUser ? (
              <GradAnimatedButton href="/users/signup">
                <Typography variant="body1" color="inline">
                  Get Started
                </Typography>
              </GradAnimatedButton>
            ) : (
              <GradAnimatedButton href="/polls/create" sx={{ width: 'max-content',}}>
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
