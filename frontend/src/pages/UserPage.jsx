import React, { useEffect, useState } from 'react';
import { Box, Container, Typography, Card, Grid } from '@mui/material';
import { getLoggedUserId } from '../utils/loggedUser';
import { getAllUsers } from '../services/api/SearchApi';
import UserDetailCard from '../components/user/UserDetailCard';
import { useNavigate } from 'react-router-dom';

function UserPage() {
  // 로그인되어있는 사용자의 Id
  const loggedUserId = getLoggedUserId();
  const [userInfo, setUserInfo] = useState([]);
  // const navigate = useNavigate();
  //전체 유저 불러오기
  const getAllUserInfo = async () => {
    const data = await getAllUsers(loggedUserId);
    setUserInfo(data.allUserList);
  };

  useEffect(() => {
    getAllUserInfo();
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
