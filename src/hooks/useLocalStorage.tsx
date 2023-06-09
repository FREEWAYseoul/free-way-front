import { useCallback } from 'react';
import { useSearchContext } from '../components/domain/Search/SearchContext';

const useLocalStorage = () => {
  const { searchHistory, filteredStations, setSearchHistory } = useSearchContext();
  const addSearchHistory = useCallback(() => {
    if (!filteredStations) {
      return;
    }
    setSearchHistory([...searchHistory, ...filteredStations]);
    localStorage.setItem('최근 검색', JSON.stringify([...searchHistory, ...filteredStations]));
  }, [filteredStations, searchHistory, setSearchHistory]);

  const getFourRecentSearchHistory = () => {
    return searchHistory.filter((v) => v !== null).slice(0, 4);
  };

  return { addSearchHistory, getFourRecentSearchHistory };
};

export default useLocalStorage;
