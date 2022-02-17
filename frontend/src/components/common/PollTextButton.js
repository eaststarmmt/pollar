import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { cancelPollVote, requestPollVote } from '../../services/api/PollApi';
import { Button } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';

const TextButton = styled(Button)(({ theme }) => ({
  position: 'relative',
  width: '100%',
  // height: 200,
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

const TextVoteResult = styled('span')(({ theme }) => ({
  // //? (선택지의) 투표율을 표현, sx로 설정할 부분
  // width: '100%',
  left: 0,
  height: '100%',
  position: 'absolute',
  display: 'flex',
  alignItems: 'center',
  // right: 60,
  // fontSize: 16,
  // justifyContent: 'center',
  textAlign: 'start',
  paddingLeft: 10,

  backgroundColor: theme.palette.warning.main,
  color: '#fff',
  opacity: 0.7,
  borderRadius: 7,
  transition: theme.transitions.create('opacity'),
  // zIndex: 1,
}));

/**
 *
 * @param {selection, isVoted, voteResultPercentage, setPollVotedState} (순서대로) 투표선택지 데이터 / 투표완료된 투표인지 여부 / 이 선택지에 대한 퍼센티지 결과값(100)
 * @returns
 */
export default function PollTextButton({
  selection,
  isVoted,
  setPollVotedState,
  voteResultPercentage,
  isSelectedVote,
}) {
  // 현재 로그인된 사용자가 투표한 선택지
  const [userVote, setUserVote] = useState(isSelectedVote);

  const [alert, setAlert] = useState({
    open: false,
    vertical: 'bottom',
    horizontal: 'left',
  });

  const { vertical, horizontal, open } = alert;
  // false 인 상태가 안한거 true 면 성공한거 true 일때 메시지가 나와야함
  const [alertState, setAlertState] = useState({
    voteSuccess: false,
    voteFail: false,
    cancleSuccess: false,
    cancleFail: false,
  });

  const alertMsg = {
    voteSuccess: '투표가 완료되었습니다.',
    voteFail: '투표하기에 문제 발생. 잠시 후 다시 시도해주세요',
    cancleSuccess: '투표가 취소되었습니다.',
    cancleFail: '투표 취소에 문제 발생. 잠시 후 다시 시도해주세요',
  };

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
      voteSuccess: false,
      voteFail: false,
      cancleSuccess: false,
      cancleFail: false,
    });
  };

  /* 투표하기 */
  // 투표 선택지 클릭 시, 투표하기
  const handleClick = async () => {
    //// (디자인을 위해 선택한 항목일 경우 disabled를 해제해놔서 별도의 처리 필요)
    /* 투표하기 */
    if (!userVote) {
      // 서버로 해당 선택 데이터 전송
      const result = await requestPollVote(selection.selectionId);
      if (result === 'success') {
        // todo alert 다 대체
        setAlertState({
          ...alertState,
          voteSuccess: true,
        });
        // alert('투표완료! 투표취소는 본인 프로필에서만 가능합니다');
        openSuccessAlert();
        setPollVotedState(true);
        setUserVote(true);
      } else {
        // todo 에러처리
        setAlertState({
          ...alertState,
          voteFail: true,
        });
        openSuccessAlert();
        setPollVotedState(false);
        setUserVote(false); // (필요없나)
      }
    }
    /* 투표 취소 */
    // 사용자가 투표한 항목을 다시 눌렀을 때 취소 처리
    else {
      // todo 대체
      setAlertState({
        ...alertState,
        cancleSuccess: true,
      });
      openSuccessAlert();
      const result = await cancelPollVote(selection.selectionId);
      if (result === 'success') {
        setPollVotedState(false);
        setUserVote(false);
      } else {
        setAlertState({
          ...alertState,
          cancleFail: true,
        });
        openSuccessAlert();
      }
    }
  };

  return (
    <>
      {alertState.voteSuccess ? (
        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={open}
          onClose={closeSuccessAlert}
          message={alertMsg.voteSuccess}
          autoHideDuration={2000}
        />
      ) : alertState.voteFail ? (
        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={open}
          onClose={closeSuccessAlert}
          message={alertMsg.voteFail}
          autoHideDuration={2000}
        />
      ) : alertState.cancleSuccess ? (
        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={open}
          onClose={closeSuccessAlert}
          message={alertMsg.cancleSuccess}
          autoHideDuration={2000}
        />
      ) : (
        alertState.cancleFail && (
          <Snackbar
            anchorOrigin={{ vertical, horizontal }}
            open={open}
            onClose={closeSuccessAlert}
            message={alertMsg.closeFail}
            autoHideDuration={2000}
          />
        )
      )}
      <TextButton
        variant="outlined"
        onClick={handleClick}
        // 투표완료 OR 마감된 투표일 경우 hover 막음
        disabled={isVoted && !userVote}
        color={userVote ? 'inherit' : 'primary'}
        style={{
          width: '100%',
        }}
      >
        {/* 투표 선택지 선택 시 결과 */}
        {isVoted ? (
          <>
            <TextVoteResult
              sx={{
                width: `${voteResultPercentage}%`,
              }}
            >
              <Typography variant="subtitle2">{`${voteResultPercentage}%`}</Typography>
            </TextVoteResult>
          </>
        ) : null}
        <Typography
          variant="subtitle2"
          color="inherit"
          zIndex={1}
          sx={{ fontWeight: userVote ? 600 : '' }}
        >
          {selection.content}
        </Typography>
      </TextButton>
    </>
  );
}
