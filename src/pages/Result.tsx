import styled from 'styled-components';
import StationInfoBox from '../components/domain/station/StationInfoBox';
import { ResultContextProvider } from '../components/domain/station/ResultContext';
import ContentsView from '../components/domain/station/ContentsView';

const Result = () => {
  const initStation = {
    lineId: 2,
    stationId: 2,
    stationName: '창동',
    stationStatus: '시용가능',
    stationTel: '010-4187-4575',
    position: { lat: 37.65323939675669, lng: 127.04766306716449 },
  };

  return (
    <StyledContainer>
      <ResultContextProvider initStation={initStation}>
        <ContentsView />
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
