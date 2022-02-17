import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Typography, Card, Snackbar } from '@mui/material';
import Container from '@mui/material/Container';

import { voteCreate, voteImageCreate } from '../../services/api/PollApi';
import BasicForm from './BasicForm';
import PollImageOptions from './PollImageOptions';
import PollTextOptions from './PollTextOptions';
import { getLoggedUserId } from '../../utils/loggedUser';
import { loggedUserState } from '../../atoms/atoms';
import { constSelector, useRecoilState } from 'recoil';

function CreateForm() {
  const loggedUserId = getLoggedUserId();
  const navigate = useNavigate();
  const [imageList, setImageList] = useState([0]);

  const [vote, setVote] = useState({
    author: '',
    voteName: '',
    voteContent: '',
    voteType: 'true',
    voteExpirationTime: '',
    userAnonymousType: false,
    voteAnonymousType: false,
    voteCategories: [],
    voteSelects: [],
  });

  // alert
  const [alert, setAlert] = useState({
    open: false,
    vertical: 'center',
    horizontal: 'center',
  });
  const { vertical, horizontal, open } = alert;

  const openAlert = () => {
    setAlert({
      ...alert,
      open: true,
    });
  };
  const closeAlert = () => {
    setAlert({
      ...alert,
      open: false,
    });
  };

  // submit
  const handleCreate = async () => {
    if (!vote.voteCategories.length){
      openAlert()
    } else{
    try {
      if (vote.voteType === 'true') {
        // 텍스트 formData 생성
        const item = vote.voteSelects;
        const tmpList = [];
        for (const [key, value] of item.entries()) {
          const vtitle = {
            selectionTitle: `${key + 1}번 선택지`,
            content: value,
          };
          tmpList.push(vtitle);
        }
        const voteDto = {
          author: loggedUserId,
          voteName: vote.voteName,
          voteContent: vote.voteContent,
          voteType: vote.voteType,
          voteExpirationTime: vote.voteExpirationTime,
          userAnonymousType: vote.userAnonymousType,
          voteAnonymousType: vote.voteAnonymousType,
          voteCategories: vote.voteCategories,
          voteSelects: tmpList,
        };
        const form = new FormData();

        form.append('voteDto', new Blob([JSON.stringify(voteDto)], { type: 'application/json' }));
        const result = await voteCreate(form);
        if (result.message == 'success') {
          navigate(`/polls/${result.voteId}`);
        } else {
          openAlert();
          navigate(`/polls`);
        }
      } else {
        // 이미지 formData 생성
        const item = vote.voteSelects;
        const tmpList = [];
        console.log('imageList', imageList);
        console.log('imageList', imageList.length);
        console.log('voteSelects', item);

        for (var i = 0; i < imageList.length; i++) {
          const vtitle = {
            selectionTitle: `${i + 1}번 선택지`,
          };
          tmpList.push(vtitle);
        }
        const voteDto = {
          author: loggedUserId,
          voteName: vote.voteName,
          voteContent: vote.voteContent,
          voteType: vote.voteType,
          voteExpirationTime: vote.voteExpirationTime,
          userAnonymousType: vote.userAnonymousType,
          voteAnonymousType: vote.voteAnonymousType,
          voteCategories: vote.voteCategories,
          voteSelects: tmpList,
        };
        const form = new FormData();

        form.append('voteDto', new Blob([JSON.stringify(voteDto)], { type: 'application/json' }));

        for (var i = 0; i < imageList.length; i++) {
          form.append('votePhotos', vote.voteSelects[i]);
        }
        const result = await voteImageCreate(form);

        if (result.message == 'success') {
          navigate(`/polls/${result.voteId}`);
        }
      }
    } catch (error) {
      openAlert();
      navigate(`/polls`);
    }}

  };
  useEffect(()=> {
    console.log(!vote.voteName && !vote.voteContent )
    console.log(!vote.voteCategories.length)
  },[vote.voteCategories])
  return (
    <>
      {alert.open && (
        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={open}
          onClose={closeAlert}
          message="투표 생성에 실패하였습니다. 필수 정보를 모두 입력하세요. "
          autoHideDuration={2000}
        />
      )}

      <Box>
        <BasicForm vote={vote} setVote={setVote} />
        {vote.voteType === 'true' ? (
          <PollTextOptions vote={vote} setVote={setVote} />
        ) : (
          <>
            <PollImageOptions
              vote={vote}
              setVote={setVote}
              imageList={imageList}
              setImageList={setImageList}
            />
          </>
        )}
        {(!vote.voteName && !vote.voteContent ) ? (
          <>
            <Button variant="contained" disabled size="large">
              투표 생성하기 
            </Button>
            <br />
            <Typography variant="caption" sx={{ color: 'red' }}>
              투표 생성에 필요한 모든 정보를 입력하세요.
            </Typography>
          </>
        ) : imageList.length >= 2 || vote.voteSelects.length >= 2 ? (
          <Button variant="contained" onClick={handleCreate}>
            투표 생성하기 
          </Button>
        ) : (
          <>
            <Button variant="contained" disabled>
              투표 생성하기 
            </Button>
            <br />
            <Typography variant="caption" sx={{ color: 'red' }}>
              투표 선택지를 2개 이상 생성하세요.
            </Typography>
          </>
        )}
      </Box>
    </>
  );
}

export default CreateForm;
