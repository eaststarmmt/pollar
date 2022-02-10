import * as Yup from 'yup';
import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
import { Icon } from '@iconify/react';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
import CloseIcon from '@mui/icons-material/Close';

// material
import {
  Link,
  Stack,
  Checkbox,
  TextField,
  IconButton,
  InputAdornment,
  FormControlLabel,
  Collapse,
  Alert,
  Typography,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// api
import { login } from '../../services/api/AuthApi';
import { useSetRecoilState } from 'recoil';
import { loggedUserState } from '../../atoms/atoms';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  // 로그인 실패 시 Alert
  const [openAlert, setOpenAlert] = useState(false);

  const setLoggedUserState = useSetRecoilState(loggedUserState);

  const LoginSchema = Yup.object().shape({
    userId: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      userId: '',
      password: '',
      // remember: true,
    },
    validationSchema: LoginSchema,
    onSubmit: async () => {
      await handleLogin(values);
    },
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  const handleLogin = async (loginInfo) => {
    try {
      const result = await login(loginInfo);
      console.log(result);
      if (result.message == 'success') {
        // 로그인 성공한 userId와, response로 온 userNickname을 atom에 저장
        setLoggedUserState({
          userId: loginInfo.userId,
          userNickname: result.userNickname,
        });
        //// navigate('/');
        navigate('/', { replace: true });
      } else {
        setOpenAlert(true);
      }
    } catch (error) {
      setOpenAlert(true);
    }
  };

  return (
    <>
      <Collapse in={openAlert}>
        <Alert
          severity="error"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpenAlert(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          variant="filled"
          sx={{ mb: 2 }}
        >
          로그인 실패! 입력정보를 확인하세요
        </Alert>
      </Collapse>
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField
              fullWidth
              autoComplete="username"
              type="userId"
              label="Username"
              {...getFieldProps('userId')}
              error={Boolean(touched.userId && errors.userId)}
              helperText={touched.userId && errors.userId}
              value={formik.values.userId}
              onChange={formik.handleChange}
              // onChange={(userId) => {
              //   setUserId(userId.target.value);
              // }}
            />

            <TextField
              fullWidth
              autoComplete="current-password"
              type={showPassword ? 'text' : 'password'}
              label="Password"
              {...getFieldProps('password')}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleShowPassword} edge="end">
                      <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              error={Boolean(touched.password && errors.password)}
              helperText={touched.password && errors.password}
              value={formik.values.password}
              onChange={formik.handleChange}

              // onChange={(password) => {
              //   setPassword(password.target.value);
              // }}
            />
          </Stack>
          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
            sx={{ mt: 4, mb: 1 }}
          >
            Login
          </LoadingButton>

          <Stack direction="row" alignItems="center" justifyContent="space-between">
            {/* <FormControlLabel
              control={<Checkbox {...getFieldProps('remember')} checked={values.remember} />}
              label="Remember me"
            /> */}
            <Typography variant="body2" color="text.secondary">
              Forgot{' '}
              <Link component={RouterLink} variant="subtitle2" to="#">
                username
              </Link>{' '}
              /{' '}
              <Link component={RouterLink} variant="subtitle2" to="#">
                password
              </Link>
              ?
            </Typography>
          </Stack>
        </Form>
      </FormikProvider>
    </>
  );
}
