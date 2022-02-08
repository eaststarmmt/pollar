import CreateForm from '../components/createpoll/CreateForm';


import { Box } from '@mui/material';
import Container from '@mui/material/Container';
import { Typography } from '@mui/material';


export default function PollCreatePage() {
  return (
    <>
      <Container>
        <Typography>투표 생성 페이지</Typography>
        <br/>
        <Box sx={{ width: '100%', typography: 'body1' }}>
          <CreateForm />
        </Box>
      </Container>
    </>
  );
}
