import styled from 'styled-components';
import SearchItem from './SearchItem';
import { type Station } from '../../../api/stations';

type Props = {
  label?: string;
  data: Station[];
};

const SearchList = ({ label, data }: Props) => {
  console.log('search list data', data);
  return (
    <ListWrapper id='search-list-wrapper'>
      <Label>{label}</Label>
      {data.map((station) => (
        <SearchItem
          key={station.stationId}
          id={station.stationId}
          name={station.stationName}
          status={station.stationStatus}
          line={station.lineId}
        />
      ))}
    </ListWrapper>
  );
};

export default SearchList;

const ListWrapper = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  max-width: 320px;
  max-height: 90%;
  padding: 10px 32px;
  overflow-y: auto;
`;

const Label = styled.div`
  color: #96a1b2;
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;
`;
