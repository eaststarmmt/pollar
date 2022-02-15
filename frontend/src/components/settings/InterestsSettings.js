import SelectInterests from '../signup/SelectInterests';
import { useEffect, useState } from 'react';
import { setUserInterests, getUserInterests } from '../../services/api/CategoryApi';
import { getLoggedUserId } from '../../utils/loggedUser';
import { Box } from '@mui/material';

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
      alert('성공적으로 반영되었습니다.');
    } else {
      // todo
      alert('오류가 발생했습니다. 잠시 후 시도해주세요 ');
    }
  };

  useEffect(() => {
    getAccountUserInfo();
  }, []);

  return (
    <Box overflow="auto" sx={{ maxWidth: '600px' }}>
      <SelectInterests setConfirm={handleUpdateInterests} setUser={setUser} user={user} />
    </Box>
  );
}
