import { useEffect } from 'react';
import styled from 'styled-components';
import HomeSearchBar from './HomeSearchBar';
import HomePageTitle from './HomePageTitle';
import HomeSearchHistoryList from './HomeSearchHistoryList';
import HomeHeader from './HomeHeader';
import useMic from '../../../hooks/useMic';
import VoiceSearchField from './VoiceSearchField';
import useLocalStorage from '../../../hooks/useLocalStorage';

const Home = () => {
  const { startListening, endListening, listening } = useMic();
  const { displaySearchHistoryInOrder } = useLocalStorage();

  const handleClick = () => {
    if (listening) {
      endListening();
    } else {
      startListening();
    }
  };

  useEffect(() => {
    displaySearchHistoryInOrder();
  }, [displaySearchHistoryInOrder]);

  return (
    <HomeWrapper id='home-container'>
      <HomeHeader />
      <HomePageTitle />
      <HomeSearchBar handleClick={handleClick} isListening={listening} />
      <ChildrenWrapper>
        {listening ? <VoiceSearchField /> : <HomeSearchHistoryList />}
      </ChildrenWrapper>
    </HomeWrapper>
  );
};

export default Home;

const HomeWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 0 24px;
`;

const ChildrenWrapper = styled.div`
  padding-top: 74px;

  display: flex;
  justify-content: center;
  align-items: center;
`;
