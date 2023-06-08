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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keywords, data, getMatchingData]);

  return (
    <SearchWrapper>
      <SearchBarWrapper>
        <SearchBar
          placeholder='역이름을 입력해주세요.'
          listeningMessage='듣고 있습니다! 역이름을 말해주세요.'
        />
      </SearchBarWrapper>
      <DropdownBoxWrapper>{content}</DropdownBoxWrapper>
    </SearchWrapper>
  );
};

export default Search;

const SearchWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SearchBarWrapper = styled.div`
  width: 90%;
  height: min-content;
`;
const DropdownBoxWrapper = styled.div`
  position: relative;

  width: 80%;
  max-width: 375px;
  height: 528px;
  border-radius: 5px;

  display: flex;
  justify-content: center;
  align-items: center;

  /* background-color: rgba(0, 0, 0, 0.3); */
`;
