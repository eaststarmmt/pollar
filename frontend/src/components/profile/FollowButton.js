import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { requestFollow, requestUnfollow } from '../../services/api/FollowApi';
import { getLoggedUserId } from '../../utils/loggedUser';

export default function FollowButton({ isFollowButton, accountId, setTriggerRefresh }) {
  const navigate = useNavigate();

  /* 팔로우 버튼 클릭 */
  const handleFollow = async () => {
    const result = await requestFollow({
      followingId: getLoggedUserId(),
      followerId: accountId,
    });
    if (result) {
      console.log(result);
    } else {
      alert('ERROR');
    }
    setTriggerRefresh((curr) => !curr);
    // })
    // .catch((error) => {
    //   // todo 500 페이지 만들기
    //   navigate('/error', { replace: true });
    //   // alert(error);
    // });
  };

  /* 언팔로우 버튼 클릭 */
  const handleUnfollow = async () => {
    const result = await requestUnfollow({
      followingId: getLoggedUserId(),
      followerId: accountId,
    });
    if (result) {
      console.log(result);
    } else {
      alert('ERROR');
    }
    setTriggerRefresh((curr) => !curr);
  };

  return (
    <>
      {isFollowButton ? (
        <Button variant="contained" color="secondary" size="small" onClick={handleFollow}>
          Follow
        </Button>
      ) : (
        <Button variant="outlined" size="small" onClick={handleUnfollow}>
          &nbsp;Unfollow&nbsp;
        </Button>
      )}
    </>
  );
}
