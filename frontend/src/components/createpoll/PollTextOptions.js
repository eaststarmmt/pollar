import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import { useEffect } from 'react';

function PollTextOptions(props) {
  const { vote, setVote } = props;

  const [voteList, setVoteList] = useState([0]);

  const createVoteList = (item) => {
    let voteArr = [...voteList];
    let counter = voteArr.slice(-1)[0];
    counter += 1;

    voteArr.push(counter);
    setVoteList(voteArr);
    setVote({
      ...vote,
      voteSelects: voteArr,
    });
  };

  return (
    <>
      {voteList &&
        voteList.map((item, i) => (
          <>
            <TextField
              key={i}
              id="vote-list"
              label={`${i + 1}번 선택지`}
              required
              fullWidth
              placeholder="투표 선택지 입력"
              // value={vote.voteSelects[i]}
              onBlur={(e) => {
                setVote({
                  ...vote,
                  voteList: (voteList[i] = e.target.value),
                });
                console.log(voteList);
              }}
            />
            <br />
            <br />
          </>
        ))}

      {voteList.length > 2 && (
        <Button
        onClick={(e) => {
          setVote({
            ...vote,
            voteList: voteList.pop(),
          });
        }}
        >
          Delete Options
        </Button>
      )}
      {voteList.length < 4 && (
        <Button
          variant="contained"
          // onClick={}
          className="option-button"
          onClick={createVoteList}
        >
          + Add more options
        </Button>
      )}
    </>
  );
}

export default PollTextOptions;
