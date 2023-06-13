import { useEffect, useState } from 'react';
import styled from 'styled-components';
import HomeSearchBar from './HomeSearchBar';
import HomePageTitle from './HomePageTitle';
import HomeSearchHistoryList from './HomeSearchHistoryList';
import useMic from '../../../hooks/useMic';
import SafetyAlert from './SafteAlert';
import VoiceSearchField from './VoiceSearchField';
import useLocalStorage from '../../../hooks/useLocalStorage';

const Home = () => {
  const { startListening, endListening } = useMic();
  const [isListening, setIsListening] = useState(false);
  const { displaySearchHistoryInOrder } = useLocalStorage();

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
    displaySearchHistoryInOrder();
  }, [displaySearchHistoryInOrder]);

  return (
    <HomeWrapper id='home-container'>
      <SafetyAlert />
      <HomePageTitle />
      <HomeSearchBar handleClick={handleClick} />
      <ChildrenWrapper>
        {isListening ? <VoiceSearchField /> : <HomeSearchHistoryList />}
      </ChildrenWrapper>
    </HomeWrapper>
  );
};

export default Home;

const HomeWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: 1fr 2.1fr 2fr 4fr;
  position: relative;
`;
const ChildrenWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
