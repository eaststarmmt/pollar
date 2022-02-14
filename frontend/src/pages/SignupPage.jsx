// material
import { styled } from '@mui/material/styles';
import { Container } from '@mui/material';
// components
import Page from '../components/Page';
import SignupWizard from '../components/signup/SignupWizard';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 880,
  margin: 'auto',
  display: 'flex',
  // minHeight: '100vh',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(5, 0),
}));

// ----------------------------------------------------------------------

export default function SignupPage() {
  return (
    <RootStyle title="Signup">
      <Container>
        <ContentStyle>
          <SignupWizard />
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}
