// @mui material components
import { Box, Typography, Button, Container, Grid, Avatar, Stack, Chip } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
// Images
import profilePicture from '../../assets/images/profile.jpeg';
import FollowListModal from './FollowListModal';
import { useState } from 'react';
import MobileHidden from '../common/MobileHidden';
import FollowButton from './FollowButton';

function Profile({ profileInfo, isOwnerAccount, setTriggerRefresh }) {
  // (mock data)
  //// profileInfo = profile;

  const [openFollowListModal, setOpenFollowListModal] = useState(false);
  // 팔로잉, 팔로워 모달 창을 open 시 focus할 tab
  const [modalListType, setModalListType] = useState();

  const handleOpenFollowModal = (type) => {
    // type: 'following' | 'follower'
    setModalListType(type);
    // 모달창을 open
    setOpenFollowListModal((curr) => !curr);
  };

  return (
    <Box component="section" pt={{ xs: 6, sm: 12 }} pb={{ xs: 3, sm: 6 }}>
      <Container>
        {profileInfo ? (
          <Grid container item xs={12} justifyContent="center" mx="auto">
            <Stack
              direction="row"
              spacing={3}
              mt={{ xs: -16, md: -20 }}
              pt={3}
              mx={2}
              alignItems="flex-end"
              sx={{ width: '100%' }}
            >
              <MobileHidden width="lgDown">
                <Avatar
                  src={profilePicture}
                  alt="Profile Photo"
                  shadow="xl"
                  sx={{ width: '10rem', height: '10rem' }}
                />
              </MobileHidden>
              <Stack alignItems="flex-start" sx={{ width: '100%' }}>
                <Stack
                  direction={{ sm: 'column', md: 'column', lg: 'row' }}
                  spacing={1}
                  alignItems="center"
                >
                  <Typography
                    variant="h3"
                    color="primary.dark"
                    textAlign="left"
                    sx={{ mr: 1, mb: 0, width: '100%' }}
                  >
                    {profileInfo.userNickname}
                  </Typography>
                  <Stack direction="row" spacing={1}>
                    {profileInfo.interests.map((item, index) => (
                      <Chip key={index} label={item} color="info" size="small" variant="outlined" />
                    ))}
                    {/* 관심분야 수정으로 바로 갈 수 있는 버튼 */}
                    {/* <Chip label="..." color="info" size="small" variant="outlined" /> */}
                    {/* 
                  <IconButton
                    href="/users/settings"
                    color="primary"
                    aria-label="edit interests"
                    size="small"
                  >
                    <SettingsIcon fontSize="small" />
                  </IconButton> */}
                  </Stack>
                </Stack>
                <Typography variant="caption" color="text.disabled" sx={{ ml: 0.5 }}>
                  @{profileInfo.userId}
                </Typography>

                <Grid container spacing={3} mt={-1}>
                  <Grid item>
                    <Typography
                      component="span"
                      variant="body2"
                      fontWeight="bold"
                      color="secondary"
                    >
                      {profileInfo.totalPollCount}&nbsp;
                    </Typography>
                    <Typography component="span" variant="overline" color="text.secondary">
                      Polls
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography
                      component="span"
                      variant="body2"
                      fontWeight="bold"
                      color="secondary"
                    >
                      {profileInfo.totalVoteCount}&nbsp;
                    </Typography>
                    <Typography component="span" variant="overline" color="text.secondary">
                      Votes
                    </Typography>
                  </Grid>
                </Grid>
              </Stack>
              <Stack alignItems="flex-end" justifyContent="space-between" sx={{ height: '100%' }}>
                <Stack
                  direction="row"
                  justifyContent="flex-end"
                  alignItems="flex-start"
                  spacing={0.5}
                  mt={{ xs: 3, sm: 6 }}
                >
                  <Button variant="outlined" size="small" disabled>
                    &nbsp;View&nbsp;Statistics&nbsp;
                  </Button>
                  {/* 본인의 계정 프로필인지에 따라서, 팔로잉을 하고 있는 계정의 프로필인지에 따라서 레이아웃 변화 */}
                  {isOwnerAccount ? (
                    <Button href="/users/settings" variant="contained" size="small">
                      Settings
                    </Button>
                  ) : (
                    <FollowButton
                      isFollowButton={!profileInfo.isFollow}
                      accountId={profileInfo.userId}
                      setTriggerRefresh={setTriggerRefresh}
                    />
                  )}

                  {/* !profileInfo.isFollow ? (
                    <Button
                      variant="contained"
                      disableElevation
                      size="small"
                      color="secondary"
                      onClick={handleFollow}
                    >
                      &nbsp;+&nbsp;Follow&nbsp;
                    </Button>
                  ) : (
                    <Button variant="outlined" size="small" onClick={handleUnfollow}>
                      &nbsp;Unfollow&nbsp;
                    </Button>
                  )} */}
                </Stack>

                <Stack direction="row" alignItems="flex-end" mt={3} mb={-3}>
                  <Stack mx={2} alignItems="center" justifyContent="center">
                    <Typography
                      component="span"
                      variant="caption"
                      color="text.secondary"
                      textTransform="uppercase"
                    >
                      Follower
                    </Typography>
                    <Button size="small" onClick={() => handleOpenFollowModal('follower')}>
                      <Typography component="span" variant="h4" fontWeight="bold" color="secondary">
                        {profileInfo.followerCount}
                      </Typography>
                    </Button>
                  </Stack>
                  <Stack mx={0} alignItems="center" justifyContent="center">
                    <Typography
                      component="span"
                      variant="caption"
                      color="text.secondary"
                      textTransform="uppercase"
                    >
                      Following
                    </Typography>
                    <Button size="small" onClick={() => handleOpenFollowModal('following')}>
                      <Typography component="span" variant="h4" fontWeight="bold" color="secondary">
                        {profileInfo.followingCount}
                      </Typography>
                    </Button>
                  </Stack>
                </Stack>
              </Stack>
            </Stack>
            {/* <ImageUploadButton /> */}
            <FollowListModal
              openModal={openFollowListModal}
              type={modalListType}
              listOwnerId={profileInfo.userId}
            />
          </Grid>
        ) : null}
      </Container>
    </Box>
  );
}

export default Profile;
