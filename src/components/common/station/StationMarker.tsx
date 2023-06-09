import styled from 'styled-components';
import { STATION_LINE_COLORS } from '../../../constants/color';
import { StationMakerProps } from '../../../types/stationType';
import StationTitle from './StationTitle';

const StationMarker = ({ info, isActive, level }: StationMakerProps) => {
  const color = STATION_LINE_COLORS[info.lineId] || 'red';

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
          <span>{info.stationStatus === '확인 불가' ? '-' : info.availableElevatorsNumber}</span>{' '}
          <div>{info.stationName}</div>
        </StyledStation>
      )}
      <div className='triangle'>
        <svg
          width='11'
          height='14'
          viewBox='0 0 11 14'
          fill='currentColor'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M7.27588 12.1259C6.78377 13.6033 4.69402 13.6033 4.20191 12.1259L0.477791 0.945202L8.7529 0.945203C9.85849 0.945203 10.6393 2.02822 10.2899 3.07715L7.27588 12.1259Z'
            fill='currentColor'
          />
        </svg>
      </div>
    </StyledStationMaker>
  );
};

export default StationMarker;

const StyledStationMaker = styled.div<{ $color: string; $isActive: boolean; $level: number }>`
  cursor: pointer;
  position: absolute;
  top: -45px;
  z-index: 10;
  filter: drop-shadow(0px 0px 10.8px rgba(68, 81, 69, 0.3));

  & > .triangle {
    position: absolute;
    bottom: ${({ $isActive, $level }) => ($isActive && $level < 5 ? '-55px' : '-45px')};
    left: 50%;
    /* height: 15px;
    width: 15px; */
    color: ${({ $color }) => $color};
    /* background-color: ${({ $color }) => $color}; */
    transform: translateX(-50%);
    z-index: 90;
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
