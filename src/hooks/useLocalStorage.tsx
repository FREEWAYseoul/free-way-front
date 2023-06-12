import { useCallback } from 'react';
import { Station } from '../api/stations';

const useLocalStorage = () => {
  const removeDuplication = (selectedStationInfo: Station, data: Station[]) => {
    return data.filter((station) => station.stationId !== selectedStationInfo.stationId);
  };

  const addSearchHistory = useCallback((selectedStationInfo: Station) => {
    if (!selectedStationInfo || selectedStationInfo == undefined) {
      return;
    }
    const data = JSON.parse(localStorage.getItem('최근 검색') || '[]');
    const dataWithoutDuplication = removeDuplication(selectedStationInfo, data);
    const newData = [...dataWithoutDuplication, selectedStationInfo];
    localStorage.setItem('최근 검색', JSON.stringify(newData));
  }, []);

  return { addSearchHistory };
};

export default useLocalStorage;
