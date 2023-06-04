import styled from 'styled-components';
import StationInfoBox from '../components/domain/station/StationInfoBox';
import MapView from '../components/domain/map/MapView';
import TestSearchBar from '../components/domain/TestSearchBar';
import { ResultContextProvider } from '../components/domain/station/ResultContext';

const Result = () => {
  const initStation = {
    lineId: 4,
    stationId: 2,
    stationName: '창동',
    stationStatus: '시용가능',
    position: { lat: 37.65323939675669, lng: 127.04766306716449 },
  };

  return (
    <StyledContainer>
      <ResultContextProvider initStation={initStation}>
        <StyledTop>
          <TestSearchBar />
        </StyledTop>
        <MapView />
        <StationInfoBox />
      </ResultContextProvider>
    </StyledContainer>
  );
};

export default Result;

const StyledContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
`;

const StyledTop = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  gap: 4px;
  top: 20px;
  left: 50%;
  width: 90%;
  height: 100px;
  background-color: #fff;
  transform: translateX(-50%);
  z-index: 99;

  & > div {
    cursor: pointer;
    background-color: lightgray;
  }
`;
