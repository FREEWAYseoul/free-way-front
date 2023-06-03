import styled from 'styled-components';
import SearchItem from './SearchItem';
import { type Station } from '../../../api/stations';

type Props = {
  label?: string;
  data: Station[];
};

const SearchList = ({ label, data }: Props) => {
  return (
    <ListWrapper>
      <Label>{label}</Label>
      {data &&
        data?.map((station) => (
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
