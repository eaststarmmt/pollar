import { Typography, Box, Stack, Card } from '@mui/material';
import { useParams } from 'react-router-dom';
import Container from '@mui/material/Container';
import PollDetail from '../components/detailpoll/PollDetail';
import { getVoteInfo } from '../services/api/PollApi';
import { useEffect, useState } from 'react';
import { getPollCategory } from '../services/api/CategoryApi';
import { getRelies } from '../services/api/ReplyApi';
import ReplyForm from '../components/detailpoll/ReplyForm';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { isLoggedState } from '../atoms/atoms';
import { getLoggedUserId } from '../utils/loggedUser';
import PollDetailForm from '../components/detailpoll/PollDetailForm';
import Detail from '../components/detailpoll/Detail';

export default function PollDetailPage() {
  // 로그인된 사용자만 사용가능 (recoil state watch하자)
  const isLogged = useRecoilValue(isLoggedState);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogged && getLoggedUserId() === null) {
      // todo
      alert('회원에게만 제공되는 서비스입니다. ');
      navigate('/users/login');
    }
  }, []);

  let { id } = useParams(); // url에 있는 path variable을 가져옴
  const [voteInfo, setVoteInfo] = useState();
  const [categories, setCategories] = useState();
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
  console.log(voteInfo)
  useEffect(() => {
    getVote();
    loadReply();
  }, [id]);

  return (
    <>
      <Stack direction="row">
            <Detail vote={voteInfo} />
            {/* <PollDetailForm vote={voteInfo} /> */}
            <ReplyForm replies={replies} />
      </Stack>
    </>
  );
}
