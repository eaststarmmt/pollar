import CreateForm from '../components/createpoll/CreateForm';

import { Box, Container, Typography, Card } from '@mui/material';

export default function PollCreatePage() {
  return (
    <>
      <Container>
        <Box sx={{ width: '100%', typography: 'body1' }}>
          <Card
            sx={{
              px: 14,
              py: 8,
              backgroundColor: '#fffd',
              backdropFilter: 'saturate(200%) blur(30px)',
              boxShadow: '2px 2px 20px 10px rgba(0, 0, 0, 0.1)',
              overflow: 'visible',
            }}
          >
            <Typography variant="h3" gutterBottom color="primary">
              Create Poll
            </Typography>
            <CreateForm />
          </Card>
        </Box>
      </Container>
    </>
  );
}
