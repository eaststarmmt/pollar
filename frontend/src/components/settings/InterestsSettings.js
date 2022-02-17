import SelectInterests from '../signup/SelectInterests';
import { useEffect, useState } from 'react';
import { setUserInterests, getUserInterests } from '../../services/api/CategoryApi';
import { getLoggedUserId } from '../../utils/loggedUser';
import { Box, Snackbar } from '@mui/material';

export default function InterestsSettings() {
  const [user, setUser] = useState({
    categories: [],
  });
  /* 사용자 계정 정보 API 호출 */
  const getAccountUserInfo = async () => {
    // const data = await getUserInfo(getLoggedUserId());
    const data = await getUserInterests(getLoggedUserId());
    setUser({ categories: data });
  };

  /* 관심분야 재설정 */
  const handleUpdateInterests = async (categories) => {
    console.log(categories);
    const result = await setUserInterests(categories);
    if (result === 'success') {
      // todo
      setAlertState({
        ...alertState,
        success: true,
      });
      openSuccessAlert();
    } else {
      // todo
      setAlertState({
        ...alertState,
        fail: true,
      });
      openSuccessAlert();
    }
  };

  // snackbar
  const [alert, setAlert] = useState({
    open: false,
    vertical: 'bottom',
    horizontal: 'left',
  });

  const { vertical, horizontal, open } = alert;
  const [alertState, setAlertState] = useState({
    success: false,
    fail: false,
  });

  const alertMsg= {
    success:'성공적으로 반영되었습니다.',
    fail: '오류가 발생했습니다. 잠시 후 시도해주세요 '
  }
  const openSuccessAlert = () => {
    setAlert({
      ...alert,
      open: true,
    });
  };
  const closeSuccessAlert = () => {
    setAlert({
      ...alert,
      open: false,
    });
    setAlertState({
      successs: false,
      fail: false,
    });
  };

  useEffect(() => {
    getAccountUserInfo();
  }, []);

  return (
    <>
    {alertState.success ? (
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={closeSuccessAlert}
        message={alertMsg.success}
        autoHideDuration={2000}
      />
    ) : alertState.fail && (
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={closeSuccessAlert}
        message={alertMsg.fail}
        autoHideDuration={2000}
      />
    ) }
    <Box overflow="auto" sx={{ maxWidth: '600px' }}>
      <SelectInterests setConfirm={handleUpdateInterests} setUser={setUser} user={user} />
    </Box>
    </>
  );
}
