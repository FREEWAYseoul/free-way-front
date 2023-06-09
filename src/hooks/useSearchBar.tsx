import { useCallback } from 'react';
import { Station } from '../api/stations';
import { useSearchContext } from '../components/domain/Search/SearchContext';
import { useNavigate } from 'react-router-dom';
import useLocalStorage from './useLocalStorage';

const useSearchBar = () => {
  const navigate = useNavigate();
  const { keywords, filteredStations, inputRef, setKeywords, setMatchingData } = useSearchContext();
  const { addSearchHistory } = useLocalStorage();

  const getMatchingData = useCallback(
    (data: Station[]) => {
      const character = keywords?.replace('역', '').trim();
      const matchingData = data.filter(
        (data: Station) => character && data.stationName.includes(character)
      );
      setMatchingData(matchingData);
      return matchingData;
    },
    [keywords, setMatchingData]
  );

  const handleTyping = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setKeywords(e.target.value);
    },
    [setKeywords]
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      if (!inputRef.current?.value.length || !filteredStations.length) {
        e.preventDefault();
        alert('역이름을 다시 한 번 확인해주세요!');
        return;
      } else {
        e.preventDefault();
        addSearchHistory();
        navigate('/result');
      }
    },
    [navigate, addSearchHistory, inputRef, filteredStations]
  );
  const focusOnSearchInput = () => {
    const el: HTMLInputElement | null = document.querySelector('#search-bar');
    if (el) el.focus();
  };

  const resetKeywords = () => {
    setKeywords('');
  };

  return { getMatchingData, handleSubmit, focusOnSearchInput, resetKeywords, handleTyping };
};

export default useSearchBar;
