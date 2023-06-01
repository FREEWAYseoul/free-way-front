import { SearchContextProvider } from '../components/domain/Search/SearchContext';
import Search from '../components/domain/Search';

const SearchPage = () => {
  return (
    <SearchContextProvider>
      <Search />
    </SearchContextProvider>
  );
};

export default SearchPage;
