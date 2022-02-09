import PollDetailCard from '../polls/PollDetailCard';

import { Box, Button, Container, Fab, Grid, Icon, Stack, Typography } from '@mui/material';
import Page from '../Page';
import PollVoteCard from '../polls/PollVoteCard';
import { Link } from 'react-router-dom';
import posts from '../../_mocks_/blog';
import GradAnimatedButton from '../common/GradAnimatedButton';
// ----------------------------------------------------------------------

const SORT_OPTIONS = [
  { value: 'latest', label: 'Latest' },
  { value: 'popular', label: 'Popular' },
  { value: 'oldest', label: 'Oldest' },
];
export default function UploadsTabPanel() {
  return (
    <>
      <Page title="VotesTabPanel">
        <Container>
          {/* <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <Typography variant="h4" gutterBottom>
              Blog
            </Typography>
            <Button
              variant="contained"
              component={Link}
              to="#"
              startIcon={<Icon icon={plusFill} />}
            >
              New Post
            </Button>
          </Stack> */}

          {/* <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">
            <BlogPostsSearch posts={POSTS} />
            <BlogPostsSort options={SORT_OPTIONS} />
          </Stack> */}

          {/* <Grid container spacing={2}> */}
          {posts.map((post, index) => (
            <PollDetailCard key={post.id} post={post} index={index} />
          ))}
          {/* </Grid> */}
          <GradAnimatedButton
            href="/polls/create"
            sx={{ position: 'absolute', bottom: 0, right: 50 }}
          >
            <Typography variant="subtitle2">&nbsp;+&nbsp;Create New Poll&nbsp;&nbsp;</Typography>
          </GradAnimatedButton>
        </Container>
      </Page>
    </>
  );
}
