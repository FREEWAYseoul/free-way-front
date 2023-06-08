/* eslint-disable react-refresh/only-export-components */
import {
  Dispatch,
  PropsWithChildren,
  RefObject,
  SetStateAction,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useSpeechRecognition } from 'react-speech-kit';
import { Station } from '../../../api/stations';
import { useNavigate } from 'react-router-dom';

type SearchState = {
  keywords: string;
  searchHistory: Station[];
  stationId: number;
  autofillRef: RefObject<HTMLUListElement>;
  selectedIdx: number;
  matchingData: Station[];
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
  focusOnSearchInput: () => void;
  setSelectedIdx: Dispatch<SetStateAction<number>>;
  setSelectedStationInfo: Dispatch<SetStateAction<Station | undefined>>;
  setKeywords: Dispatch<SetStateAction<string>>;
  setFilteredStations: Dispatch<SetStateAction<never[]>>;
};

type SearchContext = SearchState & SearchAction;

const SearchContext = createContext<SearchContext | null>(null);

export const SearchContextProvider = ({ children }: PropsWithChildren) => {
  const navigate = useNavigate();

  const { listen, listening, stop } = useSpeechRecognition({
    onResult: (result: string) => {
      setKeywords(result);
    },
    onEnd: () => {
      if (keywords) navigate('/search');
    },
  });

  const [keywords, setKeywords] = useState<string>('');
  const [searchHistory, setSearchHistory] = useState<Station[]>([]);
  const [matchingData, setMatchingData] = useState<Station[]>([]);
  const [selectedStationInfo, setSelectedStationInfo] = useState<Station>();
  const [filteredStations, setFilteredStations] = useState([]);

  const [selectedIdx, setSelectedIdx] = useState<number>(-1);
  const autofillRef = useRef<HTMLUListElement>(null);

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

  const focusOnSearchInput = () => {
    const el: HTMLInputElement | null = document.querySelector('#search-bar');
    if (el) el.focus();
  };

  const getMatchingData = useCallback(
    (data: Station[]) => {
      const character = keywords?.replace('역', '').trim();
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
    stationId: selectedStationInfo ? Number(selectedStationInfo.stationId) : 150,
    matchingData,
    autofillRef,
    selectedIdx,
    setSelectedIdx,
    setSelectedStationInfo,
    setKeywords,
    setFilteredStations,
    addSearchHistory,
    getFourRecentSearchHistory,
    handleTyping,
    startListening,
    endListening,
    handleSubmit,
    isListening,
    resetKeywords,
    getMatchingData,
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
