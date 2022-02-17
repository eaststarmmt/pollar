import { Reply } from '@mui/icons-material';
import {
  Button,
  Grid,
  Stack,
  TextField,
  Typography,
  Avatar,
  ImageListItem,
  Card,
  CardContent,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import ReplyDetail from './ReplyDetail';
import { getLoggedUserId } from '../../utils/loggedUser';
import { replyCreate } from '../../services/api/ReplyApi';

export default function ReplyForm({ replies }) {
  let replyMap = []; // 댓글 map 으로 변환하기 위한 빈 배열 선언
  replies && (replyMap = replies); // replies 객체가 있을때만 복사
  let { id } = useParams(); // url에 있는 path variable을 가져옴
  const [reply, setReply] = useState({
    replyUser: getLoggedUserId(),
    voteReply: id,
    replyContent: '',
  });
  // 글 작성할때마다 값 업데이트 해줌
  const onContentHandler = (event) => {
    setReply({
      ...reply,
      replyContent: event.target.value,
    });
  };
  // replyDto를 서버로 보냄
  const submitReply = async () => {
    const result = await replyCreate(reply);
    if (result == 'success') {
      window.location.reload();
    } else {
      alert('댓글 생성 실패');
    }
  };

  return (
    <>
      <Card
        sx={{
          width: 500,
          height: 550,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <CardContent sx={{ overflowY: 'auto' }}>
          <Typography variant="h6" sx={{ px: 3, mb: 1, mt:2 }} color="primary">
            총 댓글 {replyMap.length}개
          </Typography>
          {replyMap.map((reply, index) => {
            var a = <ReplyDetail key={index} reply={reply} />;
            return a;
          })}
        </CardContent>
        <CardContent sx={{ py: 1 }}>
          <Grid container>
            <Grid item xs={10} paddingLeft={2} paddingRight={2}>
              <TextField
                variant="standard"
                autoComplete="replyContent"
                type="replyContent"
                placeholder="댓글을 작성해주세요."
                fullWidth
                onChange={onContentHandler}
                value={reply.replyContent}
              ></TextField>
            </Grid>
            <Grid item xs={2}>
              <Button variant="contained" onClick={submitReply}>
                작성
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}
