import styled from 'styled-components';
import { STATION_LINE_COLORS } from '../../../constants/color';
import { StationMakerProps } from '../../../types/stationType';
import StationTitle from './StationTitle';

const StationMarker = ({ info, isActive, level }: StationMakerProps) => {
  const color = STATION_LINE_COLORS[info.lineId];

  return (
    <StyledStationMaker $color={color.color} $isActive={isActive} $level={level}>
      {isActive && level < 5 ? (
        <StationTitle
          title={info.stationName}
          line={info.lineId}
          color={color.color}
          type='marker'
        />
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

const StyledStationMaker = styled.div<{ $color: string; $isActive: boolean; $level: number }>`
  cursor: pointer;
  position: absolute;
  top: -45px;
  z-index: 99;
  filter: drop-shadow(0px 0px 10.8px rgba(68, 81, 69, 0.3));

  & > .triangle {
    position: absolute;
    bottom: ${({ $isActive, $level }) => ($isActive && $level < 5 ? '-45px' : '-35px')};
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
