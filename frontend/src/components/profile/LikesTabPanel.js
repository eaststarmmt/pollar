import { Grid } from '@mui/material';
import PollLikedCard from '../polls/PollLikedCard';
import PollSummaryCard from '../polls/PollSummaryCard';
import posts from '../../_mocks_/blog';

export default function LikesTabPanel() {
  return (
    <>
      <Grid container spacing={3}>
        {posts.map((post, index) => (
          <PollLikedCard key={post.id} post={post} index={index} />
        ))}
      </Grid>
    </>
  );
}
