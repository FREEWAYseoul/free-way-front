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
    content = <SearchList label='최근 기록' data={recentSearchHistory} />;
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
      <DropdownBox>
        {isLoading ? (
          <>
            <ProgressBar />
            <SearchLoading />
          </>
        ) : (
          <>{content}</>
        )}
      </DropdownBox>
    </SearchWrapper>
  );
};

export default Search;

const SearchWrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: #f2f4f6;
`;

const DropdownBox = styled.div`
  position: fixed;
  top: 75px;
  width: 100%;
  max-width: 375px;
  max-height: 50%;
`;
