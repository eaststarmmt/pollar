import { Typography, Box, Stack, Card } from '@mui/material';
import { useParams } from 'react-router-dom';
import { Dialog, DialogActions, DialogTitle, Button } from '@mui/material';
import PollDetail from '../components/detailpoll/PollDetail';
import { getVoteInfo } from '../services/api/PollApi';
import { useEffect, useState } from 'react';
import { getPollCategory } from '../services/api/CategoryApi';
import { getRelies } from '../services/api/ReplyApi';
import ReplyForm from '../components/detailpoll/ReplyForm';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { isLoggedState } from '../atoms/atoms';
import { checkUserLogged, getLoggedUserId } from '../utils/loggedUser';
import PollDetailCard from '../components/detailpoll/PollDetailCard';

export default function PollDetailPage() {
  // 로그인된 사용자만 사용가능 (recoil state watch하자)
  const isLogged = useRecoilValue(isLoggedState);
  const navigate = useNavigate();

  let { id } = useParams(); // url에 있는 path variable을 가져옴
  const [voteInfo, setVoteInfo] = useState(undefined);
  const [categories, setCategories] = useState(undefined);
  const [replies, setReplies] = useState([]);

  const getVote = async () => {
    // voteInfo랑 categories 가져오기
    const data = await getVoteInfo(id);
    setVoteInfo(data);
  };
  const loadReply = async () => {
    const replyList = await getRelies(id);
    setReplies(replyList);
  };

  // 로그인 알림
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    navigate('/users/login');
  };

  useEffect(() => {
    if (!isLogged && !checkUserLogged()) {
      // todo
      handleClickOpen();
    } else {
      getVote();
      loadReply();
    }
  }, [id]);

  return (
    <>
      <Dialog
        open={open}
        // onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <Typography variant="body1" textAlign="center">
            회원에게만 제공되는 서비스입니다. <br />
            로그인 화면으로 이동합니다.
          </Typography>
        </DialogTitle>
        <DialogActions sx={{ justifyContent: 'center' }}>
          <Button onClick={handleClose} autoFocus>
            확인
          </Button>
        </DialogActions>
      </Dialog>
      <Stack direction="row" spacing={1}>
        {/* <Detail vote={voteInfo} /> */}
        {/* <PollDetailForm vote={voteInfo} /> */}
        {voteInfo ? (
          <PollDetailCard poll={voteInfo} isLoggedUser={isLogged || checkUserLogged()} />
        ) : null}
        {replies ? <ReplyForm replies={replies} /> : null}
      </Stack>
      {/* <Stack direction="row">
        <Card>
          <Box
            component="div"
            paddingBottom={3}
            paddingLeft={2}
            paddingRight={2}
            style={{
              overflowY: 'scroll', // added scroll
            }}
          >
            {voteInfo ? (
              <>
                <PollDetailForm vote={voteInfo} />
                <ReplyForm replies={replies} />
              </>
            ) : null}
          </Box>
        </Card>
      </Stack> */}
    </>
  );
}
