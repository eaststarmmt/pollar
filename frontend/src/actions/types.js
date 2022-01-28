//? constatnts that indicates the type of action being performed
//* Naming Convention (신지우)
//* : N+V

// auth.js
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_FAIL = 'SIGNUP_FAIL';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';
export const LOGOUT = 'LOGOUT';

// 공통
export const SET_MESSAGE = 'SET_MESSAGE';
export const CLEAR_MESSAGE = 'CLEAR_MESSAGE';

// user.js
// 회원가입 시 아이디 중복검사
export const USERID_VALID = 'USERID_VALID';
export const USERID_INVALID = 'USERID_INVALID';
// 회원가입 시 이메일 중복검사
export const EMAIL_VALID = 'EMAIL_VALID';
export const EMAIL_INVALID = 'EMAIL_INVALID';
// 회원가입 시 닉네임 중복검사
export const NICKNAME_VALID = 'NICKNAME_VALID';
export const NICKNAME_INVALID = 'NICKNAME_INVALID';
