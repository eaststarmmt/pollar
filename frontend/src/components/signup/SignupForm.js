import React, { useState } from 'react';

import { Stack, TextField, IconButton, InputAdornment } from '@mui/material';
import { Icon } from '@iconify/react';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';

import {
  checkId,
  checkNickname,
  checkEmail,
  emailConfirm,
  emailToken,
} from '../../services/api/UserApi';

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
    emailRegex: false,
    emailUnique: false,
  });

  // error Message
  const errorMsg = {
    IDRegex: '숫자와 영문 조합으로 6~16자까지 가능합니다.',
    IDUnique: '중복되는 아이디가 있습니다.',
    IDUniqueTrue: '유효한 아이디입니다.',
    nicknameRegex: '한글,영어,숫자 조합으로 2~16자 까지 가능하며 특수문자는 불가능합니다.',
    nicknameUnique: '중복되는 닉네임이 있습니다.',
    passwordRegex: '영어, 숫자, 특수문자를 최소 한개씩 포함하며 4~12자까지 가능합니다.',
    passwordConfirm: '비밀번호가 일치하지 않습니다',
    emailRegex: '이메일 형식으로 입력해주세요.',
    emailUnique: '중복되는 이메일이 있습니다. ',
  };

  // userId duplicate check
  const checkIdUnique = async (id) => {
    setUser({
      ...user,
      userId: id,
    });

    const result = await checkId(id);
    if (result) {
      setErrorState({
        ...errorState,
        UserIdUnique: false,
      });
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
  const checkEmailValid = async (email) => {
    var checkEmailRegex =
      /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/.test(
        user.userEmail
      );
    if (!checkEmailRegex) {
      setErrorState({
        ...errorState,
        emailRegex: true,
      });
      const result = await checkEmail(email);
      if (result) {
        setErrorState({
          ...errorState,
          emailUnique: false,
        });
      } else {
        setErrorState({
          ...errorState,
          emailUnique: true,
        });
        // checkEmailUnique(email);
      }
    } else {
      setErrorState({
        ...errorState,
        emailRegex: false,
      });
    }
  };

  const checkEmailUnique = async (email) => {
    const result = await checkEmail(email);
    if (result) {
      setErrorState({
        ...errorState,
        emailUnique: false,
      });
    } else {
      setErrorState({
        ...errorState,
        emailUnique: true,
      });
    }
  };

  // password confirm
  const checkPwValid = (e) => {
    var checkpw = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{4,12}$/.test(
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

  // 이메일 인증메일 발송
  const [message, setMessage] = useState('');
  const [emailSend, setEmailSend] = useState(false);

  const handleEmailSend = async (e) => {
    e.preventDefault();
    try {
      const result = await emailConfirm(user.userEmail);
      // console.log(result);
      if (result) {
        setMessage('인증번호가 발송되었습니다. 5분안에 인증번호를 입력하세요.');
        setEmailSend(true);
      } else {
        setMessage('인증번호 전송 실패.');
        setEmailSend(false);
      }
    } catch (error) {
      setMessage('인증번호가 발송되었습니다.');
      setEmailSend(true);
    }
  };

  // 이메일 인증번호 확인
  const [tokenNumber, setTokenNumber] = useState({
    userEmail: user.userEmail,
    token: '',
  });
  const [tokenMessage, setTokenMessage] = useState('');
  const [tokenState, setTokenState] = useState({
    changeEmail: false,
    tokenValid: false,
  });

  const handleTokenSend = async (e) => {
    e.preventDefault();
    try {
      console.log(tokenNumber);
      // response.data받기
      const response = await emailToken(tokenNumber);
      if (response.message === 'success') {
        // 토큰이 T/F인지 확인
        const tokenResult = response.isValid;
        // 인증번호 확인한 Email이 작성된 Email과 같은지 확인
        const tokenEmail = response.userEmail;

        if (tokenResult) {
          setTokenMessage('이메일 인증 성공');
          setTokenState({
            ...tokenState,
            tokenValid: false,
          });
          if (tokenEmail !== user.userEmail) {
            setTokenState({
              ...tokenState,
              changeEmail: true,
            });
          }
        } else {
          setTokenMessage('이메일 인증 실패');
          setTokenState({
            ...tokenState,
            tokenValid: true,
          });
        }
      }
    } catch (error) {
      setTokenMessage('이메일 인증 실패');
      setTokenState({
        ...tokenState,
        tokenValid: false,
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
              onBlur={(e) => checkIdUnique(e.target.value)}
              // UserIdRegex가 true. -> 유효하지 않다
              error={errorState.UserIdRegex ? errorState.UserIdRegex : errorState.UserIdUnique}
              helperText={
                errorState.UserIdRegex
                  ? errorMsg.IDRegex
                  : errorState.UserIdUnique && errorMsg.IDUnique
              }
            />
          </Stack>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              required
              fullWidth
              autoComplete="email"
              type="email"
              label="Email address"
              value={user.userEmail}
              onChange={(e) =>
                setUser({
                  ...user,
                  userEmail: e.target.value,
                })
              }
              onKeyUp={(e) => checkEmailValid(e.target.value)}
              onBlur={(e) => checkEmailUnique(e.target.value)}
              error={errorState.emailRegex ? errorState.emailRegex : errorState.emailUnique}
              helperText={
                errorState.emailRegex
                  ? errorMsg.emailRegex
                  : errorState.emailUnique
                  ? errorMsg.emailUnique
                  : emailSend && message
              }
            />

            {!user.userEmail || errorState.emailUnique ? (
              <Button fullWidth size="large" variant="contained" disabled>
                이메일 인증
              </Button>
            ) : (
              <Button required fullWidth size="large" variant="contained" onClick={handleEmailSend}>
                이메일 인증
              </Button>
            )}
          </Stack>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              required
              fullWidth
              autoComplete="email-token"
              type="text"
              label="Certification Number"
              value={tokenNumber.token}
              onChange={(e) =>
                setTokenNumber({
                  ...tokenNumber,
                  token: e.target.value,
                })
              }
              error={tokenState.tokenState}
              helperText={tokenMessage}
            />

            {!tokenNumber.token ? (
              <Button fullWidth size="large" variant="contained" disabled>
                인증번호를 입력하세요
              </Button>
            ) : (
              <Button required fullWidth size="large" variant="contained" onClick={handleTokenSend}>
                인증확인
              </Button>
            )}
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
                errorState.nickNameRegex ? errorState.nickNameRegex : errorState.nickNameUnique
              }
              helperText={
                errorState.nickNameRegex
                  ? errorMsg.nicknameRegex
                  : errorState.nickNameUnique && errorMsg.nicknameUnique
              }
            />
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
                  <IconButton edge="end" onClick={() => setShowPassword((prev) => !prev)}>
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
                  userSex: e.target.value,
                })
              }
            >
              <FormControlLabel value={false} control={<Radio />} label="Male" />
              <FormControlLabel value={true} control={<Radio />} label="Female" />
            </RadioGroup>
          </Stack>
          {!user.userId ||
          !user.password ||
          !user.userNickname ||
          !user.userEmail ||
          !user.userBirthday ||
          !user.userSex ? (
            <Button>필수 항목을 모두 작성해주세요</Button>
          ) : !tokenState.changeEmail && tokenNumber.token ? (
            <Button fullWidth size="large" variant="contained" onClick={() => setNext(true)}>
              다음
            </Button>
          ) : (
            <Button>이메일 인증이 필요합니다</Button>
          )}
        </Stack>
      </form>
    </div>
  );
}

export default SignupForm;
