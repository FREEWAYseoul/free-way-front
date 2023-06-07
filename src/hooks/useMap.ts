/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useContext, useEffect, useState } from 'react';
import { fetchElevators, fetchSearchStations } from '../apis/stationAPI';
import { ElevatorProps, StationProps } from '../types/stationType';
import { useQuery } from '@tanstack/react-query';
import { useResultContext } from '../components/domain/station/ResultContext';

export const KakaoMapContext = createContext<kakao.maps.Map | null>(null);

export const useMap = () => {
  const { station } = useResultContext();
  const kakaoMap = useContext(KakaoMapContext);
  const { data: subwaysData, isLoading } = useQuery(['api/stations'], fetchSearchStations, {
    staleTime: Infinity,
    select: (res) => {
      return res?.data || [];
    },
  });
  const { data: elevatorData, isLoading: elevatorLoading } = useQuery(
    ['api/elevators'],
    fetchElevators,
    {
      staleTime: Infinity,
      select: (res) => {
        return res?.data || [];
      },
    }
  );
  const [myMarker, setMyMarker] = useState<kakao.maps.CustomOverlay | null>(null);
  const [stationMarkers, setStationMarkers] = useState<StationProps[]>([]);
  const [elevatorMarkers, setElevatorMarkers] = useState<ElevatorProps[]>([]);

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
   * 지도 영역 이동 시 지하철
   */
  const setStationMarker = () => {
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
      setStationMarkers(filterSubways);
    }
  };
  //   // 마커 초기화
  //   markers.forEach((marker) => {
  //     marker.setMap(null);
  //   });
  //   const coordinate = mapAreaCoordinate();
  //   const res = await fetchElevators(coordinate);
  //   if (res) {
  //     const imageSrc = ElevatorImg;
  //     const imageSize = new kakao.maps.Size(64, 69);
  //     const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);
  //     const newMarkers = res.data.map((item: ElevatorProps) => {
  //       const markerPosition = new kakao.maps.LatLng(item.lat, item.lng);
  //       const marker = new kakao.maps.Marker({
  //         position: markerPosition,
  //         image: markerImage,
  //       });
  //       marker.setMap(kakaoMap);
  //       return marker;
  //     });
  //     setMarkers(newMarkers);
  //   }
  // }, [markers]);

  useEffect(() => {
    if (!isLoading) {
      setStationMarker();
    }
  }, [isLoading]);

  useEffect(() => {
    if (!elevatorLoading) {
      setElevatorMarkers(
        elevatorData.filter((item: ElevatorProps) => item.title === station.stationName)
      );
    }
  }, [elevatorLoading, station]);

  return {
    kakaoMap,
    stationMarkers,
    setStationMarker,
    elevatorMarkers,
    myMarker,
    setMyMarker,
  };
};
