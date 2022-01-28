import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Form from 'react-validation/build/form';
import CheckButton from 'react-validation/build/button';
import { isEmail } from 'validator';

import { signup } from '../../actions/auth';
import { checkId } from '../../actions/user';

// material-ui
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Fab from '@mui/material/Fab';

import { Box, Card, Link, Container, Typography } from '@mui/material';
// import RegisterForm from './RegisterForm';

// import NavigationIcon from '@mui/icons-material/Navigation';
import {
  SignupContainer,
  MainContainer,
  WelcomeText,
  InputContainer,
  ButtonContainer,
  // Button,
  LoginWith,
  HorizontalRule,
  IconsContainer,
  // Icon,
  StyledButton,
  StyledIcon,
  StyledInput,
  ForgotPassword,
} from './Signup.elements';
import { FaGoogle, FaComment } from 'react-icons/fa';

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required! (필수항목)
      </div>
    );
  }
};

const validEmail = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid email. (이메일 유효성검사)
      </div>
    );
  }
};

const validateUsername = (value) => {
  // 아이디 길이 유효성 검사
  if (value.length < 6 || value.length > 16) {
    return (
      <div className="alert alert-danger" role="alert">
        The username must be between 6 and 16 characters. 영어와 숫자로만 구성되며 6~16자까지 가능, 아이디 중복 체크해야한다.
      </div>
    );
  } else {
    // 중복 아이디 검사
  }
};

const vnickname = (value) => {
  if (value.length < 2 || value.length > 16) {
    return (
      <div className="alert alert-danger" role="alert">
        한글, 영어, 숫자로 구성된 2~16자까지 가능, 특수문자는 불가능 닉네임 중복체크가 필요하다.
      </div>
    );
  }
};

const vpassword = (value) => {
  if (value.length < 4 || value.length > 12) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 4 and 12 characters. 영어,숫자,특수문자 최소 한 개 씩 포함하며 4~12자까지 가능하다.
      </div>
    );
  }
};

const Signup = () => {
  const form = useRef();
  const checkBtn = useRef();

  // 아이디 (userId)
  const [username, setUsername] = useState('');
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [birthday, setBirthday] = useState('');
  // userSex
  const [gender, setGender] = useState('');
  // categories
  const [interests, setInterests] = useState('');

  const [successful, setSuccessful] = useState(false);

  const { message } = useSelector((state) => state.message);
  const { isValidId } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const onChangeUsername = (e) => {
    console.log(e);
    const username = e.target.value;
    setUsername(username);
    // 아이디 중복검사 (이 코드의 위치가 맞는지는 의문)
    dispatch(checkId(username))
      .then(() => {
        console.log(username + '    ' + isValidId);
      })
      .catch(() => {});
  };

  const onChangeNickname = (event) => {
    const nickname = event.target.nickname;
    setNickname(nickname);
  };

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const onChangeBirthday = (event) => {
    const birthday = event.target.value;
    setBirthday(birthday);
  };

  const onChangeGender = (event) => {
    const gender = event.target.value;
    setGender(gender);
  };

  const onInterestsChange = (event) => {};

  const handleRegister = (e) => {
    e.preventDefault();

    setSuccessful(false);

    form.current.validateAll();

    // TODO
    dispatch(signup(username, password, nickname, email, birthday, gender, []))
      .then(() => {
        setSuccessful(true);
      })
      .catch(() => {
        setSuccessful(false);
      });
  };

  // TODO 지우자
  const GoogleBackground = 'linear-gradient(to right, #a11d0e 0%, #e80541 40%, #a11d0e 100%)';
  const KakaoBackground = 'linear-gradient(to right, #e8d105 0%, #f5e342 40%, #e8d105 100%)';

  return (
    <SignupContainer>
      <MainContainer>
        <WelcomeText>Sign Up</WelcomeText>
        <InputContainer>
          <div className="col-md-12">
            <div className="card card-container">
              <img src="//ssl.gstatic.com/accounts/ui/avatar_2x.png" alt="profile-img" className="profile-img-card" />
            </div>
          </div>
          <Form onSubmit={handleRegister} ref={form}>
            {!successful && (
              <div>
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="username"
                    value={username}
                    // onChange={onChangeUsername}
                    onFocus={onChangeUsername}
                    validations={[required, validateUsername]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="nickname">Nickname</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="nickname"
                    value={nickname}
                    onChange={onChangeNickname}
                    validations={[required, vnickname]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="email"
                    value={email}
                    onChange={onChangeEmail}
                    validations={[required, validEmail]}
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
                    validations={[required, vpassword]}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <Input
                    type="password"
                    className="form-control"
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={onChangePassword}
                    // validations={[required, vpassword]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="birthday">Birthday</label>
                  <Input
                    type="date"
                    className="form-control"
                    name="birthday"
                    value={birthday}
                    onChange={onChangeBirthday}
                    // validations={[required, vpassword]}
                  />
                </div>
                <GenderRowRadioButtonsGroup />

                <ButtonContainer className="form-group">
                  <Button content="Sign Up" />
                </ButtonContainer>
                {/* <Fab variant="extended" color="primary" aria-label="add">
                  <NavigationIcon sx={{ mr: 1 }} />
                  Extended
                </Fab> */}
              </div>
            )}

            {message && (
              <div className="form-group">
                <div className={successful ? 'alert alert-success' : 'alert alert-danger'} role="alert">
                  {message}
                </div>
              </div>
            )}
            <CheckButton style={{ display: 'none' }} ref={checkBtn} />
          </Form>
        </InputContainer>
      </MainContainer>
    </SignupContainer>
  );
};

function Button({ content }) {
  return <StyledButton>{content}</StyledButton>;
}

function Icon({ color, children }) {
  return <StyledIcon background={color}>{children}</StyledIcon>;
}

function Input({ type, placeholder, value, onChange, validations }) {
  return <StyledInput className="form-control" type={type} placeholder={placeholder} value={value} onFocus={onChange} validations={validations} />;
}

function GenderRowRadioButtonsGroup() {
  return (
    <FormControl>
      <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
      <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" name="row-radio-buttons-group">
        <FormControlLabel value="true" control={<Radio />} label="남자" />
        <FormControlLabel value="false" control={<Radio />} label="여자" />
      </RadioGroup>
    </FormControl>
  );
}

export default Signup;
