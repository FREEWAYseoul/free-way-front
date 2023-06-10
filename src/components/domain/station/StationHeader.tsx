import styled from 'styled-components';
import { useResultContext } from './ResultContext';
import { useStationInfo } from '../../../api/stations';
import { StationProps } from '../../../types/stationType';
import { useEffect, useState } from 'react';
import Badge from '../../common/station/Badge';

interface BadgeProps {
  lineId: string | number;
  stationId: number;
}

const StationHeader = () => {
  const { station, isDrag, handleChangeStation, handleShowInfo } = useResultContext();
  const { data: stationData, isLoading } = useStationInfo();
  const [badges, setBadges] = useState<BadgeProps[]>([]);

  useEffect(() => {
    if (!isLoading) {
      const filterStation = stationData.filter(
        (item: StationProps) => item.stationName === station.stationName
      );
      const sortStation = filterStation.sort((a: StationProps, b: StationProps) =>
        String(a.lineId).localeCompare(String(b.lineId))
      );

      setBadges(
        sortStation.map((item: StationProps) => ({
          lineId: item.lineId,
          stationId: item.stationId,
        }))
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [station, isLoading]);

  return (
    <StyledStationInfoHeader>
      <div className='sliceBar' onClick={() => handleShowInfo(!isDrag)}>
        <div className='bar'></div>
      </div>
      <div className='badgeBox'>
        {badges.length > 0 &&
          badges.map((item) => (
            <Badge
              key={item.lineId}
              lineId={item.lineId}
              isActive={station.lineId == item.lineId}
              handleOnClick={() => handleChangeStation(item.stationId)}
            />
          ))}
      </div>
    </StyledStationInfoHeader>
  );
};

export default StationHeader;

const StyledStationInfoHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 24px 12px 16px;

  & > .sliceBar {
    cursor: pointer;
    width: 100%;
    padding: 6px 0px 3px 8px;
    height: 13px;

    & > .bar {
      margin: 0 auto;
      width: 15%;
      height: 100%;
      border-radius: 4px;
      background-color: #989898;
    }
  }

  & > .badgeBox {
    display: flex;
    align-items: center;
    gap: 9px;
    width: 100%;
  }
`;
