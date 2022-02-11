import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';

function PollTextOptions(props) {
  const { vote, setVote } = props;

  const [textList, setTextList] = useState([0]);

  const createTextList = (item) => {
    let voteArr = [...textList];
    let counter = voteArr.slice(-1)[0];
    counter += 1;

    voteArr.push(counter);
    setTextList(voteArr);
  };

  const changeList = () => {
    setVote({
      ...vote,
      voteSelects: textList,
    });
  };

  return (
    <>
      {textList &&
        textList.map((item, i) => (
          <TextField
            key={i}
            id="vote-list"
            label={`${i + 1}번 선택지`}
            required
            fullWidth
            placeholder="투표 선택지 입력"
            onChange={(e) => {
              setVote({
                ...vote,
                textList: (textList[i] = e.target.value),
              });
              changeList();
            }}
          />
        ))}
      <br />
      <br />
      {textList.length > 2 && (
        <Button
          onClick={(e) => {
            setVote({
              ...vote,
              textList: textList.pop(),
            });
          }}
        >
          Delete Options
        </Button>
      )}
      {textList.length < 4 && (
        <Button variant="contained" className="option-button" onClick={createTextList}>
          + Add more options
        </Button>
      )}
    </>
  );
}

export default PollTextOptions;
