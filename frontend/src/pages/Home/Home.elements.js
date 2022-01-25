import styled from 'styled-components';
import logo from '../../assets/images/grad.png';
import { Container } from '../../assets/styles/globalStyles';

export const HomeContainer = styled(Container)`
  height: 800px;
  padding: 100px;
  display: flex;
  justify-content: center;
  font-size: 1.2rem;
  position: relative;
  display: flex;
  flex-direction: row;
  // align-items: flex-start;
  top: 0;
  ${Container}
`;

export const Slogan = styled.h1`
  background-color: transparent;
  padding: 4rem 0 0 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: left;
  color: #6667ab;
  font-size: 48px;
  font-family: 'Source Sans Pro', Hiragino Kaku Gothic Std;
  z-index: 999;
`;

export const Guideline = styled.h4`
  background-color: transparent;
  padding: 4rem 0 8rem 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: left;
  color: #666;
  font-family: 'Source Sans Pro', sans-serif;
  font-weight: lighter;
`;

export const HomeImage = styled.img.attrs({
  src: `${logo}`,
})`
  width: 600px;
  padding: 0 0 0 100px;
  object-fit: contain;
  position: sticky;
  right: 0px;
  z-index: 0;
`;

export const ExploreButton = styled.button`
  border-radius: 4px;
  background: ${({ primary }) => (primary ? '#6667ab' : '#393A6F')};
  white-space: nowrap;
  padding: ${({ big }) => (big ? '12px 64px' : '10px 20px')};
  color: #fff;
  font-size: ${({ fontBig }) => (fontBig ? '20px' : '16px')};
  outline: none;
  border: none;
  cursor: pointer;
  &:hover {
    transition: all 0.3s ease-out;
    background: #fff;
    background-color: ${({ primary }) => (primary ? '#393A6F' : '#4B59F7')};
  }
  @media screen and (max-width: 960px) {
    width: 100%;
  }
`;
