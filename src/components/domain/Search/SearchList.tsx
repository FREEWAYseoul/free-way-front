import styled from 'styled-components';
import SearchItem from './SearchItem';
import { type Station } from '../../../api/stations';
import { useSearchContext } from './SearchContext';

type Props = {
  label?: string;
  data: Station[];
};

const SearchList = ({ label, data }: Props) => {
  const { autofillRef, selectedIdx } = useSearchContext();

  return (
    <StyledListWrapper id='search-list-wrapper' ref={autofillRef}>
      <StyledLabel>{label}</StyledLabel>
      {data.map((station, idx) => (
        <SearchItem
          key={station.stationId}
          id={station.stationId}
          name={station.stationName}
          status={station.stationStatus}
          line={station.lineId}
          isFocus={selectedIdx === idx ? true : false}
        />
      ))}
    </StyledListWrapper>
  );
};

export default SearchList;

const StyledListWrapper = styled.ul`
  position: absolute;
  top: 0;
  width: 100%;
  max-height: 50%;
  padding: 10px;
  overflow-y: auto;
`;

const StyledLabel = styled.div`
  color: #96a1b2;
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;
`;
