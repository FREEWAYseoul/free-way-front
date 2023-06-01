import SearchList from '../common/Search/SearchList';
import SearchBar from '../common/Search/SearchBar';
import { useKeywordsContext } from './KeywordsContext';
import { useStationInfo } from '../../api/stations';

const Search = () => {
  const { keywords } = useKeywordsContext();
  const { data } = useStationInfo(keywords);

  return (
    <>
      <SearchBar
        placeholder='역이름을 입력해주세요.'
        listeningMessage='듣고 있습니다! 역이름을 말해주세요.'
      />
      <SearchList label='최근 검색' data={data} />
    </>
  );
};

export default Search;
