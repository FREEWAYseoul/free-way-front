/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useMap } from '../../../hooks/useMap';
import { useResultContext } from '../station/ResultContext';
import CustomOverlay from '../../common/station/CustomOverlay';
import StationMarker from '../../common/station/StationMarker';

const MapMarkerController = () => {
  const { station, handleShowInfo } = useResultContext();
  const { kakaoMap, moveMap, markers, stationMarkers, setStationMarker } = useMap();

  /**
   * station marker move
   */
  const moveStation = async (lat: number, lng: number) => {
    const moveLatLon = new kakao.maps.LatLng(lat, lng);
    kakaoMap.setLevel(2);
    kakaoMap.panTo(moveLatLon);
  };

  useEffect(() => {
    moveStation(station.position.lat, station.position.lng);
  }, [station]);

  useEffect(() => {
    kakao.maps.event.addListener(kakaoMap, 'tilesloaded', setStationMarker);
    kakao.maps.event.addListener(kakaoMap, 'tilesloaded', moveMap);

    return () => {
      kakao.maps.event.removeListener(kakaoMap, 'tilesloaded', setStationMarker);
      kakao.maps.event.removeListener(kakaoMap, 'tilesloaded', moveMap);
    };
  }, [markers, stationMarkers]);

  useEffect(() => {
    kakao.maps.event.addListener(kakaoMap, 'drag', () => handleShowInfo(true));
    return () => {
      kakao.maps.event.addListener(kakaoMap, 'drag', () => handleShowInfo(true));
    };
  }, []);

  return (
    <>
      {stationMarkers.length > 0 && (
        <div>
          {stationMarkers.map((item, idx) => (
            <CustomOverlay
              key={item.stationName + idx}
              position={item.position}
              onClick={() => moveStation(item.position.lat, item.position.lng)}
            >
              <StationMarker info={item} isActive={station.stationId === item.stationId} />
            </CustomOverlay>
          ))}
        </div>
      )}
    </>
  );
};

export default MapMarkerController;
