import PropTypes from 'prop-types';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import HowToVoteIcon from '@mui/icons-material/HowToVote';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import ShareIcon from '@mui/icons-material/Share';
// material
import { styled } from '@mui/material/styles';
import {
  Box,
  Link,
  Card,
  Grid,
  Avatar,
  Typography,
  CardContent,
  CardActionArea,
  Stack,
  IconButton,
  Chip,
  CardActions,
} from '@mui/material';
import SvgIconStyle from '../common/SvgIconStyle';
import stringToColor from '../../utils/stringToColor';
import { requestPollLike, requestPollUnlike } from '../../services/api/PollApi';
import { checkExpired, fDateTimeSuffix } from '../../utils/formatTime';
import { useState } from 'react';
import SharePollDialog from '../common/SharePollDialog';

// ----------------------------------------------------------------------

const TitleStyle = styled(Link)({
  // height: 44,
  overflow: 'hidden',
  width: '100%',
  //? 1(개) 줄만 표시하겠다는 것
  WebkitLineClamp: 1,
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
});
const ContentStyle = styled(Typography)({
  height: 44,
  overflow: 'hidden',
  //? 1(개) 줄만 표시하겠다는 것
  WebkitLineClamp: 2,
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  padding: 5,
});

const AvatarStyle = styled(Avatar)(({ theme }) => ({
  zIndex: 9,
  width: 32,
  height: 32,
  // position: 'absolute',
  // left: theme.spacing(3),
  marginRight: 15,
  marginBottom: 5,
  // bottom: theme.spacing(-3),
}));

const InfoStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'flex-end',
  // marginTop: theme.spacing(3),
  color: theme.palette.text.disabled,
}));

// ----------------------------------------------------------------------

PollLikedCard.propTypes = {
  poll: PropTypes.object.isRequired,
  index: PropTypes.number,
};

const dummytext =
  '투표내용: (투표했을 경우 하얀색, 아직이면 화려한색, 마감된 투표면 회색)Lizards are awidespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica  투표면 회색)Lizards are awidespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica';

export default function PollLikedCard({ poll }) {
  const navigate = useNavigate();

  //// const { cover, title, view, comment, share, author, createdAt } = post;
  // 필요한 데이터들 추출
  const {
    voteId,
    voteName,
    voteContent,
    voteType,
    voteCreateTime,
    voteExpirationTime,
    voteCategoriesName,
    author,
    userProfilePhoto,
    // 좋아요 누른 여부
    isUserLiked,
    // 투표했는지 여부
    isUserVoted,
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

  /* 카드를 클릭 시 투표 상세페이지로 이동 */
  const handleCardClick = () => {
    navigate(`/poll/${voteId}`);
  };

  /* '좋아요(좋아요해제)' 버튼 클릭시 */
  const handleToggleLikeClick = async (event) => {
    // 뒤의 Card의 onClick 이벤트가 발생하지 않도록 막음
    event.stopPropagation();
    event.preventDefault();

    const result = isLiked ? await requestPollUnlike(voteId) : await requestPollLike(voteId);
    if (result === 'success') {
      setIsLiked((curr) => !curr);
    } else {
      // todo 에러처리
      alert('처리에 문제가 있었습니다. 다시 요청해주세요');
    }
  };

  /* 공유 버튼 클릭 시 */
  const handleShareClick = async (event) => {
    // 뒤의 Card의 onClick 이벤트가 발생하지 않도록 막음
    event.stopPropagation();
    event.preventDefault();

    setOpenShareDialog(true);
  };

  return (
    <Grid item xs={12} sm={12} md={12}>
      <Card sx={{ position: 'relative', backgroundColor: false ? '#ddd' : '#fff' }}>
        <CardActionArea disableRipple onClick={handleCardClick}>
          <SvgIconStyle
            color="paper"
            src="/static/icons/shape-avatar.svg"
            sx={{
              width: 80,
              height: 36,
              zIndex: 9,
              bottom: -15,
              position: 'absolute',
            }}
          />

          <CardContent sx={{ pt: 4 }}>
            <Stack direction="row" justifyContent="center" alignItems="flex-start">
              <AvatarStyle
                alt={author}
                src={userProfilePhoto}
                sx={{ bgcolor: stringToColor(`${author}`) }}
              />
              <Stack direction="row" sx={{ width: '100%' }} spacing={2}>
                <Typography color="inherit" variant="h5">
                  {voteName}
                </Typography>
                {voteType ? (
                  <PhotoLibraryIcon color="disabled" sx={{ pt: 1 }} />
                ) : (
                  <TextSnippetIcon color="disabled" sx={{ pt: 1 }} />
                )}
              </Stack>
              {voteCategoriesName.length > 0
                ? voteCategoriesName.map((item, index) => (
                    <Chip label={item} size="small" sx={{ fontSize: 12 }} />
                  ))
                : null}
              <InfoStyle sx={{ width: '100%' }}>
                {POLL_INFO.map((info, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      ml: index === 0 ? 0 : 1.5,
                      // ...((latestPostLarge || latestPost) && {
                      //   color: 'grey.500',
                      // }),
                    }}
                  >
                    <Box component={info.icon} sx={{ width: 16, height: 16, mr: 0.5 }} />
                    <Typography variant="caption">{info.number}</Typography>
                  </Box>
                ))}
              </InfoStyle>
            </Stack>
            <CardActions>
              <Stack direction="row" justifyContent="space-between" sx={{ width: '100%' }}>
                <ContentStyle variant="body2" color="text.secondary">
                  {/* {dummytext} */}
                  {voteContent}
                  {/* {dummytext.length > 120 ? `${dummytext.slice(0, 120)} ...더보기` : dummytext} */}
                </ContentStyle>
                <Box>
                  <IconButton aria-label="share" onClick={handleShareClick}>
                    <ShareIcon />
                  </IconButton>
                  <IconButton aria-label="add to favorites" onClick={handleToggleLikeClick}>
                    {isLiked ? (
                      <FavoriteRoundedIcon sx={{ fontSize: '2em' }} color="error" />
                    ) : (
                      <FavoriteBorderRoundedIcon sx={{ fontSize: '2em' }} color="disabled" />
                    )}
                  </IconButton>
                </Box>
              </Stack>
            </CardActions>
            <Stack direction="row" spacing={1}>
              <Typography
                gutterBottom
                variant="caption"
                sx={{ color: 'text.disabled', display: 'block' }}
              >
                {/* 투표기간: {createdAt} ~ {formatDistanceToNow(new Date(createdAt))} */}
                투표기간: {fDateTimeSuffix(voteCreateTime)} ~ {fDateTimeSuffix(voteExpirationTime)}
              </Typography>
              {/* 3가지 중 하나 */}
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
                  color="warning"
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
            </Stack>
          </CardContent>
        </CardActionArea>
      </Card>
      <SharePollDialog pollId={voteId} openDialog={openShareDialog} />
    </Grid>
  );
}
