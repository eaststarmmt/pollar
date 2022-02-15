import { createIntstanceWithAuth } from '../axios';
import { getLoggedUserId } from '../../utils/loggedUser';

const COMMON = '/notification';

/* 알림 목록 */
export const getNotificationList = async () => {
  const response = await createIntstanceWithAuth().post(COMMON + '/list', {
    receiveId: getLoggedUserId(),
  });
  return response.data;
};

/* 알림 읽기 */
export const readNotifications = async (notificationIdList) => {
  const response = await createIntstanceWithAuth().put(COMMON + '/read', {
    notificationIdList,
  });
  return response.data;
};
