import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Grid,
  IconButton,
  Typography,
  Stack,
} from '@mui/material';
import PollImageButton from '../common/PollImageButton';
import HowToVoteIcon from '@mui/icons-material/HowToVote';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import ShareIcon from '@mui/icons-material/Share';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { checkExpired, fDateTimeSuffix } from '../../utils/formatTime';
import { useState } from 'react';
import { requestPollLike, requestPollUnlike } from '../../services/api/PollApi';
import SharePollDialog from '../common/SharePollDialog';

/* 상황별로 탭의 배경색을 변경한다 */
const pollBgCol = {
  closedPoll: '#000',
  default: '#fff',
  trending: '#219',
};

const InfoStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'flex-end',
  // marginTop: theme.spacing(3),
  color: theme.palette.text.disabled,
}));

export default function PollDetailCard({ poll }) {
  const navigate = useNavigate();

  const {
    voteId,
    voteName,
    voteContent,
    voteType,
    voteCreateTime,
    voteExpirationTime,
    userAnonymousType,
    voteAnonymousType,
    voteCategoriesName,
    // 투표 선택지
    voteSelects,
    // 좋아요 누른 여부
    isUserLiked,
    // 투표했는지 여부
    isUserVoted,
    author,
    userProfilePhoto,
    voteReplyCount,
    voteParticipateCount,
    voteLikeCount,
  } = poll;

  // 로그인한 사용자가 해당 프로필의 '좋아요'목록에 대해서 '좋아요'를 눌렀는지 여부
  const [isLiked, setIsLiked] = useState(isUserLiked);
  const [openShareDialog, setOpenShareDialog] = useState(false);

  const POLL_INFO = [
    { number: voteReplyCount, icon: ChatOutlinedIcon },
    { number: voteParticipateCount, icon: HowToVoteIcon },
    { number: voteLikeCount, icon: FavoriteBorderIcon },
  ];

  /* '자세히 보기'를 클릭 시 투표 상세페이지로 이동 */
  const handleCardClick = () => {
    navigate(`/poll/${voteId}`);
  };

  /* 투표하기 */
  const handleVoteClick = (event) => {
    console.log(event);

    // todo 결과 보여주기
  };

  /* '좋아요(좋아요해제)' 버튼 클릭시 */
  const handleToggleLikeClick = async () => {
    const result = isLiked ? await requestPollUnlike(voteId) : await requestPollLike(voteId);
    if (result === 'success') {
      setIsLiked((curr) => !curr);
    } else {
      // todo 에러처리
      alert('처리에 문제가 있었습니다. 다시 요청해주세요');
    }
  };

  /* 공유 버튼 클릭 시 */
  const handleShareClick = () => {
    setOpenShareDialog((curr) => !curr);
  };

  return (
    <Grid item xs={12} sm={6} md={6}>
      익명투표 여부, 좋아요 버튼, 공유 버튼, 투표했을 때 결과 디스플레이 추가
      <Card sx={{ backgroundColor: '#fff' }}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
              <Typography variant="caption" color="text.disabled" gutterBottom>
                {/* 작성일자 2020-12-09 ~ 마감시간 2020-12-29 */}
                {/* {voteCreateTime} ~ {voteExpirationTime} */}
                {fDateTimeSuffix(voteCreateTime)} ~ {fDateTimeSuffix(voteExpirationTime)}{' '}
              </Typography>
              {checkExpired(voteExpirationTime) ? (
                <Chip
                  label="마감됨"
                  color="default"
                  size="small"
                  sx={{ fontSize: 10, padding: -10 }}
                />
              ) : isUserVoted ? (
                <Chip
                  label="투표완료"
                  color="primary"
                  size="small"
                  sx={{ fontSize: 10, padding: -10 }}
                />
              ) : (
                <Chip
                  label="투표가능"
                  color="info"
                  size="small"
                  sx={{ fontSize: 10, padding: -10 }}
                />
              )}
              <Stack direction="row" justifyContent="space-between">
                {/* Poll Title */}
                <Stack direction="row" alignItems="baseline" spacing={1}>
                  <Typography variant="h5" component="div">
                    {voteName}
                  </Typography>
                  <Typography variant="caption" color="text.disabled">
                    {userAnonymousType ? '작성자익명' : null}
                    {userAnonymousType && voteAnonymousType ? ' | ' : null}
                    {voteAnonymousType ? '투표자익명' : null}
                  </Typography>
                </Stack>

                <Box>
                  <IconButton aria-label="share" onClick={handleShareClick}>
                    <ShareIcon sx={{ fontSize: '0.8em' }} />
                  </IconButton>
                  <IconButton aria-label="add to favorites" onClick={handleToggleLikeClick}>
                    {isLiked ? (
                      <FavoriteRoundedIcon sx={{ fontSize: '1em' }} color="error" />
                    ) : (
                      <FavoriteBorderRoundedIcon sx={{ fontSize: '1em' }} color="disabled" />
                    )}
                  </IconButton>
                </Box>
              </Stack>

              {voteCategoriesName.length > 0
                ? voteCategoriesName.map((item, index) => {
                    <Chip label={item} size="small" sx={{ fontSize: 12 }} />;
                  })
                : null}
              <Typography variant="body2" sx={{ fontSize: 14 }}>
                {/* 투표내용... (최대 100자) */}
                {voteContent}
              </Typography>
            </Grid>
            <Grid item xs={12} md={12}>
              {voteType ? (
                <Grid item xs={12} md={12}>
                  <Stack spacing={1}>
                    {voteSelects.map((item, index) => (
                      <Button
                        key={index}
                        variant="outlined"
                        color="primary"
                        sx={{ backgroundColor: 'secondary' }}
                        onClick={handleVoteClick}
                      >
                        {item.content}
                      </Button>
                    ))}
                  </Stack>
                </Grid>
              ) : (
                <>
                  <Grid container spacing={1}>
                    {voteSelects.map((item, index) => (
                      <Grid item xs={6}>
                        <Card key={index}>
                          <PollImageButton
                            image={item.content}
                            sx={{ width: '100%', height: 'auto' }}
                            onClick={handleVoteClick}
                          />
                        </Card>
                      </Grid>
                    ))}
                  </Grid>

                  {/* </Stack> */}
                </>
              )}
            </Grid>
          </Grid>

          <Stack direction="row" justifyContent="space-between" sx={{ pt: 3 }}>
            <InfoStyle sx={{ width: '100%' }}>
              {POLL_INFO.map((info, index) => (
                <Box
                  key={index}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    ml: index === 0 ? 0 : 1.5,
                  }}
                >
                  <Box component={info.icon} sx={{ width: 16, height: 16, mr: 0.5 }} />
                  <Typography variant="caption">{info.number}</Typography>
                </Box>
              ))}
            </InfoStyle>
            <Button size="small" color="secondary" onClick={handleCardClick}>
              자세히 보기
            </Button>
          </Stack>
        </CardContent>

        {/* <CardActions sx={{ width: '100%' }}></CardActions> */}
      </Card>
      <SharePollDialog pollId={voteId} openDialog={openShareDialog} />
    </Grid>
  );
}
