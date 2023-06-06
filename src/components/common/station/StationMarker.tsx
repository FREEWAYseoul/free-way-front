import styled from 'styled-components';
import { STATION_LINE_COLORS } from '../../../constants/color';
import { StationMakerProps } from '../../../types/stationType';
import StationTitle from './StationTitle';

const StationMarker = ({ info, isActive }: StationMakerProps) => {
  const color = STATION_LINE_COLORS[info.lineId];

  return (
    <StyledStationMaker $color={color.color} $isActive={isActive}>
      {isActive ? (
        <StationTitle title={info.stationName} line={info.lineId} color={color.color} />
      ) : (
        <StyledStation $color={color.color}>
          <span>{info.lineId}</span> <div>{info.stationName}</div>
        </StyledStation>
      )}
      <div className='triangle'></div>
    </StyledStationMaker>
  );
};

export default StationMarker;

const StyledStationMaker = styled.div<{ $color: string; $isActive: boolean }>`
  cursor: pointer;
  position: absolute;
  top: -45px;
  z-index: 99;

  & > .triangle {
    position: absolute;
    bottom: ${({ $isActive }) => ($isActive ? '-45px' : '-35px')};
    left: 50%;
    height: 15px;
    width: 15px;
    background-color: ${({ $color }) => $color};
    transform: translateX(-50%) rotate(-45deg);
    z-index: -90;
  }
`;

const StyledStation = styled.div<{ $color: string }>`
  position: absolute;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  left: 50%;
  padding: 5px 10px 5px 5px;
  border-radius: 30px;
  font-size: 12px;
  font-weight: bold;
  line-height: 20px;
  background-color: ${({ $color }) => $color};
  transform: translateX(-50%);
  white-space: nowrap;

  & > span {
    height: 20px;
    min-width: 20px;
    padding: 1px 2px 0;
    background-color: #fff;
    border-radius: 10px;
    text-align: center;
  }

  & > div {
    color: #fff;
  }
`;
