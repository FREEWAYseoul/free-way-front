import styled from 'styled-components';
import HomeSearchBar from './HomeSearchBar';
import HomeSearchHistoryList from './HomeSearchHistoryList';
import HomePageTitle from './HomePageTitle';
import { useSearchContext } from '../Search/SearchContext';
import { useEffect, useState } from 'react';
import { Player } from '@lottiefiles/react-lottie-player';
import { ReactComponent as MicIcon } from '../../../assets/icons/home-mic-icon.svg';

const Home = () => {
  const { keywords, startListening, isListening: temp } = useSearchContext();

  // 아래 주석은 유한 음성 테스트 자원을 위해 개발을 위한 임시 테스트 코드 입니다.
  temp;
  const [isListening, setIsListening] = useState(false);

  temp;
  const handleClick = () => {
    setIsListening((prev) => !prev);
  };

  useEffect(() => {
    if (keywords[keywords.length - 1] === '역') {
      startListening();
    }
  }, [keywords, startListening]);

  return (
    <HomeWrapper id='home-container'>
      <HomePageTitle />
      <HomeSearchBar />
      <TempMic id='test-button' onClick={handleClick}>
        Test
      </TempMic>
      {isListening ? (
        <VoiceSearchWrapper>
          <div style={{}}>
            <Player
              src={'src/assets/lotties/purse.json'}
              loop
              autoplay
              style={{
                width: '100%',
                height: '100%',
              }}
            ></Player>
          </div>

          <MicContainer>
            {keywords ? (
              <VoiceSearchText>{keywords}</VoiceSearchText>
            ) : (
              <VoiceSearchText>듣고 있어요</VoiceSearchText>
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

const TempMic = styled.button`
  position: absolute;
  top: 10%;
`;

const MicContainer = styled.div`
  position: absolute;
`;

const VoiceSearchWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 372px;
  top: 10%;
`;

const VoiceSearchText = styled.div`
  width: 70px;
  height: 35px;
  border-radius: 25px;
  background-color: black;
  color: white;

  font-size: 12px;

  display: flex;
  justify-content: center;
  align-items: center;

  position: absolute;
  bottom: 200px;
  right: 0;
  left: 0;
  margin: 0 auto;
`;
