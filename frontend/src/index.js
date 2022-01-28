import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { RecoilRoot } from 'recoil';
// import { Provider } from 'react-redux';
// import store from './store/store';

ReactDOM.render(
  <RecoilRoot>
    <App />,
  </RecoilRoot>,
  document.getElementById('root')
);
