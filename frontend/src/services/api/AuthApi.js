import instance from '../axiosInstance';

const USER = '/user';

/* 회원가입 */
export const signup = async (userData) => {
  const response = await instance.post(USER + '/signup', userData);
  return response.data;
};

/* 로그인 */
export const login = async (userData) => {
  const response = await instance.post(USER + '/login', userData);
  if (response.data.accessToken) {
    // save JWT token
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
};

/* 로그아웃 */
export const logout = () => {
  // remove JWT from LocalStorage
  localStorage.removeItem('user');
};
