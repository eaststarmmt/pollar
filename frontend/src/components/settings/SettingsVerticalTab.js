import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ProfileInfoSettings from './ProfileInfoSettings';
import NotificationSettings from './NotificationSettings';
import { useEffect, useState } from 'react';
import { getUserInfo } from '../../services/api/UserApi';
import { getLoggedUserId } from '../../utils/loggedUser';
import { setUserInterests } from '../../services/api/CategoryApi';
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
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
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
  const [userInfo, setUserInfo] = useState({
    userId: '',
    password: '',
    userNickname: '',
    userEmail: '',
    userBirthday: '',
    userGender: false,
    categories: [],
    userProfilePhoto: '',
  });

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  /* 사용자 계정 정보 API 호출 */
  const getAccountUserInfo = async () => {
    const data = await getUserInfo(getLoggedUserId());
    // data.categories = await getUserInterests(getLoggedUserId());
    setUserInfo(data);
  };

  /* 관심분야 재설정 */
  const handleUpdateInterests = async () => {
    const result = await setUserInterests(userInfo.categories);
    if (result.message == 'success') {
      // todo
      alert('성공적으로 반영');
    } else {
      // todo
      alert('오류가 발생했습니다. 잠시 후 시도해주세요 ');
    }
  };

  useEffect(() => {
    getAccountUserInfo();
  }, []);

  return (
    <Box sx={{ flexGrow: 1, bgcolor: 'transparent', display: 'flex', height: '50vh' }}>
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
        한주님 작업공간
        <ProfileInfoSettings />
        {/* <CardProfile /> */}
      </TabPanel>
      <TabPanel value={value} index={1}>
        관심분야 설정 (최대 3개까지 지정가능)
        <InterestsSettings />
      </TabPanel>
      <TabPanel value={value} index={2}>
        알림설정
        <NotificationSettings />
      </TabPanel>
    </Box>
  );
}
