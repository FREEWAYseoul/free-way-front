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

type KeywordsState = {
  keywords: string;
};
type KeywordsAction = {
  handleTyping: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleMouseDown: () => void;
  handleMouseUp: () => void;
  handleSubmit: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isListening: () => boolean;
  resetKeywords: () => void;
  selectKeywords: (keywords: string) => void;
};
type KeywordsContext = KeywordsState & KeywordsAction;

const KeywordsContext = createContext<KeywordsContext | null>(null);

export const KeywordsContextProvider = ({ children }: PropsWithChildren) => {
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
  return <KeywordsContext.Provider value={value}>{children}</KeywordsContext.Provider>;
};

export const useKeywordsContext = () => {
  const context = useContext(KeywordsContext);
  if (!context) {
    throw new Error('no context found!');
  }
  return context;
};
