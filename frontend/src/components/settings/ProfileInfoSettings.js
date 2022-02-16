import { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';
import { getLoggedUserId, getLoggedUserInfo, setLoggedUserInfo } from '../../utils/loggedUser';
// material
import {
  Stack,
  TextField,
  IconButton,
  InputAdornment,
  Button,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Typography,
  Box,
  Collapse,
  Alert,
} from '@mui/material';

import { getUserInfo } from '../../services/api/UserApi';

import { checkNickname, modifyUserInfo, modifyUserPw } from '../../services/api/UserApi';
import ProfileImageUploadButton from '../common/ProfileImageUploadButton';
import { useSetRecoilState } from 'recoil';
import { isUserInfoUpdatedState } from '../../atoms/atoms';

// ----------------------------------------------------------------------

export default function ProfileInfoSettings() {
  // 설정 성공적으로 반영 시 Alert
  const [openSuccessAlert, setOpenSuccessAlert] = useState(false);
  // Recoil로 사용자 정보 (userNickname의 경우) 업데이트 여부를 표현
  const setIsUserInfoUpdated = useSetRecoilState(isUserInfoUpdatedState);

  const [showPassword, setShowPassword] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [newNickname, setNewNickname] = useState('');

  const navigate = useNavigate();

  let year, month, day;
  const [birthday, setBirthday] = useState('');
  const [user, setUser] = useState();

  // error State
  const [errorState, setErrorState] = useState({
    nickNameRegex: false,
    nickNameUnique: false,
    passwordRegex: false,
    passwordConfirm: false,
  });

  // error Message
  const errorMsg = {
    nicknameRegex: '한글,영어,숫자 조합으로 2~16자 까지 가능하며 특수문자는 불가능합니다.',
    nicknameUnique: '중복되는 닉네임이 있습니다.',
    passwordRegex: '영어, 숫자, 특수문자를 최소 한개씩 포함하며 4~12자까지 가능합니다.',
    passwordConfirm: '비밀번호가 일치하지 않습니다',
  };

  // userNickname Validation
  const checkNickValid = () => {
    var checkNick = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]{1,15}$/.test(newNickname);
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

  const checkOriginNick = () => {
    if (newNickname == user.userNickname) {
      return true;
    } else {
      return false;
    }
  };

  // userNickname duplicate check
  const checkNickUnique = async () => {
    const result = await checkNickname(newNickname);
    const sameOriginNick = checkOriginNick();
    // console.log(result)
    if (result || sameOriginNick) {
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

  // password confirm
  // 비밀번호는 그냥 수정으로 보내기. null값으로 잡은 다음에 setState로 변경해서 modify 전송
  const checkPwValid = () => {
    var checkpw = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{4,12}$/.test(
      newPassword
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    const updatedInfo = { ...user, userNickname: newNickname, password: newPassword };
    console.log(updatedInfo);
    let result = await modifyUserPw(newPassword);
    if (result === 'success') result = await modifyUserInfo(updatedInfo);
    // (await modifyUserPw(newPassword)) === 'success' &&
    //   (await modifyUserInfo(updatedInfo)) === 'success';

    if (result === 'success') {
      setOpenSuccessAlert(true);
      //// const updatedInfo = await getUserInfo(getLoggedUserId());
      const updatedInfo = getLoggedUserInfo();
      updatedInfo.userNickname = newNickname;
      console.log(updatedInfo);
      setLoggedUserInfo(updatedInfo);
      // recoil로 사용자 정보 갱신 사실을 알림 -> Navbar에 변경사항 적용되게
      setIsUserInfoUpdated((curr) => !curr);
    } else {
      alert('실패');
    }
  };

  const getUserAccountInfo = async () => {
    const data = await getUserInfo(getLoggedUserId());
    setUser(data);
    setNewNickname(data.userNickname);

    // yyyy-mm-dd로 변경
    year = data.userBirthday.slice(0, 4);
    month = data.userBirthday.slice(5, 7);
    day = data.userBirthday.slice(8, 10);
    setBirthday([year, month, day].join('-'));
  };

  useEffect(() => {
    getUserAccountInfo();
  }, []);

  return (
    <Box mt={4}>
      {/* 한주님 작업공간: 프로필사진 / 닉네임 / 비밀번호 2가지만 변경가능
      <br /> - 비밀번호 확인 방식?
      <br /> - 회원탈퇴 추가
      <br /> - 아래코드 다 삭제하고 하시면 됩니다! (예전 회원가입코드에서 단순 복붙해온 것) */}
      {/* 아이디, 닉네임, 사진, 이메일,  */}
      <Collapse in={openSuccessAlert}>
        <Alert
          severity="success"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpenSuccessAlert(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          variant="filled"
          sx={{ mb: 2 }}
        >
          성공적으로 반영되었습니다.
        </Alert>
      </Collapse>
      {user ? (
        <form onSubmit={handleSubmit}>
          <Stack spacing={4}>
            <Stack direction="row" justifyContent="space-between" spacing={5}>
              <ProfileImageUploadButton size={'15rem'} prevImage={user.userProfilePhoto} />
              <Stack spacing={2} width="100%">
                <TextField
                  id="userid-read-only-input"
                  label="아이디"
                  defaultValue={user.userId}
                  InputProps={{
                    readOnly: true,
                  }}
                  variant="standard"
                />
                <TextField
                  id="email-read-only-input"
                  label="이메일"
                  defaultValue={user.userEmail}
                  InputProps={{
                    readOnly: true,
                  }}
                  variant="standard"
                />
                {/* 생일 / 성별 */}
                <Stack spacing={2}>
                  <TextField
                    id="date"
                    type="date"
                    label="생일"
                    sx={{ width: 200 }}
                    value={birthday}
                    InputProps={{
                      readOnly: true,
                    }}
                    variant="standard"
                  />
                  {/* </Stack> */}
                  <Stack direction={{ xs: 'column', sm: 'row' }} alignItems="center" spacing={2}>
                    <FormLabel id="gender-radio-group" sx={{ fontSize: 12 }}>
                      성별
                    </FormLabel>
                    <RadioGroup
                      row
                      aria-labelledby="demo-controlled-radio-buttons-group"
                      name="controlled-radio-buttons-group"
                      value={user.userGender}
                      disabled
                    >
                      <FormControlLabel
                        value={false}
                        control={<Radio />}
                        label="남성"
                        disabled={user.userGender}
                      />
                      <FormControlLabel
                        value={true}
                        control={<Radio />}
                        label="여성"
                        disabled={!user.userGender}
                      />
                    </RadioGroup>
                  </Stack>
                </Stack>
              </Stack>
            </Stack>

            {/* 닉네임 */}
            <Stack spacing={2}>
              <Typography variant="subtitle1">닉네임 변경</Typography>
              <TextField
                required
                fullWidth
                autoComplete="text"
                type="text"
                label="닉네임"
                value={newNickname}
                onChange={(e) => setNewNickname(e.target.value)}
                onKeyUp={() => checkNickValid()}
                onBlur={() => checkNickUnique()}
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
              <Typography variant="subtitle1">비밀번호 수정</Typography>
              {/* 비밀번호 그냥 적고 수정 */}
              <TextField
                required
                fullWidth
                autoComplete="password"
                type={showPassword ? 'text' : 'password'}
                label="새 비밀번호"
                value={newPassword}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton edge="end" onClick={() => setShowPassword((prev) => !prev)}>
                        <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                onChange={(e) => setNewPassword(e.target.value)}
                onBlur={() => checkPwValid()}
                error={errorState.passwordRegex}
                helperText={errorState.passwordRegex && errorMsg.passwordRegex}
              />
            </Stack>

            {!newNickname || !newPassword ? (
              <Button>수정할 항목들을 입력해주세요</Button>
            ) : (
              <Button fullWidth size="large" variant="contained" type="submit">
                정보 수정
              </Button>
            )}
          </Stack>
        </form>
      ) : null}
    </Box>
  );
}
