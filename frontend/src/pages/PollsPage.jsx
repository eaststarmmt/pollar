import Container from '@mui/material/Container';

import { useState } from 'react';
import { styled } from '@mui/system';
import { useParams } from 'react-router-dom';
import PollListTabs from '../components/polls/PollListTabs';
import Page from '../components/Page';
import { Grid, Typography } from '@mui/material';
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
        <Grid flexDirection="column" sx={{ mx: 'auto', textAlign: 'center' }}>
          <Typography variant="h3" color="primary">
            Polls
          </Typography>
          <GradAnimatedButton href="/polls/create" sx={{ width: 'max-content', mt: 2 }}>
            <Typography variant="subtitle2">&nbsp;+&nbsp;Create A Poll&nbsp;&nbsp;</Typography>
          </GradAnimatedButton>
        </Grid>
        <Grid
          container
          item
          justifyContent="center"
          flexDirection="column"
          sx={{ mx: 'auto', textAlign: 'center' }}
        >
          <PollListTabs />
        </Grid>
      </RootStyle>
    </>
  );
}
