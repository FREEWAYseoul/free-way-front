import styled from 'styled-components';
import Badge from '../../common/station/Badge';
import CloseIcon from '../../../assets/icons/close.svg';
import { useResultContext } from './ResultContext';

interface StationHeaderProps {
  lineList: {
    lineId: number;
    title: string | number;
  }[];
}

const StationHeader = ({ lineList }: StationHeaderProps) => {
  const { handleShowInfo } = useResultContext();

  return (
    <StyledStationInfoHeader>
      <div>
        {lineList.length > 0 &&
          lineList.map((item) => (
            <Badge key={item.lineId} lineId={item.lineId}>
              {item.title}
            </Badge>
          ))}
      </div>
      <button onClick={() => handleShowInfo(false)}>
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
