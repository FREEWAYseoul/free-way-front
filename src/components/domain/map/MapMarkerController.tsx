/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useMap } from '../../../hooks/useMap';
import { useResultContext } from '../station/ResultContext';
import CustomOverlay from '../../common/station/CustomOverlay';
import StationMarker from '../../common/station/StationMarker';
import ElevatorMarker from '../../common/station/ElevatorMarker';
import MyMarkerIcon from '../../../assets/icons/myMarker.png';
import TargetIcon from '../../../assets/icons/target.svg';
import styled from 'styled-components';

const MapMarkerController = () => {
  const { station, handleShowInfo, handleChangeStation, isShow, handleShowController } =
    useResultContext();
  const { kakaoMap, stationMarkers, elevatorMarkers, setStationMarker, myMarker, setMyMarker } =
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
    kakao.maps.event.addListener(kakaoMap, 'drag', () => handleShowInfo(true));

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const currentPosition = new kakao.maps.LatLng(latitude, longitude);

        if (!myMarker) {
          // 마커 생성
          const newMarker = new kakao.maps.CustomOverlay({
            position: currentPosition,
            content: `<img src="${MyMarkerIcon}" />`,
          });
          newMarker.setMap(kakaoMap);
          setMyMarker(newMarker);
        } else {
          myMarker.setPosition(currentPosition);
        }
      },
      (error) => {
        console.error(error);
      }
    );

    return () => {
      myMarker?.setMap(null);
      kakao.maps.event.addListener(kakaoMap, 'drag', () => handleShowInfo(true));
      navigator.geolocation.clearWatch(watchId);
    };
  }, [myMarker]);

  return (
    <>
      <StyledMyMarker
        onClick={() =>
          kakaoMap.setCenter(
            new kakao.maps.LatLng(
              Number(myMarker?.getPosition().getLat()),
              Number(myMarker?.getPosition().getLng())
            )
          )
        }
      >
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
  width: 37px;
  height: 37px;
  border-radius: 7px;
  border: 0.833333px solid #f3f3f3;
  background-color: #fff;
  box-shadow: 0px 0px 13.3333px rgba(68, 81, 69, 0.2);
  z-index: 10;
`;
