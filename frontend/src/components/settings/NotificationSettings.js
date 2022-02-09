import { FormControlLabel, FormGroup, Switch } from '@mui/material';
import { useState } from 'react';

export default function NotificationSettings() {
  // const [notificationOn, setNotificationOn] = useState({나중에추가})
  const [totalNotificationOn, setTotalNotificationOn] = useState(true);
  const [detailNotification111111On, setDetailNotification11111On] = useState(false);

  return (
    <>
      <FormGroup>
        <FormControlLabel
          control={
            <Switch
              value={totalNotificationOn}
              defaultChecked={totalNotificationOn}
              color="secondary"
            />
          }
          label="전체 알람설정"
        />
        <FormControlLabel
          disabled={!totalNotificationOn}
          control={
            <Switch
              value={detailNotification111111On}
              color="secondary"
              checked={detailNotification111111On}
            />
          }
          label="전체알림설정되었을 경우 세부설정"
        />
      </FormGroup>
    </>
  );
}
