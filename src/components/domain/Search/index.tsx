import styled from 'styled-components';
import SearchList from './SearchList';
import SearchBar from './SearchBar';
import { useSearchContext } from './SearchContext';
import { Station, useStationInfo } from '../../../api/stations';
import { useEffect, useState } from 'react';

const Search = () => {
  const { keywords, getFourRecentSearchHistory, getMatchingData, focusOnSearchInput } =
    useSearchContext();
  const { data, isLoading } = useStationInfo();
  const [keywordMatchingData, setKeywordMatchingData] = useState<Station[] | []>([]);
  const recentSearchHistory = getFourRecentSearchHistory();

  let content = null;
  if (isLoading) {
    content = <div>loading...</div>;
  } else {
    if (keywords) {
      if (!keywordMatchingData.length) {
        content = <div>검색 결과가 없습니다.</div>;
      } else {
        content = <SearchList data={keywordMatchingData} />;
      }
    } else if (!keywords && recentSearchHistory.length > 0) {
      content = <SearchList data={recentSearchHistory} />;
    } else {
      content = <div></div>;
    }
  }

  useEffect(() => {
    if (data) {
      const temp = getMatchingData(data);
      setKeywordMatchingData(temp);
    }
    focusOnSearchInput();
  }, [keywords, data, getMatchingData, focusOnSearchInput]);

  return (
    <SearchWrapper>
      <SearchBar
        placeholder='역이름을 입력해주세요.'
        listeningMessage='듣고 있습니다! 역이름을 말해주세요.'
      />
      <DropdownBoxWrapper>{content}</DropdownBoxWrapper>
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
