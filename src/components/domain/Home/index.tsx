import styled from 'styled-components';
import HomeSearchBar from './HomeSearchBar';
import HomeSearchHistoryList from './HomeSearchHistoryList';
import HomePageTitle from './HomePageTitle';
import { useSearchContext } from '../Search/SearchContext';
import { useEffect } from 'react';
import { Player } from '@lottiefiles/react-lottie-player';
import { ReactComponent as MicIcon } from '../../../assets/icons/home-mic-icon.svg';

type VoiceSearchProps = {
  keywords: string;
};

const Home = () => {
  const { keywords, endListening, isListening } = useSearchContext();

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
  }, [keywords, endListening]);

  return (
    <HomeWrapper id='home-container'>
      <HomePageTitle />
      <HomeSearchBar />
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
