import { Container, Grid } from '@mui/material';
import PollVoteCard from '../polls/PollVoteCard';
import posts from '../../_mocks_/blog';
// ----------------------------------------------------------------------

export default function VotesTabPanel() {
  return (
    <>
      <Container>
        <Grid container spacing={3}>
          {posts.map((post, index) => (
            <PollVoteCard key={post.id} post={post} index={index} />
          ))}
        </Grid>
      </Container>
    </>
  );
}
