import SearchList from '../Search/SearchList';
import styled from 'styled-components';
import { useSearchContext } from '../Search/SearchContext';

const HomeSearchHistoryList = () => {
  const { searchHistory } = useSearchContext();

  let content = null;
  if (searchHistory.length) {
    content = <SearchList label='최근 검색' type='homepage' data={searchHistory} />;
  } else {
    content = <HomeNotFoundBox>최근 검색어가 없습니다.</HomeNotFoundBox>;
  }

  return <StyledHomeSearchListWrapper>{content}</StyledHomeSearchListWrapper>;
};

export default HomeSearchHistoryList;

const StyledHomeSearchListWrapper = styled.div`
  position: absolute;
  top: 6px;
  max-height: 220px;
  width: 100%;
`;

const HomeNotFoundBox = styled.div`
  margin-top: 126px;

  min-width: 337px;
  min-height: 206px;

  background-color: #f2f4f6;
  border-radius: 10px;

  display: flex;
  justify-content: center;
  align-items: center;

  color: rgba(0, 0, 0, 0.5);
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;
`;
