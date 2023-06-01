import SearchList from '../Search/SearchList';
import { stations } from '../../../mocks/data/stations';
import styled from 'styled-components';

const tempData = stations;

const HomeSearchHistoryList = () => {
  return (
    <StyledHomeSearchListWrapper>
      <SearchList label='최근 검색' data={tempData} />
    </StyledHomeSearchListWrapper>
  );
};

export default HomeSearchHistoryList;

const StyledHomeSearchListWrapper = styled.div`
  width: 90%;
`;
