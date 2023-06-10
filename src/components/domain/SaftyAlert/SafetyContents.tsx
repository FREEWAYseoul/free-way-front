import styled from 'styled-components';
import SafetyAlertBox from './SafetyAlertBox';

const SafetyContents = () => {
  return (
    <StyledContents>
      <SafetyAlertBox />
      <SafetyAlertBox />
      <SafetyAlertBox />
    </StyledContents>
  );
};

export default SafetyContents;

const StyledContents = styled.div`
  display: flex;
  flex-direction: column;
  gap: 23px;
  height: calc(100% - 50px);
  padding-bottom: 80px;
  overflow: auto;

  &::-webkit-scrollbar {
    display: none;
  }
`;
