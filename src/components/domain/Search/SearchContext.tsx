/* eslint-disable react-refresh/only-export-components */
import {
  ChangeEvent,
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useState,
} from 'react';
import { useSpeechRecognition } from 'react-speech-kit';

type SearchState = {
  keywords: string;
};
type SearchAction = {
  handleTyping: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleMouseDown: () => void;
  handleMouseUp: () => void;
  handleSubmit: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isListening: () => boolean;
  resetKeywords: () => void;
  selectKeywords: (keywords: string) => void;
};
type SearchContext = SearchState & SearchAction;

const SearchContext = createContext<SearchContext | null>(null);

export const SearchContextProvider = ({ children }: PropsWithChildren) => {
  const [keywords, setKeywords] = useState('');

  const { listen, listening, stop } = useSpeechRecognition({
    onResult: (result: string) => {
      setKeywords(result);
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

  const handleTyping = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setKeywords(e.target.value);
  }, []);

  const handleSubmit = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    /** TODOS
     * 1. 키워드를 localStorage에 넣기
     * 2. 결과페이지로 이동하기
     */
    e.preventDefault();
  }, []);

  const resetKeywords = () => {
    setKeywords('');
  };

  const selectKeywords = (keywords: string) => {
    setKeywords(keywords);
  };

  const value = {
    keywords,
    handleTyping,
    handleMouseDown,
    handleMouseUp,
    handleSubmit,
    isListening,
    resetKeywords,
    selectKeywords,
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
