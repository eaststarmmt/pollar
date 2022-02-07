// material
import { Box, Grid, Container, Typography, Stack, Button } from '@mui/material';
// components
import Page from '../components/Page';
import homeImg from '../assets/images/grad_img.png';

// ----------------------------------------------------------------------

export default function HomePage() {
  return (
    <Page title="Home">
      <Container maxWidth="md">
        <Grid container spacing={2} my={10}>
          <Grid item xs={12} sm={6} md={6}>
            <Stack spacing={4}>
              <Typography variant="h2" color="primary">
                Poll Whatever,
                <br />
                Anywhere
              </Typography>
              <Typography variant="inherit" color="primary.light">
                프로젝트 CICD 테스트
              </Typography>
            </Stack>
            <Button variant="contained" color="info">
              Get Started
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <img src={homeImg} alt="" />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
