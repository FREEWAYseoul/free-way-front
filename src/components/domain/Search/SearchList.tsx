import styled from 'styled-components';
import SearchItem from './SearchItem';
import { type Station } from '../../../api/stations';
import { useSearchContext } from './SearchContext';

type Props = {
  label?: string;
  data: Station[];
  type?: 'homepage' | 'searchpage';
};

const SearchList = ({ label, data, type }: Props) => {
  const { autofillRef, selectedIdx } = useSearchContext();

  return (
    <StyledListWrapper ref={autofillRef}>
      {label && <StyledLabel>{label}</StyledLabel>}
      {data.map((station, idx) => (
        <SearchItem
          key={station.stationId}
          id={station.stationId}
          name={station.stationName}
          status={station.stationStatus}
          line={station.lineId}
          isFocus={selectedIdx === idx ? true : false}
          type={type}
        />
      ))}
    </StyledListWrapper>
  );
};

export default SearchList;

const StyledListWrapper = styled.ul`
  padding: 0;
  margin: 0;
  overflow-y: hidden;
`;

const StyledLabel = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;

  padding: 13px 17px;

  color: #96a1b2;
  font-weight: 600;
  font-size: 16px;
`;
