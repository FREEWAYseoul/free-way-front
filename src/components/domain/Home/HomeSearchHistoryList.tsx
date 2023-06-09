import SearchList from '../Search/SearchList';
import styled from 'styled-components';
import { useSearchContext } from '../Search/SearchContext';

const HomeSearchHistoryList = () => {
  const { getFourRecentSearchHistory } = useSearchContext();
  const recentSearchHistory = getFourRecentSearchHistory();

  let content = null;
  if (recentSearchHistory.length) {
    content = <SearchList label='최근 검색' data={recentSearchHistory} />;
  } else {
    content = <div>광고가 들어갈 자리입니다</div>;
  }

  return <StyledHomeSearchListWrapper>{content}</StyledHomeSearchListWrapper>;
};

export default HomeSearchHistoryList;

const StyledHomeSearchListWrapper = styled.div`
  position: absolute;
  left: 5.33%;
  right: 5.33%;
  top: 51.97%;
  bottom: 39.16%;
`;
