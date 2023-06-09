import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ToastMessage from '../../common/ToastMessage';
import styled from 'styled-components';
import { ReactComponent as NotiIcon } from '../../../assets/icons/noti-icon.svg';

const SafetyAlert = () => {
  const [isToastOpen, setIsToastOpen] = useState(true);

  const navigate = useNavigate();
  const tempContent =
    '6월 3일 서울월드컵경기장 대규모 종교행사, 지하철 혼잡 주의 6월 3일(토) 서울월드컵경기장에서 대규모 종교행사가 예정되어 있습니다. 6호선 월드컵경기장역, 마포구청역, 디지털미디어시티역 주변이 다소 혼잡할 수 있으니 이 점 참고하여 열차를 이용해 주시기 바랍니다.';
  const handleClick = () => {
    navigate('/safetyAlert');
  };
  const activeToast = () => {
    const timer = setTimeout(() => {
      setIsToastOpen(false);
    }, 3000);
    return () => {
      clearTimeout(timer);
    };
  };
  useEffect(() => {
    activeToast();
  }, []);

  return (
    <Wrapper>
      <ToastMessage content={tempContent} onClick={handleClick} isOpen={isToastOpen} />
      <HomePageHeader>
        <NotiIconWrapper onClick={handleClick}>
          <Badge />
          <NotiIcon />
        </NotiIconWrapper>
      </HomePageHeader>
    </Wrapper>
  );
};

export default SafetyAlert;

const Wrapper = styled.div``;

const HomePageHeader = styled.div`
  position: fixed;
  top: 24px;

  width: 100%;
  max-width: 475px;

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

const Badge = styled.div`
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background-color: #e44b52;
  position: absolute;
  right: 0;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.4);
`;
