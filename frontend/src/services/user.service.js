import axios from 'axios';
import { logout } from '../actions/auth';

// TODO http-common.js or config
const API_URL = 'http://localhost:8080/user/';

/* 아이디 중복검사 */
const checkId = (userId) => {
  return axios
    .get(API_URL + 'idcheck', {
      params: {
        userId: userId,
      },
    })
    .then((response) => {
      return response.data;
    });
};

/* 닉네임 중복검사 */
const checkNickname = (userNickname) => {
  return axios
    .get(API_URL + 'nickcheck', {
      userNickname,
    })
    .then((response) => {
      console.log(response);
    });
};

/* 이메일 중복검사 */
// 여기는 왜 post일까
const checkEmail = (userEmail) => {
  return axios
    .post(API_URL + 'emailcheck', {
      userEmail,
    })
    .then((response) => {
      console.log(response);
    });
};

/* 회원정보 수정 */
const modifyUserInfo = (userId, password, userNickname, userEmail, userBirthday, userSex, categories) => {
  return axios
    .put(API_URL, {
      userId,
      password,
      userNickname,
      userEmail,
      userBirthday,
      userSex,
      categories,
    })
    .then((response) => {
      console.log(response);
    });
};

/* 회원정보 삭제 */
const deleteUserInfo = (userId) => {
  return axios
    .delete(API_URL, {
      userId,
    })
    .then((response) => {
      if (response.status === 'success') {
        // TODO 로그아웃 처리 및 re-directing (이렇게 import해서 호출해도 정상작동하는지 테스트 필요)
        console.log('확인필요!');
        logout();
      }
      return response.data;
    });
};

export default {
  checkId,
  checkNickname,
  checkEmail,
  modifyUserInfo,
  deleteUserInfo,
};
