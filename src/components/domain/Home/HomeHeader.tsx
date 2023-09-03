import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ToastMessage from '../../common/ToastMessage';
import styled from 'styled-components';
import { ReactComponent as NotiIcon } from '../../../assets/icons/bell.svg';
import { ReactComponent as SettingIcon } from '../../../assets/icons/gear.svg';
import { useAlert } from '../../../hooks/useAlert';

const HomeHeader = () => {
  const { toastMessage } = useAlert();
  const [isToastOpen, setIsToastOpen] = useState(true);

  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/safetyAlert');
  };

  const activeToast = () => {
    if (toastMessage) {
      const timer = setTimeout(() => {
        setIsToastOpen(false);
      }, 2500);
      return () => {
        clearTimeout(timer);
      };
    }
  };

  useEffect(() => {
    activeToast();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toastMessage]);

  return (
    <>
      <Wrapper>
        {toastMessage && (
          <ToastMessage content={toastMessage} onClick={handleClick} isOpen={isToastOpen} />
        )}
        <HomePageHeader>
          <NotiIconWrapper id='this-is-noti' onClick={handleClick}>
            <NotiIcon />
          </NotiIconWrapper>
          <SettingIconWrapper id='this-is-setting' onClick={() => navigate('/setting')}>
            <SettingIcon />
          </SettingIconWrapper>
        </HomePageHeader>
      </Wrapper>
    </>
  );
};

export default HomeHeader;

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
  gap: 12px;
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

const SettingIconWrapper = styled.div`
  min-width: 30px;
  min-height: 30px;
  position: relative;
  cursor: pointer;
  transition: 0.2s ease-in-out;

  &:hover {
    transform: scale(1.1);
  }
`;
