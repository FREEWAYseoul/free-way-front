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
      <Wrapper>
        <ToastMessage content={tempContent} onClick={handleClick} isOpen={isToastOpen} />
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
  padding-top: 30px;
  position: relative;
`;

const HomePageHeader = styled.div`
  width: 100%;

  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const NotiIconWrapper = styled.div`
  min-width: 29px;
  min-height: 30px;
  position: relative;
  cursor: pointer;
  transition: 0.2s ease-in-out;
  &:hover {
    transform: scale(1.1);
  }
`;
