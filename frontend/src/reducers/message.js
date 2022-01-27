//? Message Reducer
// 다음의 state를 update한다 (when message action is dispatched from anywhere in the application)
// - message

import { SET_MESSAGE, CLEAR_MESSAGE } from '../actions/types';

const initialState = {};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_MESSAGE:
      return { message: payload };

    case CLEAR_MESSAGE:
      return { message: '' };

    default:
      return state;
  }
}
