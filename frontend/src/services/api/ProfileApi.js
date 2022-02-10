import { getLoggedUserId } from '../../utils/loggedUser'
import { createIntstanceWithAuth } from '../../services/axios';

// 공통되는 경로
const COMMON = '/profile';

/* 프로필 페이지 기본 유저 계정 정보 */
export const getProfileInfo = async (userId) => {
  // console.log(instanceWithAuth());
  const response = await createIntstanceWithAuth().post(COMMON + `/${userId}`, {
    profileUserId: userId,
    loginUserId: getLoggedUserId(),
  });
  return response.data;
};

/*categoryList: []
followerCount: 0
followingCount: 0
isFollow: false
userId: "정홍"
userNickname: "정홍진" */
