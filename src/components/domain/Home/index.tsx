import styled from 'styled-components';
import HomeSearchBar from './HomeSearchBar';
import HomeSearchHistoryList from './HomeSearchHistoryList';
import HomePageTitle from './HomePageTitle';
import { useSearchContext } from '../Search/SearchContext';
import { useEffect } from 'react';
import { Player } from '@lottiefiles/react-lottie-player';
import { ReactComponent as MicIcon } from '../../../assets/icons/home-mic-icon.svg';

const SERVER_API = `/api/stations/search?keyword=`;

const Home = () => {
  const { keywords, selectKeywords, handleMouseUp, isListening } = useSearchContext();
  // temp
  // const [isListening, setIsListening] = useState(false);

  // temp
  // const handleClick = () => {
  //   setIsListening((prev) => !prev);
  // };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(SERVER_API);
        const data = await response.json();
        console.log('data', data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (keywords[keywords.length - 1] === '역') {
      handleMouseUp();
    }
  }, [keywords, selectKeywords, handleMouseUp]);

  return (
    <HomeWrapper id='home-container'>
      <HomePageTitle />
      <HomeSearchBar />
      {/* <TempMic id='test-button' onClick={handleClick}>
        Test
      </TempMic> */}
      {isListening() ? (
        <>
          <div
            style={{
              position: 'absolute',
              left: '5.33%',
              right: '5.33%',
              top: '51.97%',
              bottom: '39.16%',
              flex: '1',
            }}
          >
            <Player
              src={'https://assets3.lottiefiles.com/packages/lf20_tqvrzfnf.json'}
              loop
              autoplay
              style={{
                width: '100%',
                height: '100%',
              }}
            ></Player>
          </div>

          <MicContainer>
            {keywords ? <span>{keywords}</span> : <span>듣고 있어요</span>}
            {/* {keywords ? <TypeWriter value={keywords} /> : <TypeWriter value='듣고 있어요' />} */}
            <MicIcon />
          </MicContainer>
        </>
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

const MicContainer = styled.div`
  position: inherit;
  top: 150px;
  right: -0.3px;
`;
