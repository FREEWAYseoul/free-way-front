import { useSpeechRecognition } from 'react-speech-kit';
import { useSearchContext } from '../components/domain/Search/SearchContext';
import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';

const useMic = () => {
  const navigate = useNavigate();
  const { keywords, setKeywords } = useSearchContext();
  const { listen, listening, stop } = useSpeechRecognition({
    onResult: (result: string) => {
      setKeywords(result);
    },
    onEnd: () => {
      if (keywords) navigate('/search');
    },
  });

  const startListening = useCallback(() => {
    listen({ lang: 'ko-KR' });
  }, [listen]);

  const endListening = useCallback(() => {
    stop();
  }, [stop]);

  const isListening = useCallback((): boolean => {
    return listening;
  }, [listening]);

  return { startListening, endListening, isListening };
};

export default useMic;
