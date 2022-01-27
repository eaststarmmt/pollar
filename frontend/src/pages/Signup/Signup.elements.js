import styled from 'styled-components';
import { Container } from '../../assets/styles/globalStyles';
import Input from 'react-validation/build/input';

export const SignupContainer = styled(Container)`
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

// TODO 반응형 UI
export const MainContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  // height: 80vh;
  width: 30vw;
  background: rgba(255, 255, 255, 0.75);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(8.5px);
  -webkit-backdrop-filter: blur(8.5px);
  border-radius: 10px;
  color: #6667ab;
  // text-transform: uppercase;
  // letter-spacing: 0.4rem;
  @media only screen and (max-width: 320px) {
    width: 80vw;
    height: 90vh;
    hr {
      margin-bottom: 0.3rem;
    }
    h4 {
      font-size: small;
    }
  }
  @media only screen and (min-width: 360px) {
    width: 80vw;
    // height: 90vh;
    h4 {
      font-size: small;
    }
  }
  @media only screen and (min-width: 411px) {
    width: 80vw;
    // height: 90vh;
  }

  @media only screen and (min-width: 768px) {
    width: 80vw;
    // height: 80vh;
  }
  @media only screen and (min-width: 1024px) {
    width: 70vw;
    // height: 50vh;
  }
  @media only screen and (min-width: 1280px) {
    width: 30vw;
    // height: 80vh;
  }
`;

export const WelcomeText = styled.h2`
  margin: 3rem 0 2rem 0;
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: 20%;
  width: 100%;
`;

export const ButtonContainer = styled.div`
  margin: 1rem 0 2rem 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const LoginWith = styled.h5`
  cursor: pointer;
`;

export const HorizontalRule = styled.hr`
  width: 90%;
  height: 0.3rem;
  border-radius: 0.8rem;
  border: none;
  background: linear-gradient(to right, #14163c 0%, #03217b 79%);
  background-color: #ebd0d0;
  margin: 1.5rem 0 1rem 0;
  backdrop-filter: blur(25px);
`;

export const IconsContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin: 2rem 0 3rem 0;
  width: 80%;
`;

export const ForgotPassword = styled.h4`
  cursor: pointer;
`;

// Input Component

// export function Input({ type, placeholder }) {
//   return <StyledInput type={type} placeholder={placeholder} />;
// }

export const StyledInput = styled(Input)`
  background: rgba(255, 255, 255, 0.15);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  border-radius: 2rem;
  width: 80%;
  height: 3rem;
  padding: 1rem;
  border: none;
  outline: none;
  color: #3c354e;
  font-size: 1rem;
  font-weight: bold;
  &:focus {
    display: inline-block;
    box-shadow: 0 0 0 0.2rem #b9abe0;
    backdrop-filter: blur(12rem);
    border-radius: 2rem;
  }
  &::placeholder {
    color: #b9abe099;
    font-weight: 100;
    font-size: 1rem;
  }
  ${Input}
`;

// Button Component

// export function Button({ content }) {
//   return <StyledButton>{content}</StyledButton>;
// }

export const StyledButton = styled.button`
  background: linear-gradient(to right, #14163c 0%, #03217b 79%);
  // text-transform: uppercase;
  letter-spacing: 0.2rem;
  width: 65%;
  height: 3rem;
  border: none;
  color: white;
  border-radius: 2rem;
  cursor: pointer;
`;

// Icon Component

// export function Icon({ color, children }) {
//   return <StyledIcon background={color}>{children}</StyledIcon>;
// }

export const StyledIcon = styled.div`
  height: 3.5rem;
  width: 3.5rem;
  background: ${(props) => props.background};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4rem;
  color: white;
  cursor: pointer;
  svg {
    width: 1.5rem;
    height: 1.5rem;
  }
`;
