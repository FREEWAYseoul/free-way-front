import styled from 'styled-components';
import PageHeader from '../components/domain/SaftyAlert/SafetyHeader';
import { Outlet } from 'react-router-dom';

const SettingPage = () => {
  return (
    <StyledContainer>
      <PageHeader title='설정' />
      <Outlet />
    </StyledContainer>
  );
};

export default SettingPage;

const StyledContainer = styled.div`
  height: 100%;
  width: 100%;
  background: #f2f4f6;
`;
