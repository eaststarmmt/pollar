import React, { useEffect, useState } from 'react';
import { Box, Container, Typography, Card, Grid } from '@mui/material';
import { getLoggedUserId } from '../utils/loggedUser';
import { getAllUsers } from '../services/api/SearchApi';
import UserDetailCard from '../components/user/UserDetailCard';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { isLoggedState } from '../atoms/atoms';

function UserPage() {
  // 로그인되어있는 사용자의 Id
  const loggedUserId = getLoggedUserId();
  const [userInfo, setUserInfo] = useState([]);
  // 로그인된 사용자인지 여부
  const isLogged = useRecoilValue(isLoggedState);
  const navigate = useNavigate();

  // const navigate = useNavigate();
  //전체 유저 불러오기
  const getAllUserInfo = async () => {
    const data = await getAllUsers(loggedUserId);
    setUserInfo(data.allUserList);
  };

  useEffect(() => {
    if (!isLogged && getLoggedUserId() === null) {
      // todo
      alert('회원에게만 제공되는 서비스입니다. ');
      navigate('/users/login');
    } else {
      getAllUserInfo();
    }
  }, [loggedUserId]);

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <Card
        sx={{
          px: 14,
          py: 2,
          backgroundColor: '#fffd',
          backdropFilter: 'saturate(200%) blur(30px)',
          boxShadow: '2px 2px 20px 10px rgba(0, 0, 0, 0.1)',
          overflow: 'visible',
          height: 500,
          bgcolor: '#f1f3fa',
          flexGrow: 1,
        }}
      >
        <Typography variant="h3" gutterBottom color="primary">
          Pollar User
        </Typography>
        <Grid container spacing={2}>
          {userInfo.map((user, index) => (
            <UserDetailCard key={index} user={user} />
          ))}
        </Grid>
      </Card>
    </Box>
  );
}

export default UserPage;
