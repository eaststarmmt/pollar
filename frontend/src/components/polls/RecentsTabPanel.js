import { ImageList } from '@mui/material';
import { useEffect, useState } from 'react';
import { getRecentPollList } from '../../services/api/PollApi';
import PollDetailCard from './PollDetailCard';

export default function RecentsTabPanel() {
  const [pollList, setPollList] = useState([]);

  /* 최신순 (전체) 투표 목록 요청 */
  const getPollList = async () => {
    const list = await getRecentPollList();
    console.log(list);
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
