import styled from 'styled-components';
import PageHeader from '../components/domain/SaftyAlert/SafetyHeader';
import { ReactComponent as RightArrowIcon } from '../assets/icons/right-arrow.svg';

const SettingPage = () => {
  const sendAskMail = () => {
    location.href = 'mailto:tjd123123@naver.com';
  };

  return (
    <StyledContainer>
      <PageHeader title='설정' />
      <StyledSettingContent>
        <div>
          위치기반 서비스 이용약관 <RightArrowIcon />
        </div>
        <div>
          개인정보처리방침 <RightArrowIcon />
        </div>
        <div>
          오픈소스 라이브러리 <RightArrowIcon />
        </div>
        <div onClick={sendAskMail}>
          문의하기 <RightArrowIcon />
        </div>
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

  & > div {
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
  }
`;
