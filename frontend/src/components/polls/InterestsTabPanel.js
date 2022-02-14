import { Grid, ImageList } from '@mui/material';
import { useEffect, useState } from 'react';
import { getInterestPollList } from '../../services/api/PollApi';
import PollDetailCard from './PollDetailCard';

export default function InterestsTabPanel() {
  const [pollList, setPollList] = useState([]);

  /* 사용자 관심분야 투표 목록 요청 */
  const getPollList = async () => {
    const list = await getInterestPollList();
    setPollList(list);
  };

  useEffect(() => {
    getPollList();
  }, []);

  return (
    <ImageList
      variant="masonry"
      cols={2}
      // gap={20}
      sx={{
        width: '100%',
        paddingX: 3,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {/* <Grid container spacing={3}> */}
      {pollList.map((poll, index) => (
        <PollDetailCard key={poll.voteId} poll={poll} index={index} />
      ))}
      {/* </Grid> */}
    </ImageList>
  );
}
