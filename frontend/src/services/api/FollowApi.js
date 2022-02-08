import { instanceWithAuth } from '../../services/axios';

const COMMON = '/follow';

/* 유저 팔로우 요청 */
export const requestFollow = async (followInfo) => {
  const response = await instanceWithAuth.post(COMMON + '/following', followInfo);
  console.log(response);

  return response.data === 'success';
};

/* 유저 언팔로우 요청 */
export const requestUnfollow = async (followInfo) => {
  const response = await instanceWithAuth.post(COMMON + '/unfollow', followInfo);
  console.log(response);

  return response.data === 'success';
};

/* 팔로워 목록 */
export const getFollowerList = async (userId) => {
  const response = await instanceWithAuth.get(COMMON + '/followerlist', {
    params: {
      userId,
    },
  });
  console.log(response);

  return response.data.followerList;
};

/* 팔로잉 목록 */
export const getFollowingList = async (userId) => {
  const response = await instanceWithAuth.get(COMMON + '/followinglist', {
    params: {
      userId,
    },
  });
  console.log(response);

  return response.data.followingList;
};
