import Container from '@mui/material/Container';

import { Box, Card } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import FeedTabs from '../components/profile/FeedTabs';
import Profile from '../components/profile/Profile';
import { getProfileInfo } from '../services/api/ProfileApi';
import { getLoggedUserId } from '../utils/loggedUser';
import { getTotalUploadsCount, getTotalVotesCount } from '../services/api/PollApi';
import { useRecoilValue } from 'recoil';
import { isLoggedState } from '../atoms/atoms';

const style = {
  p: 2,
  mx: { xs: 2, lg: 3 },
  mt: 6,
  // mb: 0,
  backgroundColor: '#fff6',
  // backgroundColor: ({ palette: { white }, functions: { rgba } }) => rgba(white.main, 0.8),
  backdropFilter: 'saturate(200%) blur(30px)',
  /* offset-x | offset-y | blur-radius | spread-radius | color */
  boxShadow: '2px 2px 20px 10px rgba(0, 0, 0, 0.1)',
  overflow: 'visible',
};

export default function ProfilePage() {
  // 로그인된 사용자만 사용가능 (recoil state watch하자)
  const isLogged = useRecoilValue(isLoggedState);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogged && getLoggedUserId() === null) {
      // todo
      alert('회원에게만 제공되는 서비스입니다. ');
      navigate('/users/login');
    }
  }, []);

  let { userId } = useParams();
  const [profileId, setProfileId] = useState(userId);

  // 로그인되어있는 사용자의 Id
  const loggedUserId = getLoggedUserId();
  // 사용자 계정 정보
  const [profileInfo, setProfileInfo] = useState();
  // 사용자 본인의 계정 여부
  const [isOwnerAccount, setIsOwnerAccount] = useState(false);
  // 화면 refresh
  const [triggerRefresh, setTriggerRefresh] = useState(false);

  const checkIfOwnerAccount = () => {
    if (typeof userId === 'undefined' || (loggedUserId && loggedUserId === userId)) {
      if (loggedUserId) {
        userId = loggedUserId;
        setProfileId(loggedUserId);
        setIsOwnerAccount(true);
      } else {
        // alert('잘못된 접근입니다. 로그인하세요');
        // 에러페이지로 이동
        // navigate('/error', { replace: true });
      }
    } else setIsOwnerAccount(false);
  };
  //// const isOwnerAccount = typeof userId === 'undefined' && userId === getLoggedUserId();

  /* 사용자 계정 프로필 정보 API 호출 */
  const getAccountProfileInfo = async () => {
    const data = await getProfileInfo(userId);

    // 사용자 총 업로드 수
    data.totalPollCount = await getTotalUploadsCount(userId);
    // 사용자 총 투표 수
    data.totalVoteCount = await getTotalVotesCount(userId);

    setProfileInfo(data);
  };

  useEffect(() => {
    checkIfOwnerAccount();
    // 사용자 계정정보 요청
    getAccountProfileInfo();
  }, [userId, triggerRefresh]);

  return (
    <>
      <Box bgColor="white">
        <Container>
          <Card sx={style}>
            {/* isOwnerAccount - 사용자 본인의 프로필: true, 다른 사용자의 프로필: false */}
            <Profile
              profileInfo={profileInfo}
              isOwnerAccount={isOwnerAccount}
              setTriggerRefresh={setTriggerRefresh}
            />
            <Box bgColor="white" minHeight="60vh">
              <FeedTabs userId={profileId} />
            </Box>
          </Card>
        </Container>
      </Box>
    </>
  );
}
