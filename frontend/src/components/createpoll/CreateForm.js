import React, { useEffect, useState } from 'react';

import Container from '@mui/material/Container';
import { Box, Card, Button } from '@mui/material';

import { voteCreate } from '../../services/api/PollApi';
import BasicForm from './BasicForm';
import PollImageOptions from './PollImageOptions';
import PollTextOptions from './PollTextOptions';
import { loggedUserState } from '../../atoms/atoms'
import { useRecoilState } from 'recoil';

function CreateForm() {

  // const [loggedUser, setloggedUser ] = useRecoilState(loggedUserState);

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

  // submit
  const handleCreate = async (e) => {
    e.preventDefault();

    try {
      const result = await voteCreate(vote);
      console.log(result.message)
      




    } catch (error) {

    }
  }


  return (
    <>
      <Box bgColor="white">
        <Container>
          <Card
            sx={{
              p: 8,
              mx: { xs: 2, lg: 3 },
              mt: 8,
              mb: 4,
              backgroundColor: '#fff6',
              // backgroundColor: ({ palette: { white }, functions: { rgba } }) => rgba(white.main, 0.8),
              backdropFilter: 'saturate(200%) blur(30px)',
              /* offset-x | offset-y | blur-radius | spread-radius | color */
              boxShadow: '2px 2px 20px 10px rgba(0, 0, 0, 0.1)',
              overflow: 'visible',
            }}
          >
            <BasicForm vote={vote} setVote={setVote} setOptions={setOptions} />
            {options ? (
              <PollTextOptions vote={vote} setVote={setVote} />
            ) : (
              <PollImageOptions vote={vote} setVote={setVote} />
            )}

            <Button fullWidth variant="contained" onClick={handleCreate}>
              create
            </Button>
          </Card>
        </Container>
      </Box>
    </>
  );
}

export default CreateForm;
