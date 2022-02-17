import { Box, IconButton, Stack } from '@mui/material';

import { useState } from 'react';
// todo 임시 UI 작업해놓은 것
import './tempstyle.css';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import PollTrendingCard from './PollTrendingCard';
import { getTrendingPollList } from '../../services/api/PollApi';
import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { isLoggedState } from '../../atoms/atoms';
import { useNavigate } from 'react-router-dom';
import { checkUserLogged } from '../../utils/loggedUser';

export default function TrendingPollsSlider() {
  // 로그인된 사용자인지 여부
  const isLogged = useRecoilValue(isLoggedState);
  const [isLoggedUser, setIsLoggedUser] = useState(false);

  const navigate = useNavigate();

  const [selectedIndex, setSelectedIndex] = useState(0);

  const [pollList, setPollList] = useState([]);

  /* Trending(인기) 투표 목록 요청 */
  const getPollList = async () => {
    const list = await getTrendingPollList();
    console.log(list);
    setPollList(list);
  };

  const checkNext = () => {
    const labels = document.querySelectorAll('#slider label');
    const nextIndex = selectedIndex === labels.length - 1 ? 0 : selectedIndex + 1;
    setSelectedIndex(nextIndex);
  };

  const check = (index) => setSelectedIndex(index);

  // useEffect(() => {
  //   getPollList();
  // }, []);

  useEffect(() => {
    // todo 콘솔 찍어보는 용으로 아래 쓰고, 이 아래부분으로 간결하게 대체
    setIsLoggedUser(isLogged || checkUserLogged());
    // if (!isLogged && !checkUserLogged()) {
    //   console.log(
    //     '로그인안한 사용자. 투표 불가능 / 좋아요 불가능 / 클릭 시 로그인 창으로 redirect'
    //   );
    //   setIsLoggedUser(false);
    // } else {
    //   console.log('로그인한 사용자. 투표 가능');
    //   setIsLoggedUser(true);
    // }
    getPollList();
  }, [isLogged]);

  return (
    <>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <IconButton color="primary" aria-label="prev item" onClick={checkNext}>
          <ArrowBackIosIcon />
        </IconButton>
        <Box>
          <section
            id="slider"
            className="w-16 h-20 inline-flex items-center justify-center mb-5 flex-shrink-0"
          >
            {pollList.map((poll, index) => (
              <input
                key={index}
                type="radio"
                name="slider"
                id={`trending${index + 1}`}
                checked={selectedIndex === index}
                onChange={() => check(index)}
              />
            ))}
            {pollList.map((poll, index) => (
              <label key={index} htmlFor={`trending${index + 1}`} id={`slide${index + 1}`}>
                <PollTrendingCard poll={poll} isLoggedUser={isLoggedUser} />
              </label>
            ))}
          </section>
        </Box>
        <IconButton color="primary" aria-label="next item" onClick={checkNext}>
          <ArrowForwardIosIcon />
        </IconButton>
      </Stack>
    </>
  );
}
