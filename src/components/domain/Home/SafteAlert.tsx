import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ToastMessage from '../../common/ToastMessage';
import styled from 'styled-components';
import { ReactComponent as NotiIcon } from '../../../assets/icons/종.svg';

const SafetyAlert = () => {
  const [isToastOpen, setIsToastOpen] = useState(true);

  const navigate = useNavigate();
  const tempContent = '6월 3일 서울월드컵경기장 대규모 종교행사, 지하철 혼잡주의';
  const handleClick = () => {
    navigate('/safetyAlert');
  };
  const activeToast = () => {
    const timer = setTimeout(() => {
      setIsToastOpen(false);
    }, 2500);
    return () => {
      clearTimeout(timer);
    };
  };
  useEffect(() => {
    activeToast();
  }, []);

  return (
    <>
      <ToastMessage content={tempContent} onClick={handleClick} isOpen={isToastOpen} />
      <Wrapper>
        {/* <StatusBar /> */}
        <HomePageHeader>
          <NotiIconWrapper id='this-is-noti' onClick={handleClick}>
            <NotiIcon />
          </NotiIconWrapper>
        </HomePageHeader>
      </Wrapper>
    </>
  );
};

export default SafetyAlert;

const Wrapper = styled.div`
  width: 100%;
`;

// const StatusBar = styled.div`
//   width: 100%;
//   height: 50px;
//   background-color: gray;
// `;

const HomePageHeader = styled.div`
  position: fixed;
  top: 64px;

  width: 100%;
  max-width: 375px;

  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 10px 25px;
`;

const NotiIconWrapper = styled.div`
  width: max-content;
  height: max-content;
  position: relative;
  cursor: pointer;
  transition: 0.2s ease-in-out;
  &:hover {
    transform: scale(1.1);
  }
`;
