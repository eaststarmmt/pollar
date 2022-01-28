import styled from 'styled-components';
import { Container } from '../../assets/styles/globalStyles';

export const ErrorContainer = styled(Container)`
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

export const PageNotFoundError = styled.h1``;

export const InternalServerError = styled.h1``;
