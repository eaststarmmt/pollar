import PollDetailCard from './PollDetailCard';

import { Grid, ImageList, Typography } from '@mui/material';
import GradAnimatedButton from '../common/GradAnimatedButton';
import { useEffect, useState } from 'react';
import { getUserUploadsList } from '../../services/api/ProfileApi';
import { getLoggedUserId } from '../../utils/loggedUser';
// ----------------------------------------------------------------------

export default function UploadsTabPanel({ userId }) {
  const [pollList, setPollList] = useState([]);

  /* 사용자가 업로드한 투표 목록 요청 */
  const getUploadsList = async () => {
    const list = await getUserUploadsList(userId);
    setPollList(list);
  };

  useEffect(() => {
    if (typeof userId !== 'undefined') getUploadsList();
  }, [userId]);

  return (
    <>
      {/* 업로드한 투표 리스트 */}
      {/* <Grid container spacing={3}> */}
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
        {/* 작성자 익명 투표일 경우에 숨김처리 (사용자 본인 프로필일 경우 X) */}
        {pollList.map((poll, index) =>
          !poll.userAnonymousType || poll.author === getLoggedUserId() ? (
            <PollDetailCard key={poll.voteId} poll={poll} index={index} />
          ) : null
        )}
      </ImageList>
      {/* </Grid> */}

      {/* 투표 생성 버튼 */}
      <GradAnimatedButton href="/polls/create" sx={{ position: 'absolute', bottom: 0, right: 50 }}>
        <Typography variant="subtitle2">&nbsp;+&nbsp;Create New Poll&nbsp;&nbsp;</Typography>
      </GradAnimatedButton>
    </>
  );
}
