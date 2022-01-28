import React, { useState, useRef } from 'react';

import { Stack, TextField, IconButton, InputAdornment } from '@mui/material';
// import { LoadingButton } from '@mui/lab';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import Grid from '@mui/material/Grid';

import { checkId } from "../../api/userAPI"

function SignupForm() {
  const [showPassword, setShowPassword] = useState(false);

//  user
const [user, setUser] = useState({
    userId : "",
    ninkname : "",
    email : "",
    password : "",
    birthday : "",
    sex : true,
    enterest : []
})

const [errorState, setErrorState] = useState({
    UserIdRegex : false,
    UserIdUnique : false,
    nickNameRegex : false,
    passwordRegex : false,
    passwordConfirm: false,
})

// error Message
const errorMsg = {
    IDRegex: "영어와 숫자로만 구성되며 6~16자까지 가능합니다.",
    IDUnique : "중복되는 아이디가 있습니다.",
    nicknameRegex : "한글,영어,숫자로 구성된 2~16자 까지 가능합니다. 특수문자는 불가능합니다.",
    passwordRegex : "영어, 숫자, 특수문자 최소 한개씩 포함하며 4~12자까지 가능합니다.",
    passwordConfirm : "비밀번호가 일치하지 않습니다",
}

  //성별 선택
  const [value, setValue] = React.useState('female');
  //생년 월일
  const [date, setDate] = useState(new Date('2014-08-18T21:11:54'));

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const checkIdUnique = async (id) => {
    const result = await checkId(id)
    console.log("result : ", result)
  }

  //아이디 유효성 검사 
  const checkIdVaild = (id) => {
      if(id.length >= 6 && id.length <= 16){
        var IDRegex = /^[A-Za-z0-9+]*$/;
        if(!IDRegex.test(id)){
            setErrorState({
                ...errorState,
                UserIdRegex : true
            })
            checkIdUnique(id)
        }else{
            setErrorState({
                ...errorState,
                UserIdRegex : false
            })
        }
      }else{
          setErrorState({
              ...errorState,
              UserIdRegex : true
          })
      }
  }
  
  // password confirm
  const [ pwConfirm, setPwConfirm ] = useState('');

  const checkPwValid = (e) => {
    var checkpw = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{4,12}$/.test(user.password)
    // console.log(checkpw)
    if(!checkpw) {
      setErrorState({
        ...errorState,
        passwordRegex: true
      })
    } else {
      setErrorState({
        ...errorState,
        passwordRegex: false
      })
    }
  }
  //비밀번호 확인 
  const pwDoubleCheck = (e) => {
    if (user.password != e.target.value ) {
      setErrorState({
        ...errorState,
        passwordConfirm: true
      })
    }
    else {
      setErrorState({
        ...errorState,
        passwordConfirm: false
      })
    }
  }
    
    return (
    <div>
      <form>
        <Stack spacing={3}>
          {/* <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField fullWidth label="" />
            
            <TextField fullWidth />
          </Stack> */}
          <TextField
            fullWidth
            autoComplete="userId"
            type="text"
            label="userId"
            value={user.userId}
            onChange = {(e) => setUser({
              ...user,
              userId : e.target.value
            })}
            onBlur={(e) => checkIdVaild(e.target.value)}
            error={errorState.UserIdRegex}
            helperText={errorState.UserIdRegex && errorMsg.IDRegex}
            />
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              fullWidth
              autoComplete="email"
              type="email"
              label="Email address"
              />
          {/* <Grid item xs={4}> */}
            <Button
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              // ={isSubmitting}
              >
              이메일 인증
            </Button>
          {/* </Grid> */}
          </Stack>
          <TextField
            fullWidth
            autoComplete="userNickname"
            type="text"
            label="Nickname"
            />
          <TextField
            fullWidth
            autoComplete="password"
            type={showPassword ? 'text' : 'password'}
            label="비밀번호"
            value={user.password}
            // {...getFieldProps('password')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    edge="end"
                    onClick={() => setShowPassword((prev) => !prev)}
                    >
                    {showPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            onChange={(e)=> setUser({
                ...user,
                password : e.target.value
              })}
              onBlur = {(e)=> checkPwValid(e)}
              error={errorState.passwordRegex}
              helperText={errorState.passwordRegex && errorMsg.passwordRegex}  
              />
          <TextField
            fullWidth
            autoComplete="passwordConfirm"
            type={showPassword ? 'text' : 'password'}
            label="비밀번호 확인"
            // {...getFieldProps('password')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    edge="end"
                    onClick={() => setShowPassword((prev) => !prev)}
                    >
                    {showPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            onBlur = {(e)=> pwDoubleCheck(e)}
            error={errorState.passwordConfirm}
            helperText={errorState.passwordConfirm && errorMsg.passwordConfirm}
            required

            />
          {/* 성별, 생일  */}

          <FormLabel id="demo-controlled-radio-buttons-group">Gender</FormLabel>
          <RadioGroup
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            value={value}
            onChange={handleChange}
            >
            <FormControlLabel
              value="female"
              control={<Radio />}
              label="Female"
              />
            <FormControlLabel value="male" control={<Radio />} label="Male" />
          </RadioGroup>

          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Basic example"
              value={date}
              onChange={(newValue) => {
                setDate(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
              />
          </LocalizationProvider>

          <Button
            fullWidth
            size="large"
            variant="contained"
            >
            다음
          </Button>
        </Stack>
      </form>
    </div>
  );
  
}
  
  export default SignupForm;
  