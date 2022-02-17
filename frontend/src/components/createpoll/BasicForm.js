import DatePicker from './DatePicker';
import {
  Box,
  Stack,
  TextField,
  Typography,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  FormGroup,
  Grid,
  Checkbox,
  Modal,
  Chip,
  FormHelperText,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import CategoryModal from './CategoryModal';
import React from 'react';

function BasicForm(props) {
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 1000,
    height: 500,
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: 2,
    p: 4,
  };

  const { vote, setVote } = props;
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  // 카테고리 리스트 확인
  const [voteInterest, setVoteInterest] = useState([]);
  const anonymousMsg = {
    voteAnonymous: '투표자가 익명으로 투표하게 됩니다.',
    userAnonymous: '투표가 익명으로 생성되며 투표자도 익명으로 투표됩니다.',
  };

  console.log(voteInterest);
  // useEffect(() => {
  //   voteInterest.map((item) => {
  //     console.log(item);
  //   });
  // }, [voteInterest]);

  return (
    <>
      <Box>
        <Stack spacing={1}>
          <Typography
            sx={{ fontSize: 22, fontWeight: 'bold', color: 'text.secondary' }}
            paddingTop={1}
          >
            투표 제목 *
          </Typography>
          <TextField
            id="voteName"
            variant="standard"
            required
            fullWidth
            placeholder="투표 제목을 입력하세요."
            inputProps={{ maxLength: 20 }}
            value={vote.voteName}
            onChange={(e) =>
              setVote({
                ...vote,
                voteName: e.target.value,
              })
            }
          />{' '}
        </Stack>
        <Stack spacing={1} paddingTop={2}>
          <Typography
            sx={{ fontSize: 22, fontWeight: 'bold', color: 'text.secondary' }}
            paddingTop={1}
          >
            투표 내용 *
          </Typography>
          <TextField
            id="voteContent"
            placeholder="투표 내용을 입력하세요 "
            inputProps={{ maxLength: 1000 }}
            multiline
            fullWidth
            rows={4}
            variant="standard"
            required
            value={vote.voteContent}
            onChange={(e) =>
              setVote({
                ...vote,
                voteContent: e.target.value,
              })
            }
          />
        </Stack>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} paddingTop={2} paddingBottom={2}>
          <Typography
            paddingTop={1}
            sx={{ fontSize: 22, fontWeight: 'bold', color: 'text.secondary' }}
          >
            투표 카테고리 *
          </Typography>
          <Stack justifyContent="center" alignItems="center" direction={{ xs: 'column', sm: 'row' }}>
            <Stack direction={{ xs: 'column', sm: 'row', }}>
              {voteInterest.map((item, index) => (
                <Chip key={index} label={item.categoryNameSmall} variant="filled" sx={{ mx:0.3}} />
              ))}
            </Stack>
            <Button onClick={handleOpen} variant="contained" sx={{ mx:3,}}>
              카테고리 선택
            </Button>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style} overflow="auto">
                <CategoryModal
                  vote={vote}
                  setVote={setVote}
                  setVoteInterest={setVoteInterest}
                  close={handleClose}
                  voteInterest={voteInterest}
                />
              </Box>
            </Modal>
          </Stack>
        </Stack>

        <hr></hr>
        <Stack>
          <Stack paddingTop={2} direction={{ xs: 'column', sm: 'row' }}>
            <Stack>
            <Typography
              sx={{ fontSize: 22, fontWeight: 'bold', color: 'text.secondary' }}
              paddingBottom={1}
            >
              투표 익명 옵션 선택
            </Typography>
              <FormControlLabel
                label="익명으로 투표 생성하기"
                control={
                  <Checkbox
                    checked={vote.userAnonymousType}
                    onClick={(e) => {
                      setVote({
                        ...vote,
                        userAnonymousType: e.target.checked,
                      });
                    }}
                  />
                }
              />
              <FormControlLabel
                label="투표자만 익명으로 설정하기"
                control={
                  <Checkbox
                    checked={vote.voteAnonymousType}
                    onClick={(e) => {
                      setVote({
                        ...vote,
                        voteAnonymousType: e.target.checked,
                      });
                    }}
                  />
                }
              />
            </Stack>
            <Stack spacing={2} sx={{ml:20}}>
              <Typography
                sx={{ fontSize: 22, fontWeight: 'bold', color: 'text.secondary' }}
                paddingTop={1}
              >
                투표 마감시간
              </Typography>
              <Stack>
                <DatePicker vote={vote} setVote={setVote} />
              </Stack>
            </Stack>
          </Stack>
          {vote.userAnonymousType ? (
            <FormHelperText>{anonymousMsg.userAnonymous}</FormHelperText>
          ) : (
            vote.voteAnonymousType && <FormHelperText>{anonymousMsg.voteAnonymous}</FormHelperText>
          )}

        </Stack>
        <br />
        <hr></hr>
        <Typography
          sx={{ fontSize: 22, fontWeight: 'bold', color: 'text.secondary' }}
          paddingTop={1}
          paddingBottom={1}
        >
          투표 타입 선택
        </Typography>
        <Typography variant="caption" paddingTop={1} sx={{ color: 'text.secondary' }}>
          &nbsp;투표는 2개 이상의 선택지를 반드시 생성하여야 합니다. <br />
        </Typography>
        <RadioGroup
          row
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="controlled-radio-buttons-group"
          value={vote.voteType}
          onChange={(e) =>
            setVote({
              ...vote,
              voteType: e.target.value,
            })
          }
        >
          <FormControlLabel value={true} control={<Radio />} label="텍스트 투표" />
          <FormControlLabel value={false} control={<Radio />} label="이미지 투표" />
        </RadioGroup>
      </Box>
    </>
  );
}

export default BasicForm;
