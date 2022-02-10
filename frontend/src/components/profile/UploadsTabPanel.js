import PollDetailCard from '../polls/PollDetailCard';

import { Grid, Typography } from '@mui/material';
import posts from '../../_mocks_/blog';
import GradAnimatedButton from '../common/GradAnimatedButton';
// ----------------------------------------------------------------------

export default function UploadsTabPanel() {
  return (
    <>
      {/* 업로드한 투표 리스트 */}
      <Grid container spacing={3}>
        {posts.map((post, index) => (
          <PollDetailCard key={post.id} post={post} index={index} />
        ))}
      </Grid>

      {/* 투표 생성 버튼 */}
      <GradAnimatedButton href="/polls/create" sx={{ position: 'absolute', bottom: 0, right: 50 }}>
        <Typography variant="subtitle2">&nbsp;+&nbsp;Create New Poll&nbsp;&nbsp;</Typography>
      </GradAnimatedButton>
    </>
  );
}
