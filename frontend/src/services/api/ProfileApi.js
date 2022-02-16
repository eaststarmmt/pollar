import { getLoggedUserId } from '../../utils/loggedUser';
import instance from '../axiosInstance';

// 공통되는 경로
const COMMON = '/profile';

/* 프로필 페이지 기본 유저 계정 정보 */
export const getProfileInfo = async (userId) => {
  // console.log(instanceWithAuth());
  const response = await instance.get(COMMON + `/userinfo`, {
    params: { profileUserId: userId, logInUserId: getLoggedUserId() },
  });
  return response.data;
};

/* 프로필 계정 사용자가 업로드한 투표 리스트 */
export const getUserUploadsList = async (userId) => {
  const response = await instance.get(COMMON + '/uploads', {
    params: { profileUserId: userId, logInUserId: getLoggedUserId() },
  });
  return response.data.uploadsVoteList;
};

/* 프로필 계정 사용자가 투표한 투표항목 리스트 */
export const getUserVotesList = async (userId) => {
  const response = await instance.get(COMMON + '/participates', {
    params: { profileUserId: userId, logInUserId: getLoggedUserId() },
  });
  return response.data.participatesVoteList;
};

/* 프로필 계정 사용자가 '좋아요'한 투표 리스트 */
export const getUserLikesList = async (userId) => {
  const response = await instance.get(COMMON + '/likes', {
    params: { profileUserId: userId, logInUserId: getLoggedUserId() },
  });
  return response.data.likesVoteList;
};
