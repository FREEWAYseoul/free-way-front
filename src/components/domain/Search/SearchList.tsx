import styled from 'styled-components';
import SearchItem from './SearchItem';
import { type Station } from '../../../api/stations';

// const searchHistory = [
//   { id: 1, name: '강남역', status: '사용가능', line: '2' },
//   { id: 2, name: '신논현역', status: '사용가능', line: '9' },
//   { id: 3, name: '신림역', status: '일부가능', line: '2' },
//   { id: 4, name: '시청역', status: '사용불가능', line: '1' },
// ] as const;

type Props = {
  label?: string;
  data: Station[];
};

const SearchList = ({ label, data }: Props) => {
  return (
    <ListWrapper>
      <Label>{label}</Label>
      {data?.map((station) => (
        <SearchItem
          key={station.id}
          id={station.id}
          name={station.name}
          status={station.status}
          line={station.line}
        />
      ))}
    </ListWrapper>
  );
};

export default SearchList;

const ListWrapper = styled.div`
  width: 100%;
  padding: 20px 32px;
  padding-bottom: 48px;
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
