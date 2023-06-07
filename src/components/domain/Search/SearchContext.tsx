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

  const [keywords, setKeywords] = useState('');
  const [searchHistory, setSearchHistory] = useState<Station[]>([]);
  // const [filteredStations, setFilteredStations] = useState([]);

  // Voice Search Logics
  const startListening = useCallback(() => {
    listen({ lang: 'ko-KR' });
  }, [listen]);

  const endListening = useCallback(() => {
    stop();
  }, [stop]);

  const isListening = useCallback((): boolean => {
    return listening;
  }, [listening]);

  // Text Search Logics
  const handleTyping = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setKeywords(e.target.value);
  }, []);

  const getMatchingData = (data: Station[]) => {
    const character = keywords.trim();
    return data.filter((data: Station) => data.stationName.includes(character));
  };

  const addSearchHistory = useCallback(() => {
    return;
    // if (!filteredStations) return;
    // setSearchHistory([...searchHistory, ...filteredStations]);
    // localStorage.setItem('최근 검색', JSON.stringify([...searchHistory, ...filteredStations]));
  }, []);

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      addSearchHistory();
    },
    [addSearchHistory]
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
