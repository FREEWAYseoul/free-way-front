/* eslint-disable react-hooks/exhaustive-deps */
import { useQuery } from '@tanstack/react-query';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { fetchSubways } from '../apis/subwayAPI';
import { SubwayProps } from '../types/subwayType';

export const KakaoMapContext = createContext<kakao.maps.Map | null>(null);

export const useMap = () => {
  const kakaoMap = useContext(KakaoMapContext);
  const { data: subwaysData, isLoading } = useQuery(['/api/subway'], fetchSubways, {
    staleTime: Infinity,
  });
  const [subways, setSubways] = useState([]);

  if (!kakaoMap) {
    throw new Error('map이 존재하지 않습니다.');
  }

  useMemo(() => {
    subways.forEach((item: SubwayProps) => {
      const maker = new kakao.maps.Marker({
        position: new kakao.maps.LatLng(item.lat, item.lng),
      });

      maker.setMap(kakaoMap);
    });
  }, [subways]);

  useEffect(() => {
    if (!isLoading) {
      setSubways(subwaysData?.data);
    }
  }, [isLoading]);

  return {
    kakaoMap,
    subways,
  };
};
