/* eslint-disable react-hooks/exhaustive-deps */
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';

export const KakaoMapContext = createContext<kakao.maps.Map | null>(null);

export interface SubwayProps {
  title: string;
  lat: number;
  lng: number;
}

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

const fetchSubways = async () => {
  const res = await axios({
    method: 'get',
    url: '/api/subways',
  });

  return res;
};
