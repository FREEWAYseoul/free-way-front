import styled from 'styled-components';
import StationMap from './StationMap';
import StationButtonGroup from './StationButtonGroup';
import { useResultContext } from './ResultContext';
import StationHeader from './StationHeader';

const StationInfoBox = () => {
  const { station, isShow, tabPosition, handleTouchStart, handleTouchMove, handleTouchEnd } =
    useResultContext();

  return (
    <StyledStationInfoBox
      $isShow={isShow}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{ transform: `translateY(${tabPosition}px)` }}
    >
      <StationHeader />
      <Divider />
      <StationMap title={station.stationName} line={station.lineId} />
      <StationButtonGroup />
    </StyledStationInfoBox>
  );
};

export default StationInfoBox;

const StyledStationInfoBox = styled.div<{ $isShow: boolean }>`
  position: absolute;
  display: ${({ $isShow }) => ($isShow ? 'flex' : 'none')};
  flex-direction: column;
  bottom: 0;
  width: 100%;
  height: 100%;
  max-height: 235px;
  min-height: 235px;
  border-radius: 20px 20px 0 0;
  background-color: #fff;
  z-index: 99;
  transition: all 0.3s;
  box-shadow: 0px 0px 13.3333px rgba(68, 81, 69, 0.1);
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: #d9d9d9;
  opacity: 0.5;
`;
