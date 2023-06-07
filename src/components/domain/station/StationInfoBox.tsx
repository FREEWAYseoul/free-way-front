import styled, { css } from 'styled-components';
import StationMap from './StationMap';
import StationButtonGroup from './StationButtonGroup';
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
  const { station, isDrag, isShow } = useResultContext();

  return (
    <StyledStationInfoBox $isDrag={isDrag} $isShow={isShow}>
      <StationHeader lineList={badgeList} />
      <Divider />
      <StationMap title={station.stationName} line={station.lineId} />
      <StationButtonGroup />
    </StyledStationInfoBox>
  );
};

export default StationInfoBox;

const StyledStationInfoBox = styled.div<{ $isDrag: boolean; $isShow: boolean }>`
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
