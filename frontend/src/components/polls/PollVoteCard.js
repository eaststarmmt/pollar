import PropTypes from 'prop-types';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
// material
import { alpha, styled } from '@mui/material/styles';
import {
  Box,
  Link,
  Card,
  Grid,
  Avatar,
  Typography,
  CardContent,
  Button,
  CardActionArea,
  Stack,
} from '@mui/material';
import SvgIconStyle from '../common/SvgIconStyle';
import HowToVoteIcon from '@mui/icons-material/HowToVote';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import stringToColor from '../../utils/stringToColor';
import { fDateTimeSuffix } from '../../utils/formatTime';
import { useEffect, useState } from 'react';

// ----------------------------------------------------------------------

const CardMediaStyle = styled('div')({
  position: 'relative',
  paddingTop: 'calc(100% * 3 / 4)',
});

const TitleStyle = styled(Link)({
  height: 44,
  overflow: 'hidden',
  WebkitLineClamp: 2,
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
});

const AvatarStyle = styled(Avatar)(({ theme }) => ({
  zIndex: 9,
  width: 32,
  height: 32,
  position: 'absolute',
  left: theme.spacing(3),
  bottom: theme.spacing(-2),
}));

const InfoStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'flex-end',
  marginTop: theme.spacing(3),
  color: theme.palette.text.disabled,
}));

const CoverImgStyle = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
});

const CoverTextStyle = styled('div')(({ color }) => ({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
  backgroundColor: color,
  // objectFit: 'cover',
  // padding: 1,
  // overflow: 'hidden',
  // display: 'inline-block',
  position: 'absolute',
  // justifyContent: 'center',
  // lineHeight: '1.5',
  // verticalAlign: 'bottom',
  // textSizeAdjust: '80%',
}));

// ----------------------------------------------------------------------

PollVoteCard.propTypes = {
  poll: PropTypes.object.isRequired,
  index: PropTypes.number,
};

export default function PollVoteCard({ poll }) {
  const navigate = useNavigate();

  // const { cover, title, view, comment, share, author, createdAt } = post;
  // TODO 필요한 데이터들 추출
  //! (추가적으로 필요한 데이터들: 사용자 프로필 )
  const {
    voteId,
    voteName,
    voteType,
    voteCreateTime,
    userAnonymousType,
    voteAnonymousType,
    voteCategoriesName,
    author,
    userProfilePhoto,
    // 투표 선택지
    voteSelects,
    userVoteSelection,
    voteReplyCount,
    voteParticipateCount,
    voteLikeCount,
  } = poll;

  // todo 지우기(mock data)
  // const voteSelection = '선택지예시';
  // const voteSelection = 'https://picsum.photos/200/300';

  const [voteContent, setVoteContent] = useState('');

  const POLL_INFO = [
    { number: voteReplyCount, icon: ChatOutlinedIcon },
    { number: voteParticipateCount, icon: HowToVoteIcon },
    { number: voteLikeCount, icon: FavoriteBorderIcon },
  ];

  useEffect(() => {
    for (let key in voteSelects) {
      // console.log(voteSelects[key]);
      if (voteSelects[key].selectionId === userVoteSelection)
        setVoteContent(voteSelects[key].content);
    }
  }, []);

  const handleCardClick = () => {
    navigate(`/poll/${voteId}`);
  };

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card sx={{ position: 'relative' }}>
        <CardActionArea disableRipple onClick={handleCardClick}>
          <CardMediaStyle
            sx={{
              pt: {
                xs: 'calc(100% * 4 / 3)',
                sm: 'calc(100% * 3 / 4.66)',
              },
            }}
          >
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
            {/* 작성자 익명일 투표 */}
            {!userAnonymousType ? (
              <AvatarStyle alt={author} src={userProfilePhoto} />
            ) : (
              <AvatarStyle alt="Anonymous" src={null} />
            )}

            {/* 사용자가 선택한 투표선택지 */}
            {voteType ? (
              <CoverTextStyle color={stringToColor(voteContent)}>
                <Typography variant="subtitle2" color="white" px={2}>
                  {voteContent}
                </Typography>
              </CoverTextStyle>
            ) : (
              <CoverImgStyle
                alt={voteContent}
                src={voteContent}
                sx={{ backgroundColor: 'gray', textAlign: 'center' }}
              />
            )}
          </CardMediaStyle>

          <CardContent sx={{ pt: 4 }}>
            <Typography
              gutterBottom
              variant="caption"
              sx={{ color: 'text.disabled', display: 'block' }}
            >
              투표시작 {fDateTimeSuffix(voteCreateTime)}
              {/* {fDate(createdAt)} */}
            </Typography>

            <Typography variant="h5" component="div">
              {voteName}
            </Typography>
            <Typography variant="caption" color="text.disabled">
              {userAnonymousType ? '작성자익명' : null}
              {userAnonymousType && voteAnonymousType ? ' | ' : null}
              {voteAnonymousType ? '투표자익명' : null}
            </Typography>
            {/* <TitleStyle
              to="#"
              color="inherit"
              variant="subtitle2"
              underline="hover"
              component={RouterLink}
            >
              {voteName}
            </TitleStyle> */}

            <InfoStyle sx={{ width: '100%' }}>
              {/* <Button sx={{ mr: 3 }}>결과보기</Button> */}
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
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
}
