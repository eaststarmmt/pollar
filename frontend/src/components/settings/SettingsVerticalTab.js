import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ProfileInfoSettings from './ProfileInfoSettings';
import NotificationSettings from './NotificationSettings';
import { useEffect, useState } from 'react';
import InterestsSettings from './InterestsSettings';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 5, alignItems: 'flex-end', justifyContent: 'center' }}>
          {children}
          {/* <Typography>{children}</Typography> */}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}
export default function SettingsVerticalTab() {
  // 포커스 된 탭
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    // getAccountUserInfo();
  }, []);

  return (
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: 'transparent',
        display: 'flex',
        // height: '50vh',
      }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{
          borderRight: 1,
          borderColor: 'divider',
          bgcolor: 'background.paper',
          borderTopLeftRadius: 20,
          borderBottomLeftRadius: 20,
          pl: 5,
          py: 5,
        }}
      >
        <Tab label="Profile Info&nbsp;" {...a11yProps(0)} />
        <Tab label="Interests" {...a11yProps(1)} />
        <Tab label="Notification&nbsp;" {...a11yProps(2)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <Typography variant="h5">프로필 수정</Typography>
        <Typography variant="caption" color="text.secondary" sx={{ pl: 0 }}>
          닉네임과 비밀번호를 수정가능합니다.
        </Typography>
        <ProfileInfoSettings />
        {/* <CardProfile /> */}
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Typography variant="h5">관심분야 설정</Typography>
        <Typography variant="caption" color="text.secondary" sx={{ pl: 0 }}>
          관심분야를 설정하고, 관련 투표들을 받아보세요! (최대 3개까지 지정가능)
        </Typography>
        {/* <Divider sx={{ minWidth: '100%' }} /> */}
        <InterestsSettings />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Typography variant="h5">알림 설정</Typography>
        <Typography variant="caption" color="text.secondary" sx={{ pl: 0 }}>
          전체 알림설정 및 세부 알림설정이 가능합니다.
        </Typography>
        <NotificationSettings />
      </TabPanel>
    </Box>
  );
}
