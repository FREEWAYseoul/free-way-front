import styled, { css } from 'styled-components';
import StationMap from './StationMap';
import StationButtonGroup from './StationButtonGroup';
import { useEffect } from 'react';
import { useResultContext } from './ResultContext';
import StationHeader from './StationHeader';

const badgeList = [
  {
    title: 2,
    lineId: 2,
  },
  {
    title: '신분당',
    lineId: 9,
  },
];

const StationInfoBox = () => {
  const { station, localStations, isDrag } = useResultContext();

  useEffect(() => {
    console.log('지도 역 정보', localStations);
  }, [localStations]);

  return (
    <StyledStationInfoBox $isDrag={isDrag}>
      <StationHeader lineList={badgeList} />
      <Divider />
      <StationMap title={station.stationName} line={station.lineId} />
      <StationButtonGroup />
    </StyledStationInfoBox>
  );
};

export default StationInfoBox;

const StyledStationInfoBox = styled.div<{ $isDrag: boolean }>`
  position: absolute;
  display: flex;
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

  ${({ $isDrag }) =>
    $isDrag &&
    css`
      bottom: -120px;
    `}
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: #d9d9d9;
`;
