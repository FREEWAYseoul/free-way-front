/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useContext, useEffect, useState } from 'react';
import { ElevatorProps, StationProps } from '../types/stationType';
import { useResultContext } from '../components/domain/station/ResultContext';
import { useStation } from '../api/stations';
import MyMarkerIcon from '../assets/icons/myMarker.png';

export const NaverMapContext = createContext<naver.maps.Map | null>(null);

// eslint-disable-next-line react-refresh/only-export-components
export const useMap = () => {
  const { station } = useResultContext();
  const naverMap = useContext(NaverMapContext);
  const { data: stationData, isLoading } = useStation();
  const [myMarker, setMyMarker] = useState<naver.maps.Marker | null>(null);
  const [stationMarkers, setStationMarkers] = useState<StationProps[]>([]);
  const [elevatorMarkers, setElevatorMarkers] = useState<ElevatorProps[]>(station.elevators);

  if (!naverMap) {
    throw new Error('map이 존재하지 않습니다.');
  }

  /**
   * 지도 영역 좌표
   */
  const mapAreaCoordinate = () => {
    const bounds = naverMap.getBounds();
    return {
      sw: {
        latitude: bounds.minY(),
        longitude: bounds.minX(),
      },
      ne: {
        latitude: bounds.maxY(),
        longitude: bounds.maxX(),
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

  // 내 위치 마커
  const refreshMyMarker = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      const currentPosition = new naver.maps.LatLng(latitude, longitude);
      myMarker?.setMap(null);
      const marker = new naver.maps.Marker({
        position: currentPosition,
        map: naverMap,
        icon: {
          content: `<div><img src='${MyMarkerIcon}' alt="내 위치"/></div>`,
          anchor: new naver.maps.Point(40, 40),
        },
      });
      setMyMarker(marker);

      naverMap.setCenter(currentPosition);
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
    // if (myMarker) {
    //   naverMap.setCenter(
    //     new naver.maps.LatLng(
    //       Number(myMarker?.getPosition().getLat()),
    //       Number(myMarker?.getPosition().getLng())
    //     )
    //   );
    // }
  }, [myMarker]);

  return {
    naverMap,
    stationMarkers,
    setStationMarker,
    elevatorMarkers,
    myMarker,
    refreshMyMarker,
  };
};
