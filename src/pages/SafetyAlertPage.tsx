import styled from 'styled-components';
import SafetyContents from '../components/domain/SaftyAlert/SafetyContents';
import PageHeader from '../components/domain/SaftyAlert/SafetyHeader';

const SafetyAlertPage = () => {
  return (
    <StyledContainer>
      <PageHeader title='알림' />
      <SafetyContents />
    </StyledContainer>
  );
};

export default SafetyAlertPage;

const StyledContainer = styled.div`
  height: 100%;
  width: 100%;
`;
