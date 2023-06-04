/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useMap } from '../../../hooks/useMap';
import { useResultContext } from '../station/ResultContext';

const MapMarkerController = () => {
  const { station, handleShowInfo } = useResultContext();
  const { kakaoMap, moveMap, setSubwaysMarker, markers } = useMap();

  /**
   * station marker move
   */
  const moveStation = async (lat: number, lng: number) => {
    const moveLatLon = new kakao.maps.LatLng(lat, lng);
    kakaoMap.setLevel(4);
    kakaoMap.panTo(moveLatLon);
  };

  useEffect(() => {
    moveStation(station.position.lat, station.position.lng);
  }, [station]);

  useEffect(() => {
    kakao.maps.event.addListener(kakaoMap, 'tilesloaded', moveMap);
    kakao.maps.event.addListener(kakaoMap, 'tilesloaded', setSubwaysMarker);

    return () => {
      kakao.maps.event.removeListener(kakaoMap, 'tilesloaded', moveMap);
      kakao.maps.event.removeListener(kakaoMap, 'tilesloaded', setSubwaysMarker);
    };
  }, [markers]);

  useEffect(() => {
    kakao.maps.event.addListener(kakaoMap, 'drag', () => handleShowInfo(true));
    return () => {
      kakao.maps.event.addListener(kakaoMap, 'drag', () => handleShowInfo(true));
    };
  }, []);

  return <></>;
};

export default MapMarkerController;
