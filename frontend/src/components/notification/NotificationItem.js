import {
  Avatar,
  Box,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import clockFill from '@iconify/icons-eva/clock-fill';
import { readNotifications } from '../../services/api/NotificationApi';
import stringToColor from '../../utils/stringToColor';

function renderContent(notification) {
  const { notificationType, notificationContents, sendId, userProfilePhoto, voteName } =
    notification;
  const title = (
    <>
      <Typography variant="subtitle2">
        {notificationType === 2 ? '좋아요 알림' : '팔로우 알림'}&nbsp;&nbsp;
        <Typography component="span" variant="body2" sx={{ color: 'text.secondary', fontSize: 13 }}>
          {notificationContents}
        </Typography>
      </Typography>
    </>
  );

  // 피드관련
  if (notificationType === 2) {
    return {
      avatar: (
        <Avatar alt={voteName} src={voteName} sx={{ bgcolor: stringToColor(`${voteName}`) }} />
      ),
      title,
    };
  }
  //
  if (notificationType === 4) {
    return {
      avatar: (
        <Avatar alt={sendId} src={userProfilePhoto} sx={{ bgcolor: stringToColor(`${sendId}`) }} />
      ),
      title,
    };
  }
  // return {
  //   avatar: <img src={img} alt="123" />,
  //   title,
  // };
}

NotificationItem.propTypes = {
  notification: PropTypes.object.isRequired,
};

export default function NotificationItem({ notification }) {
  const {
    notificationId,
    notificationContents,
    notificationCreateTime,
    notificationRead,
    notificationType,
    // receiveId,
    sendId,
    voteId,
  } = notification;
  const { avatar, title } = renderContent(notification);
  const navigate = useNavigate();

  /* 알림 클릭 시 읽음처리 + 관련 action 처리 */
  const handleNotificationClick = async () => {
    if (!notificationRead) {
      const result = await readNotifications([notificationId]);
      // 알림과 관련된 action 처리
      if (result.data === 'success') {
        console.log('읽음처리');
      }
    }
    /* 피드(투표) 관련 */
    if (notificationType === 2) {
      navigate(`/poll/${voteId}`);
    } /* 팔로잉 관련 */ else if (notificationType === 4) {
      navigate(`/users/profile/${sendId}`);
    } else {
      // todo
      // console.log('일반 알림');
    }
  };

  return (
    <ListItemButton
      disableGutters
      onClick={handleNotificationClick}
      sx={{
        py: 1.5,
        px: 2.5,
        mt: '1px',
        ...(notificationRead && {
          bgcolor: 'action.selected',
        }),
      }}
    >
      <ListItemAvatar>
        <Avatar sx={{ bgcolor: 'background.neutral' }}>{avatar}</Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={title}
        secondary={
          <Typography
            variant="caption"
            sx={{
              mt: 0.5,
              display: 'flex',
              alignItems: 'center',
              color: 'text.disabled',
            }}
          >
            <Box component={Icon} icon={clockFill} sx={{ mr: 0.5, width: 16, height: 16 }} />
            {formatDistanceToNow(new Date(notificationCreateTime))}
          </Typography>
        }
      />
    </ListItemButton>
  );
}
