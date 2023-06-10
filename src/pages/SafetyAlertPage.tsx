import styled from 'styled-components';
import SafetyHeader from '../components/domain/SaftyAlert/SafetyHeader';
import SafetyContents from '../components/domain/SaftyAlert/SafetyContents';

const SafetyAlertPage = () => {
  return (
    <StyledContainer>
      <SafetyHeader />
      <SafetyContents />
    </StyledContainer>
  );
};

export default SafetyAlertPage;

const StyledContainer = styled.div`
  height: 100%;
  width: 100%;
`;
