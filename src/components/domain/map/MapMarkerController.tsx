/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useMap } from '../../../hooks/useMap';
import { useResultContext } from '../station/ResultContext';
import CustomOverlay from '../../common/station/CustomOverlay';
import StationMarker from '../../common/station/StationMarker';
import ElevatorMarker from '../../common/station/ElevatorMarker';
import TargetIcon from '../../../assets/icons/target.svg';
import styled from 'styled-components';

const MapMarkerController = () => {
  const { station, handleShowInfo, handleChangeStation, isShow, handleShowController } =
    useResultContext();
  const { kakaoMap, stationMarkers, elevatorMarkers, setStationMarker, myMarker, refreshMyMarker } =
    useMap();

  /**
   * station marker move
   */
  const moveStation = async (lat: number, lng: number) => {
    const moveLatLon = new kakao.maps.LatLng(lat, lng);
    kakaoMap.setLevel(3);
    kakaoMap.panTo(moveLatLon);
    handleShowController(true);
  };

  useEffect(() => {
    kakao.maps.event.addListener(kakaoMap, 'tilesloaded', setStationMarker);

    return () => {
      kakao.maps.event.removeListener(kakaoMap, 'tilesloaded', setStationMarker);
    };
  }, [stationMarkers]);

  useEffect(() => {
    kakao.maps.event.addListener(kakaoMap, 'click', () => handleShowController(!isShow));
    return () => {
      kakao.maps.event.addListener(kakaoMap, 'click', () => handleShowController(!isShow));
    };
  }, [isShow]);

  useEffect(() => {
    moveStation(station.stationCoordinate.latitude, station.stationCoordinate.longitude);
  }, [station]);

  useEffect(() => {
    kakao.maps.event.addListener(kakaoMap, 'drag', () => handleShowInfo(false));
    return () => {
      myMarker?.setMap(null);
      kakao.maps.event.addListener(kakaoMap, 'drag', () => handleShowInfo(false));
    };
  }, []);

  // useEffect(() => {
  //   let watchId = 0;
  //   if (isMyPostion) {
  //     watchId = navigator.geolocation.watchPosition((position) => {
  //       const { latitude, longitude } = position.coords;
  //       const currentPosition = new kakao.maps.LatLng(latitude, longitude);

  //       if (!myMarker) {
  //         // 마커 생성
  //         const marker = new kakao.maps.CustomOverlay({
  //           position: currentPosition,
  //           content: `<img src='${MyMarkerIcon}' alt="내 위치"/>`,
  //         });
  //         marker.setMap(kakaoMap);
  //         setMyMarker(marker);
  //         setIsStartMyMarker(true);
  //       } else if (isStartMyMarker) {
  //         myMarker?.setPosition(currentPosition);
  //       }
  //     });

  //     return () => {
  //       myMarker?.setMap(null);
  //       navigator.geolocation.clearWatch(watchId);
  //     };
  //   }
  // }, [isMyPostion, myMarker, isStartMyMarker]);

  return (
    <>
      <StyledMyMarker onClick={refreshMyMarker}>
        <img src={TargetIcon} />
      </StyledMyMarker>
      {stationMarkers.length > 0 && (
        <div>
          {stationMarkers.map((item, idx) => (
            <CustomOverlay
              key={item.stationName + idx}
              coordinate={item.coordinate}
              onClick={() => handleChangeStation(item.stationId)}
            >
              <StationMarker
                info={item}
                isActive={station.stationName === item.stationName}
                level={kakaoMap.getLevel()}
              />
            </CustomOverlay>
          ))}
        </div>
      )}
      {elevatorMarkers.length > 0 && kakaoMap.getLevel() < 5 && (
        <div>
          {elevatorMarkers.map((item) => (
            <CustomOverlay
              key={item.elevatorId}
              coordinate={{
                latitude: item.elevatorCoordinate.latitude,
                longitude: item.elevatorCoordinate.longitude,
              }}
            >
              <ElevatorMarker text={item.exitNumber} status={item.elevatorStatus} />
            </CustomOverlay>
          ))}
        </div>
      )}
    </>
  );
};

export default MapMarkerController;

const StyledMyMarker = styled.div`
  cursor: pointer;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  left: 17px;
  bottom: 260px;
  width: 44px;
  height: 44px;
  border-radius: 7px;
  border: 0.833333px solid #f3f3f3;
  background-color: #fff;
  box-shadow: 0px 0px 13.3333px rgba(68, 81, 69, 0.2);
  z-index: 10;
`;
