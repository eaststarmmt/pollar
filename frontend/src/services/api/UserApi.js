import { instance, instanceWithAuth } from '../../services/axios';

// 공통되는 경로는 다음과 같이 별도로 정의해둠? (is this nesassary)
const USER = '/user/';

/* 회원가입 */
// const signup = (userData) => {
//   // return instance.post('/user/sign')
//   return instance.post(USER + 'signup', userData).then((response) => {
//     console.log(response);
//   });
// };

/* 아이디 중복검사 */
export const checkId = async (userId) => {
  const response = await instance
    .get(USER + 'idcheck', {
      params: {
        userId: userId,
      },
    });
  return response.data;
};

/* 닉네임 중복검사 */
export const checkNickname = async (userNickname) => {
  const response = await instance
    .get(USER + 'nickcheck', {
      params: {
        userNickname:userNickname,
      }
    });
  console.log(response);
  return response.data;
};

/* 이메일 중복검사 */
// 여기는 왜 post일까
const checkEmail = async (userEmail) => {
  const response = await instance
    .post(USER + 'emailcheck', {
      userEmail,
    });
  console.log(response);
};

