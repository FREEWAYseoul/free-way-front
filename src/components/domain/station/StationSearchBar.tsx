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
    navigate('/');
  };

  const handleMoveSearch = (e) => {
    if (e.target.tagName === 'IMG') {
      resetKeywords();
    }
    navigate('/search');
  };

  return (
    <StyledStationSearchBar>
      <button onClick={handleMoveHome}>
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
  gap: 17px;
  top: 0;
  padding: 0 20px;
  height: 59px;
  width: 100%;
  background-color: #fff;
  box-shadow: 0px 0px 13.3333px rgba(68, 81, 69, 0.1);
  z-index: 99;

  & button {
    cursor: pointer;
    display: flex;
    align-items: center;
    padding: 10px;
    border: none;
    background-color: inherit;
  }

  & > p {
    cursor: pointer;
    flex: 1;
    font-size: 18px;
    font-weight: 500;
  }
`;
