import { Slogan, Guideline, HomeContainer, HomeImage } from './Home.elements';
import '../../assets/styles/neumorphism.css';

import React, { useState, useEffect } from 'react';

import UserService from '../../services/user.service';
import PollService from '../../services/poll.service';

function Home() {
  const [content, setContent] = useState('');

  useEffect(() => {
    PollService.getTrendingPoll().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content = (error.response && error.response.data) || error.message || error.toString();
        setContent(_content);
      }
    );
  }, []);

  return (
    <>
      <HomeContainer>
        <div>
          <Slogan>
            Poll Whatever,
            <br />
            Anywhere
          </Slogan>
          <Guideline>
            Lorem ipsum dolor sit amet,
            <br /> consectetur adipiscing elit. Diam sit condimentum sit diam.
          </Guideline>
          {/* <Button onClick={null} fontBig primary>
            Get Started
          </Button> */}
          <div className="btn btn__secondary">Get Started</div>
        </div>
        <HomeImage />
      </HomeContainer>
    </>
  );
}

export default Home;
