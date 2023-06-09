import styled from 'styled-components';
import HomeSearchBar from './HomeSearchBar';
import HomeSearchHistoryList from './HomeSearchHistoryList';
import HomePageTitle from './HomePageTitle';
import { useSearchContext } from '../Search/SearchContext';
import { useEffect, useState } from 'react';
import { Player } from '@lottiefiles/react-lottie-player';
import { ReactComponent as MicIcon } from '../../../assets/icons/home-mic-icon.svg';
import { ReactComponent as NotiIcon } from '../../../assets/icons/noti-icon.svg';
import useMic from '../../../hooks/useMic';
import ToastMessage from '../../common/ToastMessage';
import { useNavigate } from 'react-router-dom';

type VoiceSearchProps = {
  keywords: string;
};

const Home = () => {
  const { keywords } = useSearchContext();
  const { endListening, isListening } = useMic();

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

  // 아래 주석은 유한 음성 테스트 자원을 위해 개발을 위한 임시 테스트 코드 입니다.
  // temp;
  // const [isListening, setIsListening] = useState(false);

  // temp;
  // const handleClick = () => {
  //   setIsListening((prev) => !prev);
  // };

  useEffect(() => {
    if (keywords[keywords.length - 1] === '역') {
      endListening();
    }
    activeToast();
  }, [keywords, endListening]);

  return (
    <HomeWrapper id='home-container'>
      <ToastMessage content={tempContent} onClick={handleClick} isOpen={isToastOpen} />
      <HomePageHeader>
        <NotiIconWrapper onClick={handleClick}>
          <Badge />
          <NotiIcon />
        </NotiIconWrapper>
      </HomePageHeader>
      <HomePageTitle />
      <StyledHomeSearchBarWrapper>
        <HomeSearchBar />
      </StyledHomeSearchBarWrapper>
      {/* <TempMic id='test-button' onClick={handleClick}>
        Test
      </TempMic> */}
      {isListening() ? (
        <VoiceSearchWrapper>
          <Player src={'src/assets/lotties/purse.json'} loop autoplay></Player>
          <MicContainer>
            {keywords ? (
              <VoiceSearchText keywords={keywords}>{keywords}</VoiceSearchText>
            ) : (
              <VoiceSearchText keywords={keywords}>듣고 있어요</VoiceSearchText>
            )}
            <MicIcon />
          </MicContainer>
        </VoiceSearchWrapper>
      ) : (
        <HomeSearchHistoryList />
      )}
    </HomeWrapper>
  );
};

export default Home;

export const HomeWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
`;

// const TempMic = styled.button`
//   position: absolute;
//   top: 10%;
// `;

const HomePageHeader = styled.div`
  position: absolute;
  top: 5%;

  width: 100%;

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

const StyledHomeSearchBarWrapper = styled.div`
  position: absolute;
  top: -10.3%;

  width: 90%;

  display: flex;
  justify-content: center;
  align-content: center;
  position: relative;
`;

const VoiceSearchWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 372px;
  top: 10%;
`;

const MicContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const VoiceSearchText = styled.div<VoiceSearchProps>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -300%);
  width: max-content;
  min-width: 120px;
  height: 35px;
  border-radius: 25px;

  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => (props.keywords.length <= 0 ? 'transparent' : 'black')};
  padding: 0 10px;
  color: white;
  font-size: 18px;
`;
