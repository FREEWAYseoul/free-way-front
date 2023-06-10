import { useEffect, useState } from 'react';
import styled from 'styled-components';
import HomeSearchBar from './HomeSearchBar';
import HomePageTitle from './HomePageTitle';
import { useSearchContext } from '../Search/SearchContext';
import HomeSearchHistoryList from './HomeSearchHistoryList';
import useMic from '../../../hooks/useMic';
import SafetyAlert from './SafteAlert';
import VoiceSearchField from './VoiceSearchField';

const Home = () => {
  const { keywords } = useSearchContext();
  const { startListening, endListening } = useMic();
  const [isListening, setIsListening] = useState(false);

  // 아래 주석은 유한 음성 테스트 자원을 위해 개발을 위한 임시 테스트 코드 입니다.
  // temp;

  // temp;
  // const handleClick = () => {
  //   setIsListening((prev) => !prev);
  // };

  const handleClick = () => {
    if (isListening) {
      setIsListening((prev) => !prev);
      endListening();
    } else {
      setIsListening((prev) => !prev);
      startListening();
    }
  };
  useEffect(() => {
    if (keywords[keywords.length - 1] === '역') {
      endListening();
    }
  }, [keywords, endListening]);

  return (
    <HomeWrapper id='home-container'>
      <SafetyAlert />
      <HomePageTitle />
      <HomeSearchBar handleClick={handleClick} />
      <ChildrenWrapper>
        {isListening ? <VoiceSearchField /> : <HomeSearchHistoryList />}
      </ChildrenWrapper>
      {/* <TempMic id='test-button' onClick={handleClick}>
        Test
      </TempMic> */}
    </HomeWrapper>
  );
};

export default Home;

const HomeWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: 1fr 1fr 3fr 4fr;
`;
const ChildrenWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
// const TempMic = styled.button`
//   position: absolute;
//   top: 10%;
// `;
