import styled from 'styled-components';
import { useQuery } from '@tanstack/react-query';
import { fetchGetStation } from '../api/stations';
import { useSearchContext } from '../components/domain/Search/SearchContext';
import { ResultContextProvider } from '../components/domain/station/ResultContext';
import ContentsView from '../components/domain/station/ContentsView';
import StationInfoBox from '../components/domain/station/StationInfoBox';
import StationSearchBar from '../components/domain/station/StationSearchBar';

const ResultPage = () => {
  const { stationId } = useSearchContext();
  const { data, isLoading } = useQuery(['/api/station/id'], () => fetchGetStation(stationId), {
    cacheTime: 0,
  });

  if (isLoading) return <></>;

  return (
    <StyledContainer>
      <ResultContextProvider initStation={data}>
        <StationSearchBar station={data} />
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
  height: 100%;
`;
