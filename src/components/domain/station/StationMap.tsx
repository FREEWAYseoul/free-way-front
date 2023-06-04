import styled from 'styled-components';
import Badge from '../../common/station/Badge';

interface StationMapProps {
  title: string;
  line: number;
}

const StationMap = ({ title, line }: StationMapProps) => {
  return (
    <StyledStationMap>
      <div className='stationLine'>역삼</div>
      <div className='stationMapBox'>
        <Badge lineId={line}>{line}</Badge> {title}
      </div>
      <div className='stationLine'>교대</div>
    </StyledStationMap>
  );
};

export default StationMap;

const StyledStationMap = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;

  & > .stationMapBox {
    position: absolute;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 4px;
    left: 50%;
    padding: 5px 29px;
    height: 40px;
    min-width: 113px;
    line-height: 20px;
    border-radius: 30px;
    border: 5px solid #60b157;
    background-color: #fff;
    transform: translateX(-50%);
    white-space: nowrap;
    z-index: 99;
  }

  & > .stationLine {
    flex: 1;
    position: relative;
    padding: 5px 24px;
    height: 28px;
    line-height: 20px;
    color: #fff;
    background-color: #60b157;

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
