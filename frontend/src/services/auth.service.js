import axios from 'axios';

//? Service for user authentication

// TODO http-common.js
//// const API_URL = 'http://localhost:8080/auth/';
const API_URL = 'http://localhost:8080/user/';
// const API_URL = '(deployed)'

/* 회원가입 */
const signup = (userId, password, userNickname, userEmail, userBirthday, userSex, categories) => {
  return axios
    .post(API_URL + 'signup', {
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

/* 로그인 */
// POST {username, password} & save JWT to local storage
const login = (userId, password) => {
  return axios
    .post(API_URL + 'signin', {
      userId,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        // JWT token 저장
        localStorage.setItem('user', JSON.stringify(response.data));
      }
      return response.data;
    });
};

/* 로그아웃 */
// remove JWT from LocalStorage
const logout = () => {
  localStorage.removeItem('user');
};

export default {
  signup,
  login,
  logout,
};
