import { Box, Card, Container, Typography } from '@mui/material';
import { styled } from '@mui/system';
import SettingsVerticalTab from '../components/settings/SettingsVerticalTab';
import { isLoggedState } from '../atoms/atoms';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { checkUserLogged, getLoggedUserId } from '../utils/loggedUser';

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 880,
  margin: 'auto',
  display: 'flex',
  // minHeight: '100vh',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(5, 0),
}));

export default function SettingsPage() {
  // 로그인된 사용자만 사용가능 (recoil state watch하자)
  const isLogged = useRecoilValue(isLoggedState);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogged && !checkUserLogged()) {
      // todo
      alert('회원에게만 제공되는 서비스입니다. ');
      navigate('/users/login');
    }
  }, []);

  return (
    <>
      <Container>
        <ContentStyle>
          {/* <Stack direction="row" justifyContent="space-between" spacing={2}> */}
          <Box sx={{ ml: 2, mb: 5 }}>
            <Typography variant="h3" gutterBottom color="primary">
              Account Settings
            </Typography>
            {/* <Typography sx={{ color: 'text.secondary' }}>Join us in Pollar!</Typography> */}
          </Box>

          {/* <HorizontalLabelPositionBelowStepper /> */}
          {/* </Stack> */}
          <Card
            sx={{
              // px: 8,
              // py: 8,
              backgroundColor: '#fffd',
              backdropFilter: 'saturate(200%) blur(50px)',
              boxShadow: '2px 2px 20px 10px rgba(0, 0, 0, 0.1)',
              overflow: 'visible',
            }}
          >
            <SettingsVerticalTab />
          </Card>
        </ContentStyle>
      </Container>
    </>
  );
}
