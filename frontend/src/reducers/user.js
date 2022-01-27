/* User Reducer */

import { USERID_VALID, USERID_INVALID, EMAIL_VALID, EMAIL_INVALID, NICKNAME_VALID, NICKNAME_INVALID } from '../actions/types';

const initialState = {
  isValidId: false,
  isValidEmail: false,
  isValidNickname: false,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case USERID_VALID:
      return {
        ...state,
        isValidId: true,
      };
    case USERID_INVALID:
      console.log('중복됨');
      return {
        ...state,
        isValidId: false,
      };
    // TODO

    default:
      return state;
  }
}
