import styled from 'styled-components';
import PageHeader from '../components/domain/SaftyAlert/SafetyHeader';
import { ReactComponent as RightArrowIcon } from '../assets/icons/right-arrow.svg';

const SettingPage = () => {
  const sendAskMail = () => {
    location.href = 'mailto:freeway.seoul@gmail.com';
  };

  return (
    <StyledContainer>
      <PageHeader title='설정' />
      <StyledSettingContent>
        <StyledSettingItem>
          위치기반 서비스 이용약관 <RightArrowIcon />
        </StyledSettingItem>
        <StyledSettingItem>
          개인정보처리방침 <RightArrowIcon />
        </StyledSettingItem>
        <StyledSettingItem>
          오픈소스 라이브러리 <RightArrowIcon />
        </StyledSettingItem>
        <StyledSettingItem onClick={sendAskMail}>
          문의하기 <RightArrowIcon />
        </StyledSettingItem>
      </StyledSettingContent>
    </StyledContainer>
  );
};

export default SettingPage;

const StyledContainer = styled.div`
  height: 100%;
  width: 100%;
  background: #f2f4f6;
`;

const StyledSettingContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledSettingItem = styled.div`
  cursor: pointer;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 14px 0 20px;
  height: 48px;
  background-color: #fff;

  &::before {
    content: '';
    position: absolute;
    height: 1px;
    width: 100%;
    top: 0;
    left: 0;
    background-color: #d9d9d9;
    opacity: 0.5;
  }
`;
