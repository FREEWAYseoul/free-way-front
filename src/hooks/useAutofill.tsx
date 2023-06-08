import { useCallback } from 'react';
import { useSearchContext } from '../components/domain/Search/SearchContext';
import useSearchBar from './useSearchBar';

const useAutofill = () => {
  const {
    autofillRef,
    inputRef,
    selectedIdx,
    matchingData,
    searchHistory,
    setSelectedIdx,
    setSelectedStationInfo,
    setKeywords,
  } = useSearchContext();
  const { focusOnSearchInput } = useSearchBar();

  const handleAutofillClick = useCallback(
    (e: React.MouseEvent<HTMLLIElement, MouseEvent> | React.KeyboardEvent<HTMLLIElement>) => {
      const data = matchingData ? matchingData : searchHistory;
      const selectedStation = data.filter((station) => station.stationId === e.currentTarget.id);
      setSelectedStationInfo(selectedStation[0]);
      setKeywords(selectedStation[0].stationName);
      focusOnSearchInput();
    },
    [focusOnSearchInput, matchingData, searchHistory, setKeywords, setSelectedStationInfo]
  );

  const handleKeydown = useCallback(
    (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowDown':
          setSelectedIdx((prev) => prev + 1);
          if (autofillRef.current?.childElementCount === selectedIdx + 1) setSelectedIdx(0);
          break;
        case 'ArrowUp':
          setSelectedIdx((prev) => prev - 1);
          if (selectedIdx <= 0) {
            setSelectedIdx(-1);
          }
          break;
        case `Escape`:
          setSelectedIdx(-1);
          break;
        case 'Enter':
          if (inputRef.current?.value !== matchingData[selectedIdx]?.stationName) {
            e.preventDefault();
            setKeywords(matchingData[selectedIdx]?.stationName);
            return;
          }
          break;
        default:
          break;
      }
    },
    [autofillRef, inputRef, matchingData, selectedIdx, setKeywords, setSelectedIdx]
  );

  return { handleKeydown, handleAutofillClick };
};

export default useAutofill;
