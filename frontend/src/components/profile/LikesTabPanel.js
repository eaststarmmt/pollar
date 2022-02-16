import { Grid } from '@mui/material';
import PollLikedCard from './PollLikedCard';
import { useEffect, useState } from 'react';
import { getUserLikesList } from '../../services/api/ProfileApi';

export default function LikesTabPanel({ userId }) {
  const [pollList, setPollList] = useState([]);

  /* 사용자가 '좋아요' 누른 투표 목록 요청 */
  const getLikesList = async () => {
    const list = await getUserLikesList(userId);
    console.log(list);
    setPollList(list);
  };

  useEffect(() => {
    getLikesList();
  }, []);

  return (
    <>
      <Grid container spacing={3}>
        {pollList.map((poll, index) => (
          <PollLikedCard key={poll.voteId} poll={poll} index={index} />
        ))}
      </Grid>
    </>
  );
}
