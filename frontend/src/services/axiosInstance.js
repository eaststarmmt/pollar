import axios from 'axios';
import { logout } from './api/AuthApi';
import { createBrowserHistory } from 'history';

//? 해결: line19에 배치. '그 당시 시점'에서 localStorage를 참조해야된다
//// const user = JSON.parse(localStorage.getItem('user'));

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'Content-type': 'application/json',
    // For Spring Boot back-end
    //// Authorization: 'Bearer ' + user.accessToken,
  },
});

instance.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem('user'));
    // 토큰(JWT)이 존재하는 경우
    if (user && user.accessToken) {
      // console.log('토큰 존재. Header에 jwt 담아서 보냅니다');
      // For Spring Boot back-end
      config.headers.Authorization = 'Bearer ' + user.accessToken;
    }
    // console.log(config);
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

// HTTP response 인터셉터
instance.interceptors.response.use(
  (response) => {
    // console.log(response);
    return response;
  },
  function (error) {
    // const history = createBrowserHistory({ forceRefresh: true });
    const history = createBrowserHistory();
    if (error.response) {
      switch (error.response.status) {
        case 401:
          console.log(error.response);
          //  1. Redirect user to LOGIN
          alert('로그인 안된 사용자. 이 페이지에 접근불가');
          history.push('/users/login');
          //! history.push() 만 했을 때, url만 변경이 되고, 페이지가 reload되지 않는 문제
          // (https://stackoverflow.com/questions/42941708/react-history-push-is-updating-url-but-not-navigating-to-it-in-browser)
          // 강제로 새로고침 (임시)
          window.location.reload();
          //  2. Reset authentication from localstorage/sessionstorage
          logout();
          break;
      }
    }
    // return Promise.reject(error.response.data);
  }
);

export default instance;
