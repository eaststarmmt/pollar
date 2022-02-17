import { Link as RouterLink } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
import { Card, Stack, Link, Container, Typography } from '@mui/material';
// components
import Page from '../components/Page';
import MobileHidden from '../components/common/MobileHidden';
import AuthSocial from '../components/login/AuthSocial';
import LoginForm from '../components/login/LoginForm';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 464,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: theme.spacing(2, 0, 2, 2),
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  maxHeight: '100%',
  margin: 'auto',
  display: 'flex',
  // 스크롤 방지
  padding: theme.spacing(8, 0),
  minHeight: '100%',
  flexDirection: 'column',
  justifyContent: 'center',
}));

// ----------------------------------------------------------------------

export default function Login() {
  return (
    <>
      <Page title="Login">
        <Container maxWidth="sm">
          <ContentStyle>
            <Card
              sx={{
                px: 8,
                py: 8,
                backgroundColor: '#fffd',
                backdropFilter: 'saturate(200%) blur(30px)',
                boxShadow: '2px 2px 20px 10px rgba(0, 0, 0, 0.1)',
                overflow: 'visible',
              }}
            >
              <Stack sx={{ mb: 5 }}>
                <Typography variant="h3" gutterBottom color="primary">
                  Login
                </Typography>
                <Typography sx={{ color: 'text.secondary' }}>로그인하고 투표에 참여해보세요!</Typography>
              </Stack>
              <LoginForm />
              {/* <AuthSocial /> */}
              <Typography variant="body2" align="center" sx={{ mt: 3 }} color="primary.light">
                아직 회원이 아니신가요?&nbsp;
                <Link variant="subtitle2" component={RouterLink} to="../signup">
                  Signup
                </Link>
              </Typography>
            </Card>
          </ContentStyle>
        </Container>
      </Page>
    </>
  );
}
