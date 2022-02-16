import { Reply } from '@mui/icons-material';
import { Button, Grid, Stack, TextField, Typography } from '@mui/material';
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
      <Typography variant="h4" paddingTop={1} marginBottom={2} marginLeft={4} marginTop={4}>
        댓글 {replyMap.length}개
      </Typography>
      {replyMap.map((reply, index) => {
        var a = <ReplyDetail key={index} reply={reply} />;
        return a;
      })}
      <Grid container paddingTop={3}>
        <Grid item xs={10} paddingLeft={1}>
          <TextField
            autoComplete="replyContent"
            type="replyContent"
            label="content"
            fullWidth
            onChange={onContentHandler}
            value={reply.replyContent}
          ></TextField>
        </Grid>
        <Grid item xs={1}>
          <Button size="large" onClick={submitReply}>
            작성
          </Button>
        </Grid>
      </Grid>
    </>
  );
}
