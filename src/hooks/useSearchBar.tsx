import { useCallback } from 'react';
import { Station } from '../api/stations';
import { useSearchContext } from '../components/domain/Search/SearchContext';
import { useNavigate } from 'react-router-dom';
import useLocalStorage from './useLocalStorage';
import NotFound from '../components/domain/Search/NotFound';
import SearchList from '../components/domain/Search/SearchList';
import VoiceSearchField from '../components/domain/Home/VoiceSearchField';
import { useStationInfo } from '../api/stations';
import useAutocomplete from './useAutocomplete';

const useSearchBar = () => {
  const navigate = useNavigate();
  const {
    keywords,
    filteredStations,
    inputRef,
    searchHistory,
    setKeywords,
    setSelectedStationInfo,
  } = useSearchContext();
  const { data } = useStationInfo();
  const { autocomplete } = useAutocomplete();
  const { addSearchHistory } = useLocalStorage();

  // 실행되는 곳: 모든 페이지 검색 input onChange시
  const handleTyping = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setKeywords(e.target.value);
    },
    [setKeywords]
  );

  // 함수 설명: 서버에서 받아온 데이터 중 keywords를 포함하는 데이터만 골라 반환하는 함수.
  // 실행되는 곳: Search 페이지 useEffect시
  const getFilteredStations = useCallback(
    (keywords: string) => {
      const character = keywords?.replace('역', '').trim();
      const wordsStartingWithKeywords = autocomplete.searchPrefix(character);
      const filteredStations = data.filter((station: Station) =>
        wordsStartingWithKeywords.includes(station.stationName)
      );

      return filteredStations;
    },
    [autocomplete, data]
  );

  // 함수 설명: 키워드를 포함하는 데이터 or 로컬 데이터 중 dropdownbox에서 선택한 것과 같은 데이터만 반환하는 함수
  const selectStationById = useCallback(
    (id: string) => {
      const data = filteredStations.length ? filteredStations : searchHistory;
      const selectedStation = data.filter((station) => station.stationId === id).at(-1);
      return selectedStation;
    },
    [filteredStations, searchHistory]
  );

  const selectStationByKeywords = useCallback(
    (keywords: string) => {
      return getFilteredStations(keywords)[0];
    },
    [getFilteredStations]
  );

  // 함수 설명: 클릭 or submit된 역 정보를 저장(로컬과 리액트내)
  const saveStation = useCallback(
    (selectedStation: Station) => {
      setSelectedStationInfo(selectedStation);
      addSearchHistory(selectedStation);
      setKeywords(selectedStation?.stationName);
    },
    [addSearchHistory, setKeywords, setSelectedStationInfo]
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      if (!inputRef.current?.value.length || !filteredStations.length) {
        e.preventDefault();
        alert('역이름을 다시 한 번 확인해주세요!');
        return;
      } else {
        e.preventDefault();
        const selectedStation = selectStationByKeywords(keywords);
        if (!selectedStation) return;
        saveStation(selectedStation);
        navigate('/result');
      }
    },
    [inputRef, filteredStations.length, selectStationByKeywords, keywords, saveStation, navigate]
  );

  const focusOnSearchInput = useCallback(() => {
    const el: HTMLInputElement | null = document.querySelector('#search-bar');
    if (el) el.focus();
  }, []);

  const resetKeywords = () => {
    setKeywords('');
  };

  const convertKeywordsToContent = (keywords: string, isListening: boolean) => {
    let content = <div></div>;

    if (keywords) {
      if (!filteredStations.length) {
        content = <NotFound>"{keywords}" 검색 결과가 없습니다.</NotFound>;
      } else {
        content = <SearchList data={filteredStations} />;
      }
    } else if (!keywords && searchHistory.length > 0) {
      content = <SearchList label='최근 기록' type={'searchpage'} data={searchHistory} />;
    } else {
      content = <div></div>;
    }

    if (isListening) {
      content = <VoiceSearchField />;
    }

    return content;
  };

  return {
    handleTyping,
    handleSubmit,
    selectStationById,
    selectStationByKeywords,
    saveStation,
    resetKeywords,
    focusOnSearchInput,
    getFilteredStations,
    convertKeywordsToContent,
  };
};

export default useSearchBar;
