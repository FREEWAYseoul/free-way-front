import { useCallback, useEffect } from 'react';

const useMic = () => {
  // const { keywords, setKeywords } = useSearchContext();
  // const { selectStationByKeywords, saveStation, resetKeywords } = useSearchBar();

  // const { listen, stop, listening } = useSpeechRecognition({
  //   onResult: (result: string) => {
  //     setKeywords(result.replace(/\s/g, ''));
  //   },
  //   onEnd: () => {
  //     const selectedStation = selectStationByKeywords(keywords);
  //     if (!selectedStation || !keywords) {
  //       alert('일치하는 역이 없습니다. 다시 한 번 말씀해주세요.');
  //       resetKeywords();
  //       return;
  //     }
  //     saveStation(selectedStation);
  //     navigate('/result');
  //   },
  // });

  // const { transcript, listening } = useSpeechRecognition();

  const startListening = useCallback(() => {
    // resetKeywords();
    // SpeechRecognition.startListening({ language: 'ko-KR' });
    // const timer = setTimeout(() => {
    //   SpeechRecognition.stopListening();
    // }, 3000);
    // return () => {
    //   clearTimeout(timer);
    // };
  }, []);

  const endListening = useCallback(() => {
    // SpeechRecognition.stopListening();
  }, []);

  const isListening = useCallback((): boolean => {
    // return listening;
    return false;
  }, []);

  useEffect(() => {
    // console.log(transcript);
  }, []);

  return { startListening, endListening, isListening };
};

export default useMic;
