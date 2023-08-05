/* eslint-disable react-refresh/only-export-components */
import {
  Dispatch,
  PropsWithChildren,
  RefObject,
  SetStateAction,
  createContext,
  useContext,
  useRef,
  useState,
} from 'react';
import { StationProps } from '../../../types/stationType';

type SearchState = {
  keywords: string;
  searchHistory: StationProps[];
  stationId: string;
  matchingData: StationProps[];
  selectedStationInfo: StationProps | undefined;
  filteredStations: StationProps[];
  selectedIdx: number;
  autofillRef: RefObject<HTMLUListElement>;
  inputRef: RefObject<HTMLInputElement>;
};

type SearchAction = {
  setSelectedIdx: Dispatch<SetStateAction<number>>;
  setSelectedStationInfo: Dispatch<SetStateAction<StationProps | undefined>>;
  setKeywords: Dispatch<SetStateAction<string>>;
  setFilteredStations: Dispatch<SetStateAction<StationProps[] | []>>;
  setMatchingData: Dispatch<SetStateAction<StationProps[] | []>>;
  setSearchHistory: Dispatch<SetStateAction<StationProps[] | []>>;
};

type SearchContext = SearchState & SearchAction;

const SearchContext = createContext<SearchContext | null>(null);

export const SearchContextProvider = ({ children }: PropsWithChildren) => {
  const [keywords, setKeywords] = useState<string>('');
  const [searchHistory, setSearchHistory] = useState<StationProps[]>([]);
  const [matchingData, setMatchingData] = useState<StationProps[]>([]);
  const [selectedStationInfo, setSelectedStationInfo] = useState<StationProps | undefined>();
  const [filteredStations, setFilteredStations] = useState<StationProps[] | []>([]);
  const [selectedIdx, setSelectedIdx] = useState<number>(-1);
  const autofillRef = useRef<HTMLUListElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const value = {
    keywords,
    searchHistory,
    stationId: selectedStationInfo ? selectedStationInfo.stationId : '70',
    matchingData,
    selectedStationInfo,
    selectedIdx,
    filteredStations,
    autofillRef,
    inputRef,
    setSelectedIdx,
    setSelectedStationInfo,
    setKeywords,
    setFilteredStations,
    setMatchingData,
    setSearchHistory,
  };

  return <SearchContext.Provider value={value}>{children}</SearchContext.Provider>;
};

export const useSearchContext = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('no context found!');
  }
  return context;
};
