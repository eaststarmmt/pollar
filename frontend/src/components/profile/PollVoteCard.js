import PropTypes from 'prop-types';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
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
  Snackbar,
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
import { cancelPollVote } from '../../services/api/PollApi';
import { checkExpired } from '../../utils/formatTime';

// ----------------------------------------------------------------------

const CardMediaStyle = styled('div')({
  position: 'relative',
  paddingTop: 'calc(100% * 3 / 4)',
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
  justifyContent: 'flex-start',
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

// isOwner: 사용자 본인일 경우에는 투표 취소 가능
export default function PollVoteCard({ poll, isOwner }) {
  const navigate = useNavigate();
  const {
    voteId,
    voteName,
    voteType,
    voteCreateTime,
    voteExpiredTime,
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

    // snackbar
    const [alert, setAlert] = useState({
      open: false,
      vertical: 'top',
      horizontal: 'center',
    });
  
    const { vertical, horizontal, open } = alert;
    const [alertState, setAlertState] = useState({
      success: false,
      fail: false,
    });
  
    const alertMsg= {
      success:'투표 취소됨. 새로고침해주세요',
      fail: '처리에 문제가 있었습니다. 다시 요청해주세요 '
    }
    const openSuccessAlert = () => {
      setAlert({
        ...alert,
        open: true,
      });
    };
    const closeSuccessAlert = () => {
      setAlert({
        ...alert,
        open: false,
      });
      setAlertState({
        successs: false,
        fail: false,
      });
    };

  const handleVoteCancelClick = async (event) => {
    // 뒤의 Card의 onClick 이벤트가 발생하지 않도록 막음
    event.stopPropagation();
    event.preventDefault();

    const result = await cancelPollVote(userVoteSelection);
    if (result === 'success') {
      // setIsLiked((curr) => !curr);
      // todo 리스트 갱신
      setAlertState({
        ...alertState,
        success: true,
      });
      openSuccessAlert();
    } else {
      // todo 에러처리
      setAlertState({
        ...alertState,
        fail: true,
      });
      openSuccessAlert();
    }
  };

  return (
    <>
    {alertState.success ? (
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={closeSuccessAlert}
        message={alertMsg.success}
        autoHideDuration={2000}
      />
    ) : alertState.fail && (
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={closeSuccessAlert}
        message={alertMsg.fail}
        autoHideDuration={2000}
      />
    ) }
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
              {!userAnonymousType && !voteAnonymousType ? '_' : null}
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
            <Stack direction="row" alignItems="flex-end">
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
              {/* 사용자 본인의 프로필인 경우 && 마감되지 않은 투표일 경우에만 투표취소 가능  */}
              {isOwner && !checkExpired(voteExpiredTime) ? (
                <Typography
                  variant="text"
                  color="error"
                  size="small"
                  onClick={handleVoteCancelClick}
                  sx={{ padding: '0px', minWidth: 'fit-content', height: 'fit-content' }}
                >
                  투표취소
                </Typography>
              ) : null}
            </Stack>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
    </>
  );
}
