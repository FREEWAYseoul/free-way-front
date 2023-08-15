/* eslint-disable react-hooks/exhaustive-deps */
import 'regenerator-runtime/runtime';
import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { useSearchContext } from '../components/domain/Search/SearchContext';
import useSearchBar from './useSearchBar';

const useMic = () => {
  const navigate = useNavigate();
  const { keywords, setKeywords } = useSearchContext();
  const { selectStationByKeywords, saveStation, resetKeywords } = useSearchBar();
  const { transcript, listening, resetTranscript } = useSpeechRecognition();

  const startListening = useCallback(() => {
    resetKeywords();
    SpeechRecognition.startListening({ language: 'ko-KR' });
    const timer = setTimeout(() => {
      SpeechRecognition.stopListening();
    }, 5000);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  const endListening = useCallback(() => {
    resetTranscript();
    setKeywords('');
    SpeechRecognition.stopListening();
  }, []);

  useEffect(() => {
    if (!listening && keywords) {
      const selectedStation = selectStationByKeywords(keywords);
      if (!selectedStation || !keywords) {
        alert('일치하는 역이 없습니다. 다시 한 번 말씀해주세요.');
        resetKeywords();
        return;
      }
      saveStation(selectedStation);
      navigate('/result');
    }
  }, [listening]);

  useEffect(() => {
    setKeywords(transcript.replace(/\s/g, ''));
  }, [transcript]);

  return { startListening, endListening, listening };
};

export default useMic;
