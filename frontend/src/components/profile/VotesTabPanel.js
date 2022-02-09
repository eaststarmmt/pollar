import { Button, Container, Grid, Icon, Stack, Typography } from '@mui/material';
import Page from '../Page';
import PollVoteCard from '../polls/PollVoteCard';
import { Link } from 'react-router-dom';
// import uploadedPoll from '_mocks_/uploadedPoll';
import plusFill from '@iconify/icons-eva/plus-fill';
import posts from '../../_mocks_/blog';
// ----------------------------------------------------------------------

const SORT_OPTIONS = [
  { value: 'latest', label: 'Latest' },
  { value: 'popular', label: 'Popular' },
  { value: 'oldest', label: 'Oldest' },
];
export default function VotesTabPanel() {
  return (
    <>
      <Page title="VotesTabPanel">
        <Container>
          <Grid container spacing={3}>
            {posts.map((post, index) => (
              <PollVoteCard key={post.id} post={post} index={index} />
            ))}
          </Grid>
        </Container>
      </Page>
    </>
  );
}
