/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { fetchElevators, fetchSearchStations } from '../apis/stationAPI';
import { ElevatorProps, StationProps } from '../types/stationType';
import ElevatorImg from '../assets/elevator.svg';
import { useQuery } from '@tanstack/react-query';
import { useResultContext } from '../components/domain/station/ResultContext';

export const KakaoMapContext = createContext<kakao.maps.Map | null>(null);

export const useMap = () => {
  const kakaoMap = useContext(KakaoMapContext);
  const { station, setLocalStations, handleChangeStation } = useResultContext();
  const { data: subwaysData, isLoading } = useQuery(['api/stations'], fetchSearchStations, {
    staleTime: Infinity,
    select: (res) => {
      return res?.data || [];
    },
  });
  const [stationMarkers, setStationMarkers] = useState<kakao.maps.Marker[]>([]);
  const [markers, setMarkers] = useState<kakao.maps.Marker[]>([]);

  if (!kakaoMap) {
    throw new Error('map이 존재하지 않습니다.');
  }

  /**
   * 지도 영역 좌표
   */
  const mapAreaCoordinate = () => {
    const sw = kakaoMap.getBounds().getSouthWest();
    const ne = kakaoMap.getBounds().getNorthEast();
    return {
      sw: {
        lat: sw.getLat(),
        lng: sw.getLng(),
      },
      ne: {
        lat: ne.getLat(),
        lng: ne.getLng(),
      },
    };
  };

  /**
   * 지도 영역 이동 시 엘리베이터 마커 렌더
   */
  const moveMap = useCallback(async () => {
    // 마커 초기화
    markers.forEach((marker) => {
      marker.setMap(null);
    });

    const coordinate = mapAreaCoordinate();
    const res = await fetchElevators(coordinate);

    if (res) {
      const imageSrc = ElevatorImg;
      const imageSize = new kakao.maps.Size(64, 69);
      const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

      const newMarkers = res.data.map((item: ElevatorProps) => {
        const markerPosition = new kakao.maps.LatLng(item.lat, item.lng);
        const marker = new kakao.maps.Marker({
          position: markerPosition,
          image: markerImage,
        });
        marker.setMap(kakaoMap);
        return marker;
      });
      setMarkers(newMarkers);
    }
  }, [markers]);

  /**
   * 지도 영역 이동 시 지하철 마커 렌더
   */
  const setSubwaysMarker = () => {
    // 마커 초기화
    stationMarkers.forEach((marker) => {
      marker.setMap(null);
    });

    const coordinate = mapAreaCoordinate();

    if (subwaysData) {
      const filterSubways = subwaysData.filter((item: StationProps) => {
        const { position } = item;
        if (
          coordinate.sw.lat <= position.lat &&
          position.lat <= coordinate.ne.lat &&
          coordinate.sw.lng <= position.lng &&
          position.lng <= coordinate.ne.lng
        )
          return item;
      });

      // 현재 영역에 지하철 목록
      setLocalStations(
        filterSubways.filter((item: StationProps) => item.stationId != station.stationId)
      );

      const newMarkers = filterSubways.map((item: StationProps) => {
        const { position } = item;
        const markerPosition = new kakao.maps.LatLng(position.lat, position.lng);
        const marker = new kakao.maps.Marker({
          position: markerPosition,
          clickable: true,
        });
        marker.setMap(kakaoMap);
        kakao.maps.event.addListener(marker, 'click', () => handleChangeStation(item));

        return marker;
      });
      setStationMarkers(newMarkers);
    }
  };

  useEffect(() => {
    if (!isLoading) {
      setSubwaysMarker();
    }
  }, [isLoading]);

  return {
    kakaoMap,
    moveMap,
    setSubwaysMarker,
    markers,
  };
};
