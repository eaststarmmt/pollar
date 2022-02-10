import { Typography } from '@mui/material';
import { useParams } from 'react-router-dom';

export default function PollDetailPage() {
  const { id } = useParams();
  return (
    <>
      <Typography>투표 상세 페이지</Typography>
    </>
  );
}
