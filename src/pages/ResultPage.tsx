import styled from 'styled-components';
import { useQuery } from '@tanstack/react-query';
import { fetchGetStation } from '../api/stations';
import { useSearchContext } from '../components/domain/Search/SearchContext';
import { ResultContextProvider } from '../components/domain/station/ResultContext';
import ContentsView from '../components/domain/station/ContentsView';
import StationInfoBox from '../components/domain/station/StationInfoBox';

const ResultPage = () => {
  const { stationId } = useSearchContext();
  const { data, isLoading } = useQuery(['/api/station/id'], () => fetchGetStation(stationId), {
    cacheTime: 0,
  });

  if (isLoading) return <></>;

  return (
    <StyledContainer>
      <ResultContextProvider initStation={data}>
        <ContentsView />
        <StationInfoBox />
      </ResultContextProvider>
    </StyledContainer>
  );
};

export default ResultPage;

const StyledContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
`;

// const StyledTop = styled.div`
//   position: absolute;
//   display: flex;
//   flex-direction: column;
//   gap: 4px;
//   top: 20px;
//   left: 50%;
//   width: 90%;
//   height: 100px;
//   background-color: #fff;
//   transform: translateX(-50%);
//   z-index: 99;

//   & > div {
//     cursor: pointer;
//     background-color: lightgray;
//   }
// `;
