// ? User Actions Creator:
// Redux action creator for actions related to user from APIs.

import { USERID_VALID, USERID_INVALID, EMAIL_VALID, EMAIL_INVALID, NICKNAME_VALID, NICKNAME_INVALID } from './types';

import UserService from '../services/user.service';

export const checkId = (userId) => (dispatch) => {
  return UserService.checkId(userId).then(
    (response) => {
      response
        ? dispatch({
            type: USERID_VALID,
          })
        : dispatch({
            type: USERID_INVALID,
          });

      return Promise.resolve();
    },
    (error) => {
      dispatch({
        type: USERID_INVALID,
      });

      return Promise.reject();
    }
  );
};
