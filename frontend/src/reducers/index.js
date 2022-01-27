//! Combine Reducers
// [설명] Because we only have a single store in a Redux application.
// Use reducer composition instead of many stores to split data handling logic.

import { combineReducers } from 'redux';
import auth from './auth';
import message from './message';
import user from './user';

export default combineReducers({
  auth,
  message,
  user,
});
