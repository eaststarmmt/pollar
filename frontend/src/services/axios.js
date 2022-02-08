import axios from 'axios';

// axios 객체 생성
function createInstance() {
  return axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
      'Content-type': 'application/json',
    },
  });
}

// header에 jwt가 있는 axios 객체 생성
function createIntstanceWithAuth() {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user && user.accessToken) {
    return axios.create({
      baseURL: process.env.REACT_APP_API_URL,
      headers: {
        'Content-type': 'application/json',
        // For Spring Boot back-end
        Authorization: 'Bearer ' + user.accessToken,
      },
    });
  } else {
    console.log(user);
    // alert('로그인 안된 사용자. 이 페이지에 접근불가');
  }
}

export const instance = createInstance();
export const instanceWithAuth = createIntstanceWithAuth();
