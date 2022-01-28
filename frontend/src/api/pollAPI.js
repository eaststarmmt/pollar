import axios from 'axios';
import authHeader from './auth-header';

//? Service for accessing data

const API_URL = 'http://localhost:8080/';

// const getb = () => {
//   return axios.get(API_URL + 'all');
// };

const getTrendingPoll = () => {
  return axios.get(API_URL + 'user', { headers: authHeader() });
};

const getInterestsPoll = () => {
  return axios.get(API_URL + 'mod', { headers: authHeader() });
};

const getRecentPoll = () => {
  return axios.get(API_URL + 'admin', { headers: authHeader() });
};

export default {
  getTrendingPoll,
  getInterestsPoll,
  getRecentPoll,
};
