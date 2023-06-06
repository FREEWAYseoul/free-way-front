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
import { Station, useStationInfo } from '../../../api/stations';
import { useNavigate } from 'react-router-dom';

type SearchState = {
  keywords: string;
  searchHistory: Station[];
};

type SearchAction = {
  handleTyping: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleMouseDown: () => void;
  handleMouseUp: () => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isListening: () => boolean;
  resetKeywords: () => void;
  selectKeywords: (keywords: string) => void;
  addSearchHistory: () => void;
  getFourRecentSearchHistory: () => Station[];
};

type SearchContext = SearchState & SearchAction;

const SearchContext = createContext<SearchContext | null>(null);

export const SearchContextProvider = ({ children }: PropsWithChildren) => {
  const [keywords, setKeywords] = useState('');
  const [searchHistory, setSearchHistory] = useState<Station[]>([]);
  const { data } = useStationInfo(keywords);
  const navigate = useNavigate();

  const { listen, listening, stop } = useSpeechRecognition({
    onResult: (result: string) => {
      setKeywords(result);
    },
    onEnd: () => {
      if (keywords) navigate('/search');
    },
  });

  const handleMouseDown = () => {
    listen({ lang: 'ko-KR' });
  };

  const handleMouseUp = () => {
    stop();
  };

  const isListening = (): boolean => {
    return listening;
  };

  const handleTyping = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setKeywords(e.target.value);
  }, []);

  const addSearchHistory = useCallback(() => {
    if (!data) return;

    setSearchHistory([...searchHistory, ...data]);
    localStorage.setItem('최근 검색', JSON.stringify([...searchHistory, ...data]));
  }, [data, searchHistory]);

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

  const selectKeywords = (keywords: string) => {
    setKeywords(keywords);
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
    handleMouseDown,
    handleMouseUp,
    handleSubmit,
    isListening,
    resetKeywords,
    selectKeywords,
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
