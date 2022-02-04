import Container from '@mui/material/Container';

import { Box, Tab } from '@mui/material';
import { useState } from 'react';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { useParams } from 'react-router-dom';

export default function ProfilePage() {
  const { userId } = useParams();
  // 사용자 본인의 프로필: true, 다른 사용자의 프로필: false
  const isMypage = typeof userId === 'undefined';

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
              aria-label="lab API tabs example"
              sx={{ width: '100%' }}
            >
              <Tab label="Uploaded" value="1" />
              <Tab label="Voted" value="2" />
              <Tab label="Liked" value="3" />
            </TabList>
          </Box>
          <TabPanel value="1">Uploaded</TabPanel>
          <TabPanel value="2">Voted</TabPanel>
          <TabPanel value="3">Liked</TabPanel>
        </TabContext>
      </Box>
    </Container>
  );
}
