import {
  Box,
  Button,
  Card,
  Link,
  Stack,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from '@mui/material';
import SelectInterests from './SelectInterests';
import SignupForm from './SignupForm';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

import { Fragment, useState } from 'react';
import ImageUploadButton from '../common/ImageUploadButton';
import { signup } from '../../services/api/AuthApi';

const steps = ['기본정보', '관심분야 선택', '프로필 완성'];

const SignupStepper = ({ activeStep }) => {
  return (
    <Box sx={{ width: '50%', pb: 5 }}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          // if (isStepOptional(index)) {
          //   labelProps.optional = <Typography variant="caption">Optional</Typography>;
          // }
          // if (isStepSkipped(index)) {
          //   stepProps.completed = false;
          // }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
    </Box>
  );
};

export default function SignupWizard() {
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());

  const navigate = useNavigate();

  //// const [next, setNext] = useState(false);
  const [user, setUser] = useState({
    userId: '',
    password: '',
    userNickname: '',
    userEmail: '',
    userBirthday: '',
    userGender: false,
    categories: [],
    userProfilePhoto: '',
  });

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    // 회원가입 완료 버튼 클릭 (2단계: 관심분야 선택에서 회원가입 요청됨)
    // if (activeStep === steps.length - 1) {
    if (activeStep === 1) {
      console.log(user);
      console.log('회원가입 요청 ');
      handleSignup();
    }
    // 이전 단계들
    else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setSkipped(newSkipped);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleSignup = async () => {
    const result = await signup(user);
    if (result == 'success') {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    } else {
      alert('회원가입에 문제가 발생했습니다. 다시 시도해주세요.');
    }
  };

  const handleNavigateLogin = () => {
    navigate('/users/login', { replace: true });
  };

  return (
    <>
      <Card
        sx={{
          px: 8,
          py: 8,
          backgroundColor: '#fffd',
          backdropFilter: 'saturate(200%) blur(50px)',
          boxShadow: '2px 2px 20px 10px rgba(0, 0, 0, 0.1)',
          overflow: 'visible',
        }}
      >
        <Stack direction="row" justifyContent="space-between" spacing={2}>
          <Box sx={{ mb: 5 }}>
            <Typography variant="h3" gutterBottom color="primary">
              Sign Up
            </Typography>
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
                Already have an account?&nbsp;
              </Typography>
              <Typography variant="subtitle2">
                <Link to="../login" component={RouterLink}>
                  Login
                </Link>
              </Typography>
            </Stack>
          </Box>
          <SignupStepper activeStep={activeStep} />
        </Stack>
        {activeStep === steps.length ? (
          <Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>환영합니다! 회원가입이 완료되었습니다</Typography>
            <ImageUploadButton size={'20rem'} />
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button onClick={handleNavigateLogin}>로그인하러 가기</Button>
            </Box>
          </Fragment>
        ) : (
          <Fragment>
            <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
              {activeStep === 0 ? (
                <SignupForm setConfirm={handleNext} setUser={setUser} user={user} />
              ) : activeStep === 1 ? (
                <SelectInterests setConfirm={handleNext} setUser={setUser} user={user} />
              ) : (
                <Stack width="100%" spacing={3} alignItems="center">
                  <Typography sx={{ mt: 2, mb: 1, width: '100%', textAlign: 'center' }}>
                    환영합니다! 회원가입이 완료되었습니다
                  </Typography>
                  <ImageUploadButton size={'20rem'} userId={user.userId} />
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      pt: 2,
                    }}
                  >
                    {/* <Box sx={{ flex: '1 1 auto' }} /> */}
                    <Button
                      onClick={handleNavigateLogin}
                      sx={{
                        position: 'absolute',
                        right: 0,
                        bottom: 0,
                        marginRight: 10,
                        marginBottom: 5,
                      }}
                    >
                      로그인하러 가기
                    </Button>
                  </Box>
                </Stack>
              )}
            </Box>

            {/* <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Button color="inherit" disabled={activeStep < 2} onClick={handleBack} sx={{ mr: 1 }}>
                뒤로
              </Button>
              <Box sx={{ flex: '1 1 auto' }} />
              {isStepOptional(activeStep) && (
                <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                  나중에 하기
                </Button>
              )}

              <Button onClick={handleNext}>
                {activeStep === steps.length - 1 ? '회원가입 완료' : '확인'}
              </Button>
            </Box> */}
          </Fragment>
        )}
      </Card>
    </>
  );
}
