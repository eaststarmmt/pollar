// @mui material components
import { Box, Divider, Typography } from '@mui/material';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';

function Footer() {
  return (
    <Box component="footer" py={6}>
      <Container maxWidth="lg">
        <Divider />
        <Grid container>
          <Grid
            item
            xs={12}
            lg={4}
            textAlign={{ xs: 'center', lg: 'left' }}
            mr="auto"
            my={{ xs: 3, lg: 2 }}
            mx={10}
          >
            {/* <Typography variant="h6" textTransform="uppercase" mb={{ xs: 2, lg: 3 }}>
              Material Design
            </Typography> */}
            <Stack
              component="ul"
              direction="row"
              flexWrap="wrap"
              spacing={3}
              justifyContent={{ xs: 'center', lg: 'flex-start' }}
              pl={0}
              mb={1}
              sx={{ listStyle: 'none' }}
            >
              <Box component="li">
                <Typography
                  variant="button"
                  fontWeight="regular"
                  opacity={0.8}
                  component={Link}
                  href="https://www.pollar.live"
                  underline="none"
                  target="_parent"
                  rel="noreferrer"
                  color="text.disabled"
                >
                  Home
                </Typography>
              </Box>
              <Box component="li">
                <Typography
                  variant="button"
                  fontWeight="regular"
                  opacity={0.8}
                  component={Link}
                  href="https://project.ssafy.com/home"
                  underline="none"
                  target="_block"
                  rel="noreferrer"
                  color="text.disabled"
                >
                  About our Team
                </Typography>
              </Box>
              <Box component="li">
                <Typography
                  variant="button"
                  fontWeight="regular"
                  opacity={0.8}
                  component={Link}
                  href="/about"
                  underline="none"
                  target="_parent"
                  rel="noreferrer"
                  color="text.disabled"
                >
                  Contact Us
                </Typography>
              </Box>
              <Box component="li">
                <Typography
                  variant="button"
                  fontWeight="regular"
                  opacity={0.8}
                  component={Link}
                  href="https://lab.ssafy.com/s06-webmobile2-sub2/S06P12A407"
                  underline="none"
                  target="_blank"
                  rel="noreferrer"
                  color="text.disabled"
                >
                  Gitlab
                </Typography>
              </Box>
            </Stack>
            <Typography variant="caption" opacity={0.8}>
              All rights reserved. Copyright ©{' '}
              <script>document.write(new Date().getFullYear())</script>2022 Material Design. A407
            </Typography>
          </Grid>
          <Grid item xs={12} lg={6} ml="auto" textAlign={{ xs: 'center', lg: 'right' }}>
            {/* <MKTypography variant="body1" fontWeight="bold" mb={6} sx={{ fontSize: '1.125rem' }}>
              The reward for getting on the stage is fame. The price of fame is you can&apos;t get
              off the stage.
            </MKTypography> */}
            <Typography
              component={Link}
              href="#dribbble"
              target="_blank"
              rel="noreferrer"
              variant="body2"
              color="dark"
              opacity={0.5}
              mr={3}
            >
              <i className="fab fa-dribbble" />
            </Typography>
            <Typography
              component={Link}
              href="#twitter"
              target="_blank"
              rel="noreferrer"
              variant="body2"
              color="dark"
              opacity={0.5}
              mr={3}
            >
              <i className="fab fa-twitter" />
            </Typography>
            <Typography
              component={Link}
              href="#pinterest"
              target="_blank"
              rel="noreferrer"
              variant="body2"
              color="dark"
              opacity={0.5}
              mr={3}
            >
              <i className="fab fa-pinterest" />
            </Typography>
            <Typography
              component={Link}
              href="#github"
              target="_blank"
              rel="noreferrer"
              variant="body2"
              color="dark"
              opacity={0.5}
            >
              <i className="fab fa-github" />
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default Footer;
