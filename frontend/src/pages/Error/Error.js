import { ErrorContainer } from './Error.elements';

// TODO
function ErrorText({ errorCode }) {
  return <div>{errorCode}</div>;
}

const Error = ({ errorCode }) => {
  return (
    <ErrorContainer>
      <ErrorText errorCode={errorCode} />
    </ErrorContainer>
  );
};

export default Error;
