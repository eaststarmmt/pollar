import { instance, createMultipartInstance, fileInstance } from '../../services/axios';
import { getLoggedUserId } from '../../utils/loggedUser';

// 공통되는 경로는 다음과 같이 별도로 정의해둠
const COMMON = '/user';

/* 아이디 중복검사 */
export const checkId = async (userId) => {
  const response = await instance.get(COMMON + '/idcheck', {
    params: {
      userId: userId,
    },
  });
  return response.data;
};

/* 닉네임 중복검사 */
export const checkNickname = async (userNickname) => {
  const response = await instance.get(COMMON + '/nickcheck', {
    params: {
      userNickname: userNickname,
    },
  });
  return response.data;
};

/* 이메일 중복검사 */
export const checkEmail = async (userEmail) => {
  const response = await instance.get(COMMON + '/emailcheck', {
    params: {
      userEmail: userEmail,
    },
  });
  return response.data;
};

/* 이메일 인증 메일 발송 */
export const emailConfirm = async (userEmail) => {
  const response = await instance.get(COMMON + '/confirmemail', {
    params: {
      userEmail: userEmail,
    },
  });
  console.log(response.data);
  return response.data;
};

/* 이메일 인증 토큰 확인 */
export const emailToken = async (token) => {
  const response = await instance.get(COMMON + '/emailtoken', {
    params: {
      userEmail: token.userEmail,
      token: token.token,
    },
  });
  return response.data;
};

/* 회원정보 수정 */
export const modifyUserInfo = async (user) => {
  const response = await instance.put(COMMON, {
    userId: getLoggedUserId(),
    userNickname: user.userNickname,
  });
  return response.data;
};

/* 비밀번호 수정 */
export const modifyUserPw = async (newPassword) => {
  const response = await instance.put(COMMON + '/modifypass', {
    userId: getLoggedUserId(),
    password: newPassword,
  });
  return response.data;
};

/* 회원 정보 불러오기 */
export const getUserInfo = async (userId) => {
  const response = await instance.get(COMMON + '/info' + `/${userId}`, {
    profileUserId: userId,
    loginUserId: getLoggedUserId(),
  });
  return response.data;
};

// 프로필 이미지 수정
// ProfileApi 에서 기본 유저 정보 호출해서 사용하기
export const modifyProfilePhoto = async (formData) => {
  const response = await fileInstance.put(COMMON + '/photo', formData);
  return response.data;
};
