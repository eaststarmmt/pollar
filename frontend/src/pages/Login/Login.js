import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';

import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';

import { login } from '../../api/authAPI';
import { LoginContainer } from './Login.elements';
import { userState } from '../../atom';

// useSetRecoilState를 활용하여 atom에 userId 저장 

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const Login = (props) => {
  const form = useRef();

  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const onChangeUserId = (e) => {
    const userId = e.target.value;
    setUserId(userId);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const setUserIdState = useSetRecoilState(userState)

  const handleLogin = async (e) => {
    e.preventDefault();

    form.current.validateAll();
    try {
      const result = await login(userId, password);
      // 실패는 "fail"
      if (result.message == 'success') {
        // navigate로 보내기 전에 atom에 userId 저장 
        setUserIdState(userId)
        navigate('/');
      } else {
        setMessage('로그인에 실패하였습니다.');
      }
    } catch (error) {
      setMessage('로그인에 실패하였습니다.');
    }
  };

  return (
    <LoginContainer>
      <div className="col-md-12">
        <div className="card card-container">
          {/* <img src="//ssl.gstatic.com/accounts/ui/avatar_2x.png" alt="profile-img" className="profile-img-card" /> */}

          <Form onSubmit={handleLogin} ref={form}>
            <div className="form-group">
              <label htmlFor="userId">UserId</label>
              <Input
                type="text"
                className="form-control"
                name="userId"
                value={userId}
                onChange={onChangeUserId}
                validations={[required]}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <Input
                type="password"
                className="form-control"
                name="password"
                value={password}
                onChange={onChangePassword}
                validations={[required]}
              />
            </div>

            <div className="form-group">
              <button className="btn btn-primary btn-block">
                <span className="spinner-border spinner-border-sm"></span>
                <span>Login</span>
              </button>
            </div>
            {message && (
              <div className="form-group">
                <div className="alert alert-danger" role="alert">
                  {message}
                </div>
              </div>
            )}
          </Form>
          {/* Social Login */}
          {/* <LoginWith>OR LOGIN WITH</LoginWith>
        <HorizontalRule />
        <IconsContainer>
          <Icon color={GoogleBackground}>
            <FaGoogle />
          </Icon>
          <Icon color={KakaoBackground}>
            <FaComment />
          </Icon>
        </IconsContainer>
        <ForgotPassword>Forgot Password ?</ForgotPassword> */}
        </div>
      </div>
    </LoginContainer>
  );
};

export default Login;
