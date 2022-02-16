import { getLoggedUserId } from '../../utils/loggedUser';
import instance from '../axiosInstance';

const COMMON = '/category';

/* 모든 카테고리 리스트 */
export const getAllCategories = async () => {
  const response = await instance.get(COMMON);
  return response.data;
};

/* 유저 관심분야 리스트 */
export const getUserInterests = async (userId) => {
  const response = await instance.get(COMMON + `/user/${userId}`);
  return response.data;
};

/* 유저(사용자 본인) 관심분야 목록 등록 */
export const setUserInterests = async (categoryList) => {
  const response = await instance.post(COMMON + '/user', {
    categoryList,
    userId: getLoggedUserId(),
  });
  return response.data;
};

/* Poll(투표)에 설정한 카테고리 id 리스트 */
export const getPollCategory = async (feedId) => {
  const response = await instance.get(COMMON + '/vote', {
    params: { voteId: feedId },
  });
  return response.data;
};

/* 유저가 선택한 카테고리 목록 반환 */
export const getUserCategories = async (userId) => {
  const response = await instance.get(COMMON + `/user/${userId}`);
  console.log(response);
  return response.data;
};
