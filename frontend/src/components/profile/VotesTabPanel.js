import { Container, Grid } from '@mui/material';
import PollVoteCard from './PollVoteCard';
import { useEffect, useState } from 'react';
import { getUserVotesList } from '../../services/api/ProfileApi';
import { getLoggedUserId } from '../../utils/loggedUser';
// ----------------------------------------------------------------------

export default function VotesTabPanel({ userId }) {
  const [pollList, setPollList] = useState([]);

  /* 사용자가 투표한 투표 목록 요청 */
  const getVotesList = async () => {
    const list = await getUserVotesList(userId);
    setPollList(list);
  };

  useEffect(() => {
    getVotesList();
  }, []);

  return (
    <>
      <Container>
        <Grid container spacing={3}>
          {/* 투표자 익명 투표일 경우에는 숨김처리 (사용자 본인 프로필일 경우 X) */}
          {pollList.map((poll, index) =>
            !poll.voteAnonymousType || userId === getLoggedUserId() ? (
              <PollVoteCard
                key={poll.voteId}
                poll={poll}
                index={index}
                isOwner={userId === getLoggedUserId()}
              />
            ) : null
          )}
        </Grid>
      </Container>
    </>
  );
}
