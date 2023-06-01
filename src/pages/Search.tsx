import { KeywordsContextProvider } from '../components/domain/KeywordsContext';
import Search from '../components/domain/Search';

const SearchPage = () => {
  return (
    <KeywordsContextProvider>
      <Search />
    </KeywordsContextProvider>
  );
};

export default SearchPage;
