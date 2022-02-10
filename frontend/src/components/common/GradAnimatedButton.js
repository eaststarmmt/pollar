import { Button } from '@mui/material';

import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

// @eazae
const gradAnimation = keyframes` 
0% {
  background-position: 0% 50%
}
50% {
  background-position: 100% 50%
}
100%{
  background-position: 0% 50%
}
`;

const GradAnimatedButton = styled(Button)(({ theme }) => ({
  textAlign: 'center',
  paddingLeft: 20,
  paddingRight: 20,
  color: 'rgba(255,255,255,0.9)',
  borderRadius: '10px',
  // background: 'linear-gradient(-45deg, #FFA63D, #FF3D77, #338AFF, #3CF0C5)',
  background: 'linear-gradient(-45deg, #FFA63D, #FF3D77, #338AFF)',
  backgroundSize: '600%',
  boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
  animation: `${gradAnimation} 5s linear infinite`,
}));

export default GradAnimatedButton;
