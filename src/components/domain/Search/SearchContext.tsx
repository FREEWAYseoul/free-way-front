/* eslint-disable react-refresh/only-export-components */
import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useSpeechRecognition } from 'react-speech-kit';
import { Station } from '../../../api/stations';
import { useNavigate } from 'react-router-dom';

type SearchState = {
  keywords: string;
  searchHistory: Station[];
};

type SearchAction = {
  handleTyping: (e: React.ChangeEvent<HTMLInputElement>) => void;
  startListening: () => void;
  endListening: () => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isListening: () => boolean;
  resetKeywords: () => void;
  addSearchHistory: () => void;
  getFourRecentSearchHistory: () => Station[];
  getMatchingData: (data: Station[]) => Station[];
  handleAutofillClick: (e: React.MouseEvent<HTMLLIElement>) => void;
  focusOnSearchInput: () => void;
};

type SearchContext = SearchState & SearchAction;

const SearchContext = createContext<SearchContext | null>(null);

export const SearchContextProvider = ({ children }: PropsWithChildren) => {
  const navigate = useNavigate();
  // const { data } = useStationInfo();
  const { listen, listening, stop } = useSpeechRecognition({
    onResult: (result: string) => {
      setKeywords(result);
    },
    onEnd: () => {
      if (keywords) navigate('/search');
    },
  });

  const [keywords, setKeywords] = useState<string | null>('');
  const [searchHistory, setSearchHistory] = useState<Station[]>([]);
  const [matchingData, setMatchingData] = useState<Station[]>([]);
  const [selectedStationInfo, setSelectedStationInfo] = useState<Station>();
  const [filteredStations, setFilteredStations] = useState([]);
  console.log(selectedStationInfo);
  console.log(setFilteredStations);

  const startListening = useCallback(() => {
    listen({ lang: 'ko-KR' });
  }, [listen]);

  const endListening = useCallback(() => {
    stop();
  }, [stop]);

  const isListening = useCallback((): boolean => {
    return listening;
  }, [listening]);

  const handleTyping = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setKeywords(e.target.value);
  }, []);

  const handleAutofillClick = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    const selectedStation = matchingData.filter((data) => data.stationId === e.currentTarget.id);
    setSelectedStationInfo(selectedStation[0]);
    setKeywords(selectedStation[0].stationName);
    focusOnSearchInput();
  };

  const focusOnSearchInput = () => {
    document.querySelector('#search-bar')?.focus();
  };

  const getMatchingData = useCallback(
    (data: Station[]) => {
      const character = keywords?.trim();
      const matchingData = data.filter(
        (data: Station) => character && data.stationName.includes(character)
      );
      setMatchingData(matchingData);
      return matchingData;
    },
    [keywords]
  );

  // TODO: 로컬 스토리지 관련 로직 수정 필요
  const addSearchHistory = useCallback(() => {
    if (!filteredStations) return;
    setSearchHistory([...searchHistory, ...filteredStations]);
    localStorage.setItem('최근 검색', JSON.stringify([...searchHistory, ...filteredStations]));
  }, [filteredStations, searchHistory]);

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      // addSearchHistory();
      navigate('/result');
    },
    [navigate]
  );

  const resetKeywords = () => {
    setKeywords('');
  };

  const getFourRecentSearchHistory = () => {
    return searchHistory.filter((v) => v !== null).slice(0, 4);
  };

  const value = {
    keywords,
    searchHistory,
    addSearchHistory,
    getFourRecentSearchHistory,
    handleTyping,
    startListening,
    endListening,
    handleSubmit,
    isListening,
    resetKeywords,
    getMatchingData,
    handleAutofillClick,
    focusOnSearchInput,
  };

  useEffect(() => {
    setSearchHistory(JSON.parse(localStorage.getItem('최근 검색') || '[]'));
  }, []);

  return <SearchContext.Provider value={value}>{children}</SearchContext.Provider>;
};

export const useSearchContext = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('no context found!');
  }
  return context;
};
