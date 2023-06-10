import SearchList from '../Search/SearchList';
import styled from 'styled-components';
import useLocalStorage from '../../../hooks/useLocalStorage';

const HomeSearchHistoryList = () => {
  const { getFourRecentSearchHistory } = useLocalStorage();
  const recentSearchHistory = getFourRecentSearchHistory();

  let content = null;
  if (recentSearchHistory.length) {
    content = <SearchList label='최근 검색' data={recentSearchHistory} />;
  } else {
    content = <AdBox>최근 검색어가 없습니다.</AdBox>;
  }

  return <StyledHomeSearchListWrapper>{content}</StyledHomeSearchListWrapper>;
};

export default HomeSearchHistoryList;

const StyledHomeSearchListWrapper = styled.div`
  position: absolute;
  bottom: 20%;
  width: 90%;
  height: 20%;
  max-height: 220px;
`;

const AdBox = styled.div`
  width: 100%;
  height: 100%;

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
