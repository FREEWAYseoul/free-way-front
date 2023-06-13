import styled from 'styled-components';

const ProgressBar = () => {
  return (
    <ProgressBarContainer>
      <ProgressBarFill />
    </ProgressBarContainer>
  );
};

export default ProgressBar;

const ProgressBarContainer = styled.div`
  width: 100%;
  height: 4px;
  background-color: #f2f2f2;
  border-radius: 5px;
  overflow: hidden;
`;

const ProgressBarFill = styled.div`
  height: 100%;
  background-color: #316bff;
  animation: progress-animation 1s linear infinite;
  @keyframes progress-animation {
    0% {
      width: 0;
    }
    100% {
      width: 100%;
    }
  }
`;
