/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useContext, useEffect, useState } from 'react';
import { ElevatorProps, StationProps } from '../types/stationType';
import { useResultContext } from '../components/domain/station/ResultContext';
import { useStationInfo } from '../api/stations';
import MyMarkerIcon from '../assets/icons/myMarker.png';

export const KakaoMapContext = createContext<kakao.maps.Map | null>(null);

// eslint-disable-next-line react-refresh/only-export-components
export const useMap = () => {
  const { station } = useResultContext();
  const kakaoMap = useContext(KakaoMapContext);
  const { data: stationData, isLoading } = useStationInfo();
  const [myMarker, setMyMarker] = useState<kakao.maps.CustomOverlay | null>(null);
  const [stationMarkers, setStationMarkers] = useState<StationProps[]>([]);
  const [elevatorMarkers, setElevatorMarkers] = useState<ElevatorProps[]>(station.elevators);

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
        latitude: sw.getLat(),
        longitude: sw.getLng(),
      },
      ne: {
        latitude: ne.getLat(),
        longitude: ne.getLng(),
      },
    };
  };

  /**
   * 지도 영역 이동 시 지하철
   */
  const setStationMarker = () => {
    const mapCoordinate = mapAreaCoordinate();

    if (stationData) {
      const filterSubways = stationData.filter((item: StationProps) => {
        const { coordinate } = item;
        if (
          mapCoordinate.sw.latitude <= coordinate.latitude &&
          coordinate.latitude <= mapCoordinate.ne.latitude &&
          mapCoordinate.sw.longitude <= coordinate.longitude &&
          coordinate.longitude <= mapCoordinate.ne.longitude
        )
          return item;
      });
      setStationMarkers(filterSubways);
    }
  };

  const refreshMyMarker = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      const currentPosition = new kakao.maps.LatLng(latitude, longitude);
      myMarker?.setMap(null);
      const marker = new kakao.maps.CustomOverlay({
        position: currentPosition,
        content: `<img src='${MyMarkerIcon}' alt="내 위치"/>`,
      });
      marker.setMap(kakaoMap);
      setMyMarker(marker);

      kakaoMap.setCenter(
        new kakao.maps.LatLng(
          Number(myMarker?.getPosition().getLat()),
          Number(myMarker?.getPosition().getLng())
        )
      );
    });
  };

  useEffect(() => {
    if (!isLoading) {
      setStationMarker();
    }
  }, [isLoading]);

  useEffect(() => {
    setElevatorMarkers(station.elevators);
  }, [station]);

  useEffect(() => {
    if (myMarker) {
      kakaoMap.setCenter(
        new kakao.maps.LatLng(
          Number(myMarker?.getPosition().getLat()),
          Number(myMarker?.getPosition().getLng())
        )
      );
    }
  }, [myMarker]);

  return {
    kakaoMap,
    stationMarkers,
    setStationMarker,
    elevatorMarkers,
    myMarker,
    refreshMyMarker,
  };
};
