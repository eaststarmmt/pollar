// import { instance, createIntstanceWithAuth } from '../axios';
import { createIntstanceWithAuth } from '../axios';

const COMMON = '/follow';

/* 유저 팔로우 요청 */
export const requestFollow = async (followInfo) => {
  const response = await createIntstanceWithAuth().post(COMMON + '/following', followInfo);
  console.log(response);

  return response.data === 'success';
};

/* 유저 언팔로우 요청 */
export const requestUnfollow = async (followInfo) => {
  const response = await createIntstanceWithAuth().post(COMMON + '/unfollow', followInfo);
  console.log(response);

  return response.data === 'success';
};

/* 팔로워 목록 */
export const getFollowerList = async (loginUserId, profileUserId) => {
  const response = await createIntstanceWithAuth().get(COMMON + '/followerlist', {
    params: {
      loginUserId,
      profileUserId,
    },
  });
  console.log(response);

  return response.data.followerList;
};

/* 팔로잉 목록 */
export const getFollowingList = async (loginUserId, profileUserId) => {
  const response = await createIntstanceWithAuth().get(COMMON + '/followinglist', {
    params: {
      loginUserId,
      profileUserId,
    },
  });
  console.log(response);

  return response.data.followingList;
};
