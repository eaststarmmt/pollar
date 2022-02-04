import Container from '@mui/material/Container';

import { Box, Tab } from '@mui/material';
import { useState } from 'react';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { useParams } from 'react-router-dom';

export default function PollsPage() {
  // 투표 목록의 type
  /**
   * 'interests': 관심분야
   * 'following': 팔로잉
   * 'recents': 최신순
   */
  const { type } = useParams();
  // Navbar를 통해서 들어온 경우에는 default로 첫번째 Tab에 focusing
  const [value, setValue] = useState(type ? type : 'interests');

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
              <Tab label="관심분야" value="interests" />
              <Tab label="팔로잉" value="following" />
              <Tab label="최신순" value="recents" />
            </TabList>
          </Box>
          <TabPanel value="interests">관심분야 투표 목록</TabPanel>
          <TabPanel value="following">팔로잉 투표 목록</TabPanel>
          <TabPanel value="recents">최신순 투표 목록</TabPanel>
        </TabContext>
      </Box>
    </Container>
  );
}
