import { useEffect, useRef, useState } from 'react';
import { Icon } from '@iconify/react';
import bellFill from '@iconify/icons-eva/bell-fill';
import doneAllFill from '@iconify/icons-eva/done-all-fill';
// material
import { alpha } from '@mui/material/styles';
import {
  Box,
  List,
  Badge,
  Button,
  Tooltip,
  Divider,
  IconButton,
  Typography,
  ListSubheader,
} from '@mui/material';
// components
import MenuPopover from '../../components/MenuPopover';
import NotificationItem from './NotificationItem';
import { getNotificationList, readNotifications } from '../../services/api/NotificationApi';
// import NOTIFICATIONS from '../../_mocks_/notification';

// ----------------------------------------------------------------------

export default function NotificationsPopover() {
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const totalUnRead = notifications.filter((item) => item.notificationRead === false).length;

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleMarkAllAsRead = async () => {
    // 읽을 알림의 id 리스트
    const readList = notifications.slice(0, totalUnRead).map((item) => item.notificationId);
    await readNotifications(readList);
    // 갱신 (알림 목록 새로고침)
    getList();
  };

  const getList = async () => {
    const data = await getNotificationList();
    // console.log(data);
    //// setNotifications(data.notificationList);
    // 전처리 후 저장) 알림 목록을 읽음 -> 안읽음 기준으로 정렬
    setNotifications(
      data.notificationList.sort(function (a, b) {
        return a.notificationRead - b.notificationRead;
      })
    );
  };

  useEffect(() => {
    getList();
  }, []);

  return (
    <>
      <IconButton
        ref={anchorRef}
        size="large"
        color={open ? 'primary' : 'default'}
        onClick={handleOpen}
        sx={{
          ...(open && {
            bgcolor: (theme) =>
              alpha(theme.palette.primary.main, theme.palette.action.focusOpacity),
          }),
        }}
      >
        <Badge badgeContent={totalUnRead} color="error">
          <Icon icon={bellFill} width={20} height={20} />
        </Badge>
      </IconButton>

      <MenuPopover
        open={open}
        onClose={handleClose}
        anchorEl={anchorRef.current}
        sx={{ width: 360 }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', py: 2, px: 2.5 }}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="subtitle1">Notifications</Typography>
            <Typography component="span" variant="body2" sx={{ color: 'text.secondary' }}>
              You have{' '}
              <Typography
                variant="body2"
                display="inline"
                component="span"
                sx={{ color: 'text.info', fontWeight: 'bold' }}
              >
                {totalUnRead}
              </Typography>{' '}
              unread messages
            </Typography>
          </Box>

          {totalUnRead > 0 && (
            <Tooltip title=" 전체읽음 처리">
              <IconButton color="secondary" onClick={handleMarkAllAsRead}>
                <Icon icon={doneAllFill} width={20} height={20} />
              </IconButton>
            </Tooltip>
          )}
        </Box>

        <Divider />

        <Box sx={{ maxHeight: 500, overflow: 'auto' }}>
          {/* <Scrollbar sx={{ height: { xs: 340, sm: 'auto' } }}> */}
          <List
            disablePadding
            subheader={
              <ListSubheader disableSticky sx={{ py: 1, px: 2.5, typography: 'overline' }}>
                New
              </ListSubheader>
            }
          >
            {notifications.slice(0, totalUnRead).map((notification) => (
              <NotificationItem key={notification.notificationId} notification={notification} />
            ))}
          </List>

          <List
            disablePadding
            subheader={
              <ListSubheader disableSticky sx={{ py: 1, px: 2.5, typography: 'overline' }}>
                Previous Notifications
              </ListSubheader>
            }
          >
            {notifications.slice(totalUnRead, notifications.length).map((notification) => (
              <NotificationItem key={notification.notificationId} notification={notification} />
            ))}
          </List>
          {/* </Scrollbar> */}

          <Divider />
        </Box>
        <Box sx={{ p: 1 }}>
          <Button fullWidth disableRipple onClick={getList}>
            새로고침
          </Button>
        </Box>
      </MenuPopover>
    </>
  );
}
