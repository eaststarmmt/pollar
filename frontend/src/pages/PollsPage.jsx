import Container from '@mui/material/Container';

import { useState } from 'react';
import { styled } from '@mui/system';
import { useParams } from 'react-router-dom';
import PollListTabs from '../components/polls/PollListTabs';
import Page from '../components/Page';
import { Card, Grid, Stack, Typography } from '@mui/material';
import GradAnimatedButton from '../components/common/GradAnimatedButton';

const RootStyle = styled(Page)(({ theme }) => ({
  // paddingLeft: 100,
  // paddingRight: 100,
  height: '72vh',
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

export default function PollsPage() {
  return (
    <>
      <RootStyle title="Polls">
        {/* <Stack> */}
        {/* <Grid flexDirection="column" sx={{ mx: 'auto', textAlign: 'center' }}> */}
        <Stack>
          <Typography variant="h3" color="primary">
            Polls
          </Typography>
          <GradAnimatedButton href="/polls/create" sx={{ width: 'max-content', mt: 2 }}>
            <Typography variant="subtitle2">&nbsp;+&nbsp;Create A Poll&nbsp;&nbsp;</Typography>
          </GradAnimatedButton>
          <Card sx={{ padding: 5 }}>(사용자 프로필 정보)</Card>
        </Stack>
        {/* </Grid> */}
        <Grid
          container
          item
          justifyContent="center"
          flexDirection="column"
          sx={{ mx: 'auto', textAlign: 'center' }}
        >
          <PollListTabs />
        </Grid>
        {/* </Stack> */}
      </RootStyle>
    </>
  );
}
