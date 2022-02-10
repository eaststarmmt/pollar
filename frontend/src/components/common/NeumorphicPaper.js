import styled from '@emotion/styled';

const { Paper } = require('@mui/material');

const colors = {
  primaryLight: '#8abdff',
  primary: '#6d5dfc',
  primaryDark: '#5b0eeb',

  white: '#FFFFFF',
  greyLight1: '#E4EBF5',
  greyLight2: '#c8d0e7',
  greyLight3: '#bec8e4',
  greyDark: '#9baacf',
};

const shadow = `.3rem .3rem .6rem ${colors.greyLight2}, -.2rem -.2rem .5rem ${colors.white}`;
const innerShadow = `inset .2rem .2rem .5rem ${colors.greyLight2}, inset -.2rem -.2rem .5rem ${colors.white}`;

const NeumorphicPaper = styled(Paper)(({ theme }) => ({
  // width: '20.4rem',
  // height: '4rem',
  border: 'none',
  borderRadius: '1rem',
  fontSize: '1.4rem',
  paddingLeft: '1.4rem',
  paddingRight: '1.4rem',
  boxShadow: `${innerShadow}`,
  background: 'none',
  fontFamily: 'inherit',
  color: `${colors.greyDark}`,
  //? 스크롤 가능하게
  overflow: 'auto',
  // &::placeholder { color: var(--greyLight-3); }
  // &:focus { outline: none; box-shadow: $shadow; }
}));

export default NeumorphicPaper;
