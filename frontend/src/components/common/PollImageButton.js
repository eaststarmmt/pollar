import { styled } from '@mui/material/styles';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { requestPollVote } from '../../services/api/PollApi';

const ImageButton = styled(ButtonBase)(({ theme }) => ({
  position: 'relative',
  width: '100%',
  height: 200,
  // [theme.breakpoints.down('sm')]: {
  //   width: '100% !important', // Overrides inline-style
  //   height: 100,
  // },
  '&:hover, &.Mui-focusVisible': {
    zIndex: 1,
    '& .MuiImageBackdrop-root': {
      opacity: 0.4,
    },
    '& .MuiImageMarked-root': {
      opacity: 1,
    },
    '& .MuiTypography-root': {
      // border: '4px solid currentColor',
    },
  },
}));

const ImageSrc = styled('span')({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: 'cover',
  backgroundPosition: 'center 40%',
});

const Image = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.common.white,
}));

const ImageBackdrop = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundColor: theme.palette.common.black,
  opacity: 0,
  transition: theme.transitions.create('opacity'),
}));

const ImageMarked = styled('span')(({ theme }) => ({
  // height: 3,
  // width: 18,
  // backgroundColor: theme.palette.common.white,
  // position: 'absolute',
  // bottom: -2,
  // left: 'calc(50% - 9px)',
  opacity: 0,
  transition: theme.transitions.create('opacity'),
}));

const ImageVoteResult = styled('span')(({ theme }) => ({
  //? (선택지의) 투표율을 표현, sx로 설정할 부분
  width: '100%',
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  // paddingTop: 10,
  fontSize: 16,
  borderRadius: 14,
  backgroundColor: theme.palette.warning.main,
  opacity: 0.7,
  transition: theme.transitions.create('opacity'),
}));

/**
 *
 * @param {selection, isVoted, voteResultPercentage, setPollVotedState} (순서대로) 투표선택지 데이터 / 투표완료된 투표인지 여부 / 이 선택지에 대한 퍼센티지 결과값(100)
 * @returns
 */
export default function PollImageButton({
  selection,
  isVoted,
  setPollVotedState,
  voteResultPercentage,
  isSelectedVote,
}) {
  // 현재 로그인된 사용자가 투표한 선택지
  const [userVote, setUserVote] = useState(isSelectedVote);

  /* 투표하기 */
  // 투표 선택지 클릭 시, 투표하기
  const handleClick = async () => {
    // (디자인을 위해 선택한 항목일 경우 disabled를 해제해놔서 별도의 처리 필요)
    if (!userVote) {
      // 서버로 해당 선택 데이터 전송
      const result = await requestPollVote(selection.selectionId);
      console.log(result);
      if (result === 'success') {
        alert('투표완료! 투표취소는 본인 프로필에서만 가능합니다');
        setPollVotedState(true);
        setUserVote(true);
      } else {
        // todo 에러처리
        alert('투표하기에 문제 발생. 잠시 후 다시 시도해주세요');
        setPollVotedState(false);
        setUserVote(false); // (필요없나)
      }
    }
  };

  return (
    // <Box sx={{ display: 'flex', flexWrap: 'wrap', minWidth: 300, width: '100%' }}>
    //   {images.map((image) => (
    <ImageButton
      focusRipple
      // key={selection.selectionId}
      onClick={handleClick}
      // 투표완료 OR 마감된 투표일 경우 hover 막음
      disabled={isVoted && !userVote}
      color={userVote ? 'success' : 'primary'}
      style={{
        width: '100%',
        border: userVote ? '2px solid #999' : '',
        borderRadius: 15,
      }}
    >
      <ImageSrc style={{ backgroundImage: `url(${selection.content})` }} />
      <ImageBackdrop className="MuiImageBackdrop-root" />
      <Image>
        <Typography
          component="span"
          variant="subtitle1"
          color="inherit"
          sx={{
            position: 'relative',
            p: 4,
            pt: 2,
            pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
          }}
        >
          {/* {selection.selectionTitle} */}
          {/* 선택지 hover 효과 */}
          <ImageMarked className="MuiImageMarked-root">투표하기</ImageMarked>
        </Typography>
      </Image>{' '}
      {/* 투표 선택지 선택 시 결과 */}
      {isVoted ? (
        <ImageVoteResult sx={{ height: voteResultPercentage * 2 }}>
          <Typography variant="subtitle2" color="white" sx={{ paddingTop: 2 }}>
            {voteResultPercentage}%
          </Typography>
        </ImageVoteResult>
      ) : null}
    </ImageButton>
    //   ))}
    // </Box>
  );
}
