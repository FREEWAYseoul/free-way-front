import styled from 'styled-components';
import CloseIcon from '../../../assets/icons/close.svg';
import { useResultContext } from './ResultContext';
import { useStationInfo } from '../../../api/stations';
import { StationProps } from '../../../types/stationType';
import { useEffect, useState } from 'react';
import Badge from '../../common/station/Badge';
import { useNavigate } from 'react-router-dom';

interface BadgeProps {
  lineId: string | number;
  stationId: number;
}

const StationHeader = () => {
  const navigate = useNavigate();
  const { station, handleChangeStation } = useResultContext();
  const { data: stationData, isLoading } = useStationInfo();
  const [badges, setBadges] = useState<BadgeProps[]>([]);

  const handleMoveSearch = () => {
    navigate('/search');
  };

  useEffect(() => {
    if (!isLoading) {
      const filterStation = stationData.filter(
        (item: StationProps) => item.stationName === station.stationName
      );
      setBadges(
        filterStation.map((item: StationProps) => ({
          lineId: item.lineId,
          stationId: item.stationId,
        }))
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [station, isLoading]);

  return (
    <StyledStationInfoHeader>
      <div>
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
      <button onClick={handleMoveSearch}>
        <img src={CloseIcon} alt='닫기' />
      </button>
    </StyledStationInfoHeader>
  );
};

export default StationHeader;

const StyledStationInfoHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 24px 12px 16px;

  & > div {
    display: flex;
    align-items: center;
    gap: 9px;
  }

  & > button {
    cursor: pointer;
    background-color: inherit;
    height: 100%;
    border: none;
    & > img {
      width: auto;
      height: 100%;
    }
  }
`;
