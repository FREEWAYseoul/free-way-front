import styled from 'styled-components';
import { ReactComponent as RightArrowIcon } from '../../../assets/icons/right-arrow.svg';
import { Link } from 'react-router-dom';

const SettingTabList = () => {
  const sendAskMail = () => {
    location.href = 'mailto:freeway.seoul@gmail.com';
  };

  return (
    <StyledSettingContent>
      <Link to={'locationAgreement'}>
        <StyledSettingItem>
          위치기반 서비스 이용약관 <RightArrowIcon />
        </StyledSettingItem>
      </Link>
      <Link to={'privacy'}>
        <StyledSettingItem>
          개인정보처리방침 <RightArrowIcon />
        </StyledSettingItem>
      </Link>
      <Link to={'library'}>
        <StyledSettingItem>
          오픈소스 라이브러리 <RightArrowIcon />
        </StyledSettingItem>
      </Link>
      <StyledSettingItem onClick={sendAskMail}>
        문의하기 <RightArrowIcon />
      </StyledSettingItem>
    </StyledSettingContent>
  );
};

export default SettingTabList;
const StyledSettingContent = styled.div`
  display: flex;
  flex-direction: column;

  & a {
    color: #000;
    text-decoration: none;
    outline: none;

    &:active {
      text-decoration: none;
    }
  }
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
