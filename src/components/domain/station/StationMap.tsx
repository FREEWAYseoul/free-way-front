import styled from 'styled-components';
import { STATION_LINE_COLORS } from '../../../constants/color';
import StationTitle from '../../common/station/StationTitle';
import { useResultContext } from './ResultContext';

interface StationMapProps {
  title: string;
  line: number;
}

const StationMap = ({ title, line }: StationMapProps) => {
  const { handleShowInfo } = useResultContext();
  const color = STATION_LINE_COLORS[line];

  return (
    <StyledStationMap $color={color.color}>
      <div className='stationLine'>역삼</div>
      <div className='stationTitleBox' onClick={() => handleShowInfo(false)}>
        <StationTitle title={title} line={line} color={color.color} />
      </div>
      <div className='stationLine'>교대</div>
    </StyledStationMap>
  );
};

export default StationMap;

const StyledStationMap = styled.div<{ $color: string }>`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;

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

    &:first-child {
      border-radius: 16px 0 0 16px;

      &::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 12px;
        height: 8px;
        width: 8px;
        border-left: 1px solid #fff;
        border-bottom: 1px solid #fff;
        background-color: initial;
        transform: translateY(-50%) rotate(45deg);
      }
    }

    &:last-child {
      text-align: end;
      border-radius: 0 16px 16px 0;
      &::before {
        content: '';
        position: absolute;
        top: 50%;
        right: 12px;
        height: 8px;
        width: 8px;
        border-left: 1px solid #fff;
        border-bottom: 1px solid #fff;
        background-color: initial;
        transform: translateY(-50%) rotate(-135deg);
      }
    }
  }
`;
