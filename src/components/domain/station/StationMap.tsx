import styled from 'styled-components';
import { STATION_LINE_COLORS } from '../../../constants/color';
import StationTitle from '../../common/station/StationTitle';
import { useResultContext } from './ResultContext';
import { titleEclipse } from '../../../utils/format';
import { useEffect } from 'react';

interface StationMapProps {
  title: string;
  line: number;
}

const StationMap = ({ title, line }: StationMapProps) => {
  const { station, handleChangeStation } = useResultContext();
  const color = STATION_LINE_COLORS[line];

  return (
    <StyledStationMap $color={color?.color}>
      <div className={`stationLine ${station.previousStation?.stationName || 'empty'}`}>
        {station.previousStation?.stationName ? (
          <span
            className='activeLine'
            onClick={() => handleChangeStation(station.previousStation.stationId)}
          >
            {titleEclipse(station.previousStation.stationName)}
          </span>
        ) : (
          <span className='emptyLine'>이전역 없음</span>
        )}
        {station.branchStation?.stationName && (
          <span
            className='activeLine'
            onClick={() => handleChangeStation(String(station.branchStation?.stationId))}
          >
            {' '}
            · {titleEclipse(station.branchStation.stationName)}
          </span>
        )}
      </div>
      <div className='stationTitleBox' onClick={() => handleChangeStation(station.stationId)}>
        <StationTitle title={title} line={line} color={color.color} />
      </div>
      <div className={`stationLine ${station.nextStation?.stationName || 'empty'}`}>
        {station.nextStation?.stationName ? (
          <span
            className='activeLine'
            onClick={() => handleChangeStation(station.nextStation.stationId)}
          >
            {titleEclipse(station.nextStation.stationName)}
          </span>
        ) : (
          <span className='emptyLine'>다음역 없음</span>
        )}
      </div>
    </StyledStationMap>
  );
};

export default StationMap;

const StyledStationMap = styled.div<{ $color: string }>`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px 27px;

  & > .stationTitleBox {
    cursor: pointer;
    position: absolute;
    left: 50%;
    height: 40px;
    transform: translateX(-50%);
    z-index: 99;
  }

  & > .stationLine {
    flex: 1;
    position: relative;
    padding: 5px 24px;
    height: 28px;
    line-height: 20px;
    color: #fff;
    background-color: ${({ $color }) => $color};

    & > .activeLine {
      cursor: pointer;
    }

    & > .emptyLine {
      color: #ffffff;
      opacity: 0.5;
    }

    &.empty {
      padding: 5px 11px;
    }

    &:first-child {
      border-radius: 16px 0 0 16px;

      &:not(.empty):before {
        content: '';
        position: absolute;
        top: 50%;
        left: 12px;
        height: 8px;
        width: 8px;
        border-left: 1.5px solid #fff;
        border-bottom: 1.5px solid #fff;
        background-color: initial;
        transform: translateY(-50%) rotate(45deg);
      }
    }

    &:last-child {
      text-align: end;
      border-radius: 0 16px 16px 0;
      &:not(.empty):before {
        content: '';
        position: absolute;
        top: 50%;
        right: 12px;
        height: 8px;
        width: 8px;
        border-left: 1.5px solid #fff;
        border-bottom: 1.5px solid #fff;
        background-color: initial;
        transform: translateY(-50%) rotate(-135deg);
      }
    }
  }
`;
