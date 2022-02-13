// @mui material components
import Container from '@mui/material/Container';

import { Box, Icon, Tab, Typography } from '@mui/material';
import { useState } from 'react';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import UploadsTabPanel from './UploadsTabPanel';
import VotesTabPanel from './VotesTabPanel';
import LikesTabPanel from './LikesTabPanel';

const style = {
  backgroundColor: '#fff',
  //? sm 이후로는(up)동일한 값을 적용하려면 그냥 sm까지만 적용하면 된다
  /* (xs, extra-small: 0px
  sm, small: 600px
  md, medium: 900px
  lg, large: 1200px
  xl, extra-large: 1536px
  */
  mx: { xs: -4, sm: -5 },
  mt: -0.5,
  mb: -10,
  height: '60vh',
  boxShadow: 10,
  borderBottomLeftRadius: 20,
  borderBottomRightRadius: 20,
  px: 2,
  py: 2,
};

export default function FeedTabs({ userId }) {
  const [value, setValue] = useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Container>
      <Box sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList
              onChange={handleChange}
              aria-label="profile feed list tab"
              sx={{ width: '40%' }}
            >
              <Tab label="Uploads" value="1" />
              <Tab label="Votes" value="2" />
              <Tab label="Likes" value="3" />
            </TabList>
          </Box>
          <Box overflow="auto" sx={style}>
            <TabPanel value="1">
              <UploadsTabPanel userId={userId} />
            </TabPanel>
            <TabPanel value="2">
              <VotesTabPanel userId={userId} />
            </TabPanel>
            <TabPanel value="3">
              <LikesTabPanel userId={userId} />
            </TabPanel>
          </Box>
        </TabContext>
      </Box>
    </Container>
  );
}
