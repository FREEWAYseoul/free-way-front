import { useSpeechRecognition } from 'react-speech-kit';
import { useSearchContext } from '../components/domain/Search/SearchContext';
import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';
import useSearchBar from './useSearchBar';

const useMic = () => {
  const navigate = useNavigate();
  const { keywords, setKeywords } = useSearchContext();
  const { selectStationByKeywords, saveStation } = useSearchBar();

  const { listen, stop, listening } = useSpeechRecognition({
    onResult: (result: string) => {
      setKeywords(result);
    },
    onEnd: () => {
      const selectedStation = selectStationByKeywords(keywords);
      if (!selectedStation) {
        alert('일치하는 역이 없습니다! 다시 한 번 말씀해주세요!');
        return;
      }
      saveStation(selectedStation);
      navigate('/result');
    },
  });

  const startListening = useCallback(() => {
    setKeywords('');
    listen({ lang: 'ko-KR' });
    const timer = setTimeout(() => {
      stop();
    }, 3000);
    return () => {
      clearTimeout(timer);
    };
  }, [setKeywords, listen, stop]);

  const endListening = useCallback(() => {
    stop();
  }, [stop]);

  const isListening = useCallback((): boolean => {
    return listening;
  }, [listening]);

  return { startListening, endListening, isListening };
};

export default useMic;
