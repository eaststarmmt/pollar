import axios from 'axios';
import authHeader from './auth-header';

//? Service for accessing data

const API_URL = 'http://localhost:8080/api/test/';

// const getb = () => {
//   return axios.get(API_URL + 'all');
// };

const getNotification = () => {
  return axios.get(API_URL + 'user', { headers: authHeader() });
};

export default {
  getNotification,
  // getInterestsPoll,
  // getRecentPoll,
};
