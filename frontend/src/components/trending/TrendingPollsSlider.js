import { Box, Card, Container, IconButton, Stack } from '@mui/material';

import { useState } from 'react';
// todo 임시 UI 작업해놓은 것
import './tempstyle.css';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import PollTrendingCard from '../polls/PollTrendingCard';

export default function TrendingPollsSlider() {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const checkNext = () => {
    const labels = document.querySelectorAll('#slider label');
    const nextIndex = selectedIndex === labels.length - 1 ? 0 : selectedIndex + 1;
    setSelectedIndex(nextIndex);
  };

  const check = (index) => setSelectedIndex(index);

  return (
    <>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        // sx={{ width: '50vw' }}
      >
        <IconButton color="primary" aria-label="prev item" onClick={checkNext}>
          <ArrowBackIosIcon />
        </IconButton>
        {/* <div className="md:w-2/4 md:mb-0 mb-6 flex flex-col text-center items-center"> */}
        <Box>
          <section
            id="slider"
            className="w-16 h-20 inline-flex items-center justify-center mb-5 flex-shrink-0"
          >
            <input
              type="radio"
              name="slider"
              id="s1"
              checked={selectedIndex === 0}
              onClick={() => check(0)}
            />
            <input
              type="radio"
              name="slider"
              id="s2"
              checked={selectedIndex === 1}
              onClick={() => check(1)}
            />
            <input
              type="radio"
              name="slider"
              id="s3"
              checked={selectedIndex === 2}
              onClick={() => check(2)}
            />
            <label htmlFor="s1" id="slide1">
              <PollTrendingCard />
            </label>
            <label htmlFor="s2" id="slide2">
              <PollTrendingCard />
              {/* <Card
                sx={{
                  height: '100%',
                  width: '100%',
                }}
              >
                <img
                  className="fea"
                  src="https://picsum.photos/200/300"
                  height="100%"
                  width="100%"
                />
              </Card> */}
            </label>
            <label htmlFor="s3" id="slide3">
              <PollTrendingCard />
            </label>
          </section>
        </Box>
        {/* </div> */}
        <IconButton color="primary" aria-label="next item" onClick={checkNext}>
          <ArrowForwardIosIcon />
        </IconButton>
      </Stack>
    </>
  );
}
