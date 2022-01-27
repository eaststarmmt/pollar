//? Authentication Actions Creator:
// Redux action creator for actions related to auth(authentication) from APIs.

import { SIGNUP_SUCCESS, SIGNUP_FAIL, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT, SET_MESSAGE } from './types';

// => to make async HTTP requests with one or more 'dispatch' in the result
import AuthService from '../services/auth.service';

/**
 * * calls the AuthService.register(username, email, password)
 * dispatch SIGNUP_SUCCESS and SET_MESSAGE if successful
 * dispatch SIGNUP_FAIL and SET_MESSAGE if failed
 * @returns Promise객체 (for Components using them)
 */
export const signup = (userId, password, userNickname, userEmail, userBirthday, userSex, categories) => (dispatch) => {
  return AuthService.signup(userId, password, userNickname, userEmail, userBirthday, userSex, categories).then(
    (response) => {
      dispatch({
        type: SIGNUP_SUCCESS,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: response.data.message,
      });

      return Promise.resolve();
    },
    (error) => {
      const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

      dispatch({
        type: SIGNUP_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

/**
 * * calls the AuthService.login(username, email, password)
 * dispatch LOGIN_SUCCESS and SET_MESSAGE if successful
 * dispatch LOGIN_FAIL and SET_MESSAGE if failed
 * @returns Promise객체 (for Components using them)
 */
export const login = (userid, password) => (dispatch) => {
  return AuthService.login(userid, password).then(
    (data) => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: { user: data },
      });

      return Promise.resolve();
    },
    (error) => {
      const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

      dispatch({
        type: LOGIN_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const logout = () => (dispatch) => {
  AuthService.logout();

  dispatch({
    type: LOGOUT,
  });
};

export const userInfo = (username) => (dispatch) => {
  return AuthService.userInfo(username).then(
    (data) => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: { user: data },
      });

      return Promise.resolve();
    },
    (error) => {
      const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

      dispatch({
        type: LOGIN_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};
