import styled from 'styled-components';
import SearchList from './SearchList';
import SearchBar from './SearchBar';
import { useSearchContext } from './SearchContext';
import { useStationInfo } from '../../../api/stations';
import { useEffect } from 'react';
import useSearchBar from '../../../hooks/useSearchBar';
import useLocalStorage from '../../../hooks/useLocalStorage';
import SearchLoading from './SearchLoading';
import ProgressBar from '../../common/ProgressBar';
import NotFound from './NotFound';

const Search = () => {
  const { keywords, filteredStations, setFilteredStations } = useSearchContext();
  const { getMatchingData, focusOnSearchInput } = useSearchBar();
  const { getFourRecentSearchHistory } = useLocalStorage();
  const { data, isLoading } = useStationInfo();
  const recentSearchHistory = getFourRecentSearchHistory();

  let content = null;

  if (keywords) {
    if (!filteredStations.length) {
      content = <NotFound>"{keywords}" 검색 결과가 없습니다.</NotFound>;
    } else {
      content = <SearchList data={filteredStations} />;
    }
  } else if (!keywords && recentSearchHistory.length > 0) {
    content = <SearchList data={recentSearchHistory} />;
  } else {
    content = <div></div>;
  }

  useEffect(() => {
    if (data) {
      const temp = getMatchingData(data);
      setFilteredStations(temp);
    }
    focusOnSearchInput();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keywords, data, getMatchingData]);

  return (
    <SearchWrapper>
      <SearchBar
        placeholder='역이름을 입력해주세요.'
        listeningMessage='듣고 있습니다! 역이름을 말해주세요.'
      />
      {isLoading ? (
        <>
          <ProgressBar />
          <SearchLoading />
        </>
      ) : (
        <DropdownBoxWrapper>{content}</DropdownBoxWrapper>
      )}
    </SearchWrapper>
  );
};

export default Search;

const SearchWrapper = styled.div`
  min-width: 375px;
  min-height: 812px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding-top: 10%;
`;

const DropdownBoxWrapper = styled.div`
  min-width: 375px;
  height: 528px;
  border-radius: 5px;

  display: flex;
  justify-content: center;
  align-items: center;

  position: relative;
`;
