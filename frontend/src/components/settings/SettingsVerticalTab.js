import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import SelectInterests from '../signup/SelectInterests';
import { Button } from '@mui/material';
import ProfileInfoSettings from './ProfileInfoSettings';
import CardProfile from './CardProfile';
import ImageUploadButton from '../common/ImageUploadButton';
import NotificationSettings from './NotificationSettings';

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
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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
        <ProfileInfoSettings />
        {/* <CardProfile /> */}
      </TabPanel>
      <TabPanel value={value} index={1}>
        Tell us your interests, and get recommended Polls! (최대 3개까지 지정가능)
        <SelectInterests />
      </TabPanel>
      <TabPanel value={value} index={2}>
        알림설정
        <NotificationSettings />
      </TabPanel>
    </Box>
  );
}
