import React, { useEffect, useState } from 'react';

import Container from '@mui/material/Container';
import { Box, Card, Button } from '@mui/material';

import { voteCreate, voteImageCreate } from '../../services/api/PollApi';
import BasicForm from './BasicForm';
import PollImageOptions from './PollImageOptions';
import PollTextOptions from './PollTextOptions';
import { loggedUserState } from '../../atoms/atoms';
import { constSelector, useRecoilState } from 'recoil';

function CreateForm() {
  const [loggedUser, setloggedUser] = useRecoilState(loggedUserState);

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
  // voteType change
  const [options, setOptions] = useState(vote.voteType);

  useEffect(() => {
    setOptions(vote.voteType === 'true');
  }, [vote]);

  // create를 두번 눌러야됨.. 왜이런지 모르겠다.
  const addVoteTitle = () => {
    console.log('1');
    const item = vote.voteSelects;
    const tmpList = [];
    for (const [key, value] of item.entries()) {
      const vtitle = {
        selectionTitle: `${key + 1}번 선택지`,
        content: value,
      };
      tmpList.push(vtitle);
    }
    // tmpList 까진 실행이 됨
    // setVote가 안되는듯
    setVote({
      ...vote,
      voteSelects: tmpList,
    });
    // console.log(vote.voteSelects)
  };

  // submit
  const handleCreate = async () => {
    // data 형식 변경
    console.log(loggedUser);
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
      author: 'user123',
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

    if (vote.voteType === 'true') {
      const result = await voteCreate(form);
    } else {
      const result = await voteImageCreate(form);
    }

    // console.log(result.message);
    // for (let key of form.keys()) {
    //   console.log(key, ':', form.get(key));
    // }

    for (let key of form.keys()) {
      console.log(key, ':', form.get(key));
    }
  };

  return (
    <>
      <Box>
        <BasicForm vote={vote} setVote={setVote} setOptions={setOptions} />
        {options ? (
          <PollTextOptions vote={vote} setVote={setVote} />
        ) : (
          <PollImageOptions vote={vote} setVote={setVote} />
        )}

        <Button
          fullWidth
          variant="contained"
          // onMouseOver={addVoteTitle}
          onClick={handleCreate}
        >
          create
        </Button>
      </Box>
    </>
  );
}

export default CreateForm;
