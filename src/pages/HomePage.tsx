import Home from '../components/domain/Home';
import { SearchContextProvider } from '../components/domain/Search/SearchContext';

const HomePage = () => {
  return (
    <SearchContextProvider>
      <Home />
    </SearchContextProvider>
  );
};

export default HomePage;
