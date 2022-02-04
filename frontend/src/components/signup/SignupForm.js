import React, { useState,  } from 'react';

import { Stack, TextField, IconButton, InputAdornment } from '@mui/material';
import { Icon } from '@iconify/react';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';

import { checkId, checkNickname } from '../../services/api/UserApi';

function SignupForm(props) {

  // props로 상위에 있는 setNext를 받아옴 -> 중괄호 중요
  const { setNext, setUser, user } = props;
  const [showPassword, setShowPassword] = useState(false);

  // error State
  const [errorState, setErrorState] = useState({
    UserIdRegex: false,
    UserIdUnique: false,
    nickNameRegex: false,
    nickNameUnique: false,
    passwordRegex: false,
    passwordConfirm: false,
    EmailRegex:false,
  });

  // error Message
  const errorMsg = {
    IDRegex: '숫자와 영문 조합으로 6~16자까지 가능합니다.',
    IDUnique: '중복되는 아이디가 있습니다.',
    IDUniqueTrue: '유효한 아이디입니다.',
    nicknameRegex:
      '한글,영어,숫자 조합으로 2~16자 까지 가능하며 특수문자는 불가능합니다.',
    nicknameUnique:'중복되는 닉네임이 있습니다.',
    passwordRegex:
      '영어, 숫자, 특수문자를 최소 한개씩 포함하며 4~12자까지 가능합니다.',
    passwordConfirm: '비밀번호가 일치하지 않습니다',
    EmailRegex:'이메일 형식으로 입력해주세요.'
  };


  // userId duplicate check
  const checkIdUnique = async (id) => {
    const result = await checkId(id);
    if (result) {
      setErrorState({
        ...errorState,
        UserIdUnique: false,
      });

      // alert('사용 가능한 아이디입니다!');
    } else {
      setErrorState({
        ...errorState,
        UserIdUnique: true,
      });
    }
  };

  // userId Validation
  const checkIdValid = (id) => {
    var checkId = /^[a-z|A-Z|0-9+|]{5,15}$/g.test(user.userId);
    // console.log('id : ', id);
    if (!checkId) {
      setErrorState({
        ...errorState,
        UserIdRegex: true,
      });
    } else {
      // console.log('성공');
      setErrorState({
        ...errorState,
        UserIdRegex: false,
      });
    }
  };

  // userNickname Validation
  const checkNickValid = (nickname) => {
    var checkNick = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]{1,15}$/.test(user.userNickname);
    if (!checkNick) {
      setErrorState({
        ...errorState,
        nickNameRegex: true,
      });
    } else {
      setErrorState({
        ...errorState,
        nickNameRegex: false,
      });
    }
  };

  // userNickname duplicate check
  const checkNickUnique = async (nick) => {
    const result = await checkNickname(nick);
    // console.log(result)
    if (result) {
      setErrorState({
        ...errorState,
        nickNameUnique: false,
      });
      // alert('사용 가능한 닉네임입니다!');
    } else {
      setErrorState({
        ...errorState,
        nickNameUnique: true,
      });
    }
  };

  // userEmail Validation
  const checkEmailValid = (email) => {
    var checkEmail = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/.test(user.userEmail);
    if (!checkEmail) {
      setErrorState({
        ...errorState,
        EmailRegex: true,
      })
    } else {
      setErrorState({
        ...errorState,
        EmailRegex:false
      })

    }
  }

  // password confirm
  const checkPwValid = (e) => {
    var checkpw =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{4,12}$/.test(
        user.password
      );
    // console.log(checkpw)
    if (!checkpw) {
      setErrorState({
        ...errorState,
        passwordRegex: true,
      });
    } else {
      setErrorState({
        ...errorState,
        passwordRegex: false,
      });
    }
  };

  return (
    <div>
      <form>
        <Stack spacing={3}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              required
              fullWidth
              autoComplete="userId"
              type="text"
              label="userId"
              value={user.userId}
              onChange={(e) =>
                setUser({
                  ...user,
                  userId: e.target.value,
                })
                
              }
              onKeyUp={(e) => checkIdValid(e.target.value)}
              onBlur = {(e) => checkIdUnique(e.target.value)}
              // UserIdRegex가 true. -> 유효하지 않다
              error={
                errorState.UserIdRegex
                  ? errorState.UserIdRegex
                  : errorState.UserIdUnique
              }
              helperText={
                errorState.UserIdRegex
                  ? errorMsg.IDRegex
                  : errorState.UserIdUnique && errorMsg.IDUnique
              }
            />
            {/* <Button
              required
              fullWidth
              size="large"
              variant="contained"
              onClick={() => checkIdUnique(user.userId)}
              // error={errorState.UserIdUnique}
              // helperText={
              //   errorState.UserIdUnique &&
              //    errorMsg.IDUniqueTrue
              // }
            >
              아이디 중복검사
            </Button> */}
          </Stack>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              required
              fullWidth
              autoComplete="email"
              type="email"
              label="Email address"
              value={user.userEmail}
              onChange={(e)=> 
                setUser({
                  ...user,
                  userEmail:e.target.value
                })
              }
              onKeyUp={(e) => checkEmailValid(e.target.value)}
              error={errorState.EmailRegex}
              helperText={errorState.EmailRegex && errorMsg.EmailRegex}

            />
            <Button required fullWidth size="large" variant="contained">
              이메일 인증
            </Button>
          </Stack>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              required
              fullWidth
              autoComplete="userNickname"
              type="text"
              label="Nickname"
              value={user.userNickname}
              onChange={(e) =>
                setUser({
                  ...user,
                  userNickname: e.target.value,
                })
              }
              onKeyUp={(e) => checkNickValid(e.target.value)}
              onBlur={(e) => checkNickUnique(e.target.value)}
              // UserIdRegex가 true. -> 유효하지 않다
              error={
                errorState.nickNameRegex
                  ? errorState.nickNameRegex
                  : errorState.nickNameUnique
              }
              helperText={
                errorState.nickNameRegex
                  ? errorMsg.nicknameRegex
                  : errorState.nickNameUnique && errorMsg.nicknameUnique
              }
            />
            {/* <Button
              required
              fullWidth
              size="large"
              variant="contained"
              onClick={() => checkNickUnique(user.userNickname)}
              // error={errorState.UserIdUnique}
              // helperText={
              //   errorState.UserIdUnique &&
              //    errorMsg.IDUniqueTrue
              // }
            >
              닉네임 중복검사
            </Button> */}
          </Stack>
          <TextField
            required
            fullWidth
            autoComplete="password"
            type={showPassword ? 'text' : 'password'}
            label="비밀번호"
            value={user.password}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    edge="end"
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            onChange={(e) =>
              setUser({
                ...user,
                password: e.target.value,
              })
            }
            onBlur={(e) => checkPwValid(e)}
            error={errorState.passwordRegex}
            helperText={errorState.passwordRegex && errorMsg.passwordRegex}
          />
          {/* 생일 / 성별 */}
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              required
              id="date"
              type="date"
              sx={{ width: 200 }}
              onChange={(e) =>
                setUser({
                  ...user,
                  userBirthday: e.target.value,
                })
                
              }
              InputLabelProps={{
                shrink: true,
                required: true,
              }}
            />
            <FormLabel id="gender-radio-group">Gender</FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={user.userSex}
              onChange={(e) =>
                setUser({
                  ...user,
                  userSex: e.target.value
                })}
            >
              <FormControlLabel value={false} control={<Radio />} label="Male" />
              <FormControlLabel
                value={true}
                control={<Radio />}
                label="Female"
              />
            </RadioGroup>
          </Stack>
          { !user.userId || !user.password || !user.userNickname|| !user.userEmail || !user.userBirthday || !user.userSex ?
          <Button>필수 항목을 모두 작성해주세요</Button>
          : <Button
            fullWidth
            size="large"
            variant="contained"
            onClick={() => setNext(true)}
          >
            다음
          </Button>}
        </Stack>
      </form>
    </div>
  );
}

export default SignupForm;
