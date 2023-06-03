import SearchList from './SearchList';
import SearchBar from './SearchBar';
import { useSearchContext } from './SearchContext';
import { useStationInfo } from '../../../api/stations';

const Search = () => {
  const { keywords, getFourRecentSearchHistory } = useSearchContext();
  const { data } = useStationInfo(keywords);
  const recentSearchHistory = getFourRecentSearchHistory();
  return (
    <>
      <SearchBar
        placeholder='역이름을 입력해주세요.'
        listeningMessage='듣고 있습니다! 역이름을 말해주세요.'
      />
      {keywords ? (
        <SearchList data={data} />
      ) : (
        <SearchList label='최근 검색' data={recentSearchHistory} />
      )}
    </>
  );
};

export default Search;
