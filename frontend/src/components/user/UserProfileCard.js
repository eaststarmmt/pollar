import React, { useState, useEffect } from 'react';
import profilePicture from '../../assets/images/profile.jpeg';
import { Button, Card, Grid, Stack, Typography, Avatar, Container } from '@mui/material';
import styled from '@emotion/styled';
import MobileHidden from '../common/MobileHidden';
import { getProfileInfo } from '../../services/api/ProfileApi';
import { getLoggedUserId } from '../../utils/loggedUser';
import { useNavigate, useParams } from 'react-router-dom';
import { getTotalUploadsCount, getTotalVotesCount } from '../../services/api/PollApi';

export default function UserProfileCard() {
  // 닉네임, 아이디, 좋아요수, 총투표수
  // 로그인되어있는 사용자의 Id
  const loggedUserId = getLoggedUserId();
  // 사용자 계정 정보
  const [profileInfo, setProfileInfo] = useState();

  const getAccountInfo = async () => {
    const data = await getProfileInfo(loggedUserId);
    setProfileInfo(data);
  };

  /* 사용자 계정 프로필 정보 API 호출 */
  const getAccountProfileInfo = async () => {
    const data = await getProfileInfo(loggedUserId);

    // 사용자 총 업로드 수
    data.totalPollCount = await getTotalUploadsCount(loggedUserId);
    // 사용자 총 투표 수
    data.totalVoteCount = await getTotalVotesCount(loggedUserId);
    setProfileInfo(data);
  };

  useEffect(() => {
    // 사용자 계정정보 요청
    getAccountInfo();
    getAccountProfileInfo();
  }, [loggedUserId]);

  return (
    <>
      {profileInfo ? (
        <Card
          sx={{
            marginTop: 5,
            padding: 2,
            paddingTop: 3,
            width: 150,
            height: 'auto',
            justifyContent: 'center',
            alignItems: 'center',
            
          }}
        >
          <Grid container spacing={1} justify="center" align="center">
            <Grid item xs={12} justify="center">
              <Avatar
                src={profileInfo.userProfilePhoto}
                alt="Profile Photo"
                shadow="xl"
                sx={{
                  width: '4rem',
                  height: '4rem',
                  border: 5,
                  borderColor: '#c5cae9',
                }}
              />
            </Grid>
            <Grid item xs={12} justify="center">
              <Typography component="span" variant="overline" textAlign="center">
                <p>{profileInfo.userNickname}</p>
              </Typography>
              <Typography component="span" variant="caption" color="text.secondary">
                <p>@{profileInfo.userId}</p>
              </Typography>
            </Grid>
            <Grid item xs={6} justify="center">
              <Stack>
                <Typography component="span" color="primary">
                  {profileInfo.totalPollCount}
                </Typography>
                <Typography component="span" variant="caption" color="text.secondary">
                  게시글
                </Typography>
              </Stack>
            </Grid>
            <Grid item xs={6} justify="center">
              <Stack>
                <Typography component="span" color="primary">
                  {profileInfo.totalVoteCount}
                </Typography>
                <Typography component="span" variant="caption" color="text.secondary">
                  투표수
                </Typography>
              </Stack>
            </Grid>
          </Grid>
        </Card>
      ) : null}
    </>
  );
}
