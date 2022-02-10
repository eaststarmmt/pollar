import { Container, Grid, Typography } from '@mui/material';
import TrendingPollsSlider from '../components/trending/TrendingPollsSlider';

export default function TrendingPage() {
  return (
    <>
      <Container>
        <Grid
          container
          item
          // xs={12}
          // lg={8}
          justifyContent="center"
          // alignItems="center"
          flexDirection="column"
          sx={{ mx: 'auto', textAlign: 'center' }}
        >
          <Typography
            variant="h2"
            color="primary"
            sx={({ breakpoints, typography: { size } }) => ({
              [breakpoints.down('md')]: {
                fontSize: '500',
              },
            })}
          >
            Trending
          </Typography>
          <Typography variant="body1" color="gray" opacity={0.8} mt={1} mb={3}>
            We&apos;re constantly trying to express ourselves and actualize our dreams. If you have
            the opportunity to play this game
          </Typography>
          <TrendingPollsSlider />
        </Grid>
      </Container>
    </>
  );
}
