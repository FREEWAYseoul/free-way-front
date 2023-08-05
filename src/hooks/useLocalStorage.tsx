import { useCallback } from 'react';
import { useSearchContext } from '../components/domain/Search/SearchContext';
import { StationProps } from '../types/stationType';

const useLocalStorage = () => {
  const { setSearchHistory } = useSearchContext();
  const removeDuplication = (selectedStationInfo: StationProps, data: StationProps[]) => {
    return data.filter((station) => station.stationId !== selectedStationInfo.stationId);
  };

  const addSearchHistory = useCallback((selectedStationInfo: StationProps) => {
    if (!selectedStationInfo || selectedStationInfo == undefined) {
      return;
    }
    const data = JSON.parse(localStorage.getItem('최근 검색') || '[]');
    const dataWithoutDuplication = removeDuplication(selectedStationInfo, data);
    const newData = [...dataWithoutDuplication, selectedStationInfo];
    localStorage.setItem('최근 검색', JSON.stringify(newData));
  }, []);

  const displaySearchHistoryInOrder = useCallback(() => {
    setSearchHistory(
      JSON.parse(localStorage.getItem('최근 검색') || '[]')
        .slice(-4)
        .reverse()
    );
  }, [setSearchHistory]);

  return { addSearchHistory, displaySearchHistoryInOrder };
};

export default useLocalStorage;
