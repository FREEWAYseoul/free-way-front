import styled from 'styled-components';
import BackArrowIcon from '../../../assets/icons/back-arrow.svg';
import CircleCancelIcon from '../../../assets/icons/circle-cancel.svg';
import { useNavigate } from 'react-router-dom';
import { StationDetailProps } from '../../../types/stationType';
import useSearchBar from '../../../hooks/useSearchBar';

const StationSearchBar = ({ station }: { station: StationDetailProps }) => {
  const { resetKeywords } = useSearchBar();
  const navigate = useNavigate();

  const handleMoveHome = () => {
    resetKeywords();
    navigate('/');
  };

  const handleMoveSearch = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target;
    const el = target as HTMLElement;
    if (el.tagName === 'IMG') {
      resetKeywords();
    }
    navigate('/search');
  };

  return (
    <StyledStationSearchBar>
      <button className='backBtn' onClick={handleMoveHome}>
        <img src={BackArrowIcon} alt='뒤로가기' />
      </button>
      <p onClick={handleMoveSearch}>{station.stationName}</p>
      <button onClick={handleMoveSearch}>
        <img src={CircleCancelIcon} alt='취소' />
      </button>
    </StyledStationSearchBar>
  );
};

export default StationSearchBar;

const StyledStationSearchBar = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  gap: 13px;
  top: 0;
  padding: 0 23px 0 13px;
  height: 75px;
  width: 100%;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  z-index: 99;

  & button {
    cursor: pointer;
    display: flex;
    align-items: center;
    padding: 0;
    font-weight: bold;
    border: none;
    background-color: inherit;
  }

  & .backBtn {
    padding-left: 2px;

    & > img {
      width: 32px;
      height: 36px;
    }
  }

  & > p {
    cursor: pointer;
    padding-top: 3px;
    margin: 0;
    flex: 1;
    font-size: 1.125rem;
    font-weight: 500;
  }
`;
