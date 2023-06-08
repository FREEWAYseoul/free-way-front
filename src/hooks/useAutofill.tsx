import { useCallback } from 'react';
import { useSearchContext } from '../components/domain/Search/SearchContext';

const useAutofill = () => {
  const {
    autofillRef,
    selectedIdx,
    matchingData,
    setSelectedIdx,
    focusOnSearchInput,
    setSelectedStationInfo,
    setKeywords,
  } = useSearchContext();

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
          alert('enter');
          break;
        default:
          break;
      }
    },
    [selectedIdx, autofillRef, setSelectedIdx]
  );

  const handleAutofillClick = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    const selectedStation = matchingData.filter((data) => data.stationId === e.currentTarget.id);
    setSelectedStationInfo(selectedStation[0]);
    setKeywords(selectedStation[0].stationName);
    focusOnSearchInput();
  };

  return { handleKeydown, handleAutofillClick };
};

export default useAutofill;
