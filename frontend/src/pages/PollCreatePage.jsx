import CreateForm from '../components/createpoll/CreateForm';
import { isLoggedState } from '../atoms/atoms';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { Box, Container, Typography, Card, Snackbar } from '@mui/material';
import { checkUserLogged, getLoggedUserId } from '../utils/loggedUser';

export default function PollCreatePage() {
  // 로그인된 사용자만 사용가능 (recoil state watch하자)
  const isLogged = useRecoilValue(isLoggedState);
  const navigate = useNavigate();
  // alert
  const [alert, setAlert] = useState({
    open: false,
    vertical: 'center',
    horizontal: 'center',
  });
  const { vertical, horizontal, open } = alert;

  const openAlert = () => {
    setAlert({
      ...alert,
      open: true,
    });
  };
  const closeAlert = () => {
    setAlert({
      ...alert,
      open: false,
    });
  };
  useEffect(() => {
    if (!isLogged && !checkUserLogged()) {
      // todo
      // setInterval(()=> {
      //   openAlert();
      // },2000)
      navigate('/users/login');
    }
  }, []);

  return (
    <>
      {alert.open && (
        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={open}
          onClose={closeAlert}
          message="회원에게만 제공되는 서비스입니다. "
          autoHideDuration={3000}
        />
      )}
      <Container>
        <Box sx={{ width: '100%', typography: 'body1' }}>
          <Card
            sx={{
              px: 14,
              py: 8,
              backgroundColor: '#fffd',
              backdropFilter: 'saturate(200%) blur(30px)',
              boxShadow: '2px 2px 20px 10px rgba(0, 0, 0, 0.1)',
              overflow: 'visible',
            }}
          >
            <Typography variant="h3" gutterBottom color="primary">
              Create Poll
            </Typography>
            <CreateForm />
          </Card>
        </Box>
      </Container>
    </>
  );
}
