import { Container } from '../../assets/styles/globalStyles';

import React, { useState, useEffect } from 'react';

import PollService from '../../services/poll.service';

const Polls = () => {
  const [content, setContent] = useState('');

  useEffect(() => {
    PollService.getUserBoard().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

        setContent(_content);
      }
    );
  }, []);

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>{content}</h3>
      </header>
    </div>
  );
};

export default Polls;
