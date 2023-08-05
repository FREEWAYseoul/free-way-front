import styled from 'styled-components';
import { useStationInfo } from '../api/stations';
import { useSearchContext } from '../components/domain/Search/SearchContext';
import { ResultContextProvider } from '../components/domain/station/ResultContext';
import ContentsView from '../components/domain/station/ContentsView';
import StationInfoBox from '../components/domain/station/StationInfoBox';
import StationSearchBar from '../components/domain/station/StationSearchBar';

const ResultPage = () => {
  const { stationId } = useSearchContext();
  const { data, isLoading } = useStationInfo(Number(stationId));

  if (isLoading) return <></>;

  return (
    <>
      {data && (
        <StyledContainer>
          <ResultContextProvider initStation={data}>
            <StationSearchBar station={data} />
            <ContentsView />
            <StationInfoBox />
          </ResultContextProvider>
        </StyledContainer>
      )}
    </>
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
