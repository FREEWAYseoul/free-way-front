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
  const { naverMap, stationMarkers, elevatorMarkers, setStationMarker, trackingMyPosition } =
    useMap();

  /**
   * station marker move
   */
  const moveStation = async (lat: number, lng: number) => {
    const moveLatLon = new naver.maps.LatLng(lat, lng);
    naverMap.setZoom(17);
    naverMap.panTo(moveLatLon);
    handleShowController(true);
  };

  useEffect(() => {
    const zoomChangeListener = naver.maps.Event.addListener(
      naverMap,
      'zoom_changed',
      setStationMarker
    );
    const boundsChangeListener = naver.maps.Event.addListener(
      naverMap,
      'bounds_changed',
      setStationMarker
    );

    return () => {
      naver.maps.Event.removeListener([zoomChangeListener, boundsChangeListener]);
    };
  }, [stationMarkers]);

  useEffect(() => {
    const clickListener = naver.maps.Event.addListener(naverMap, 'click', () =>
      handleShowController(!isShow)
    );

    return () => {
      naver.maps.Event.removeListener(clickListener);
    };
  }, [isShow]);

  useEffect(() => {
    moveStation(station.stationCoordinate.latitude, station.stationCoordinate.longitude);
  }, [station]);

  useEffect(() => {
    const dragListener = naver.maps.Event.addListener(naverMap, 'drag', () =>
      handleShowInfo(false)
    );
    return () => {
      naver.maps.Event.removeListener(dragListener);
    };
  }, []);

  return (
    <>
      <StyledMyMarker onClick={trackingMyPosition}>
        <img src={TargetIcon} />
      </StyledMyMarker>
      {/* 지하철 타이틀 마커 */}
      {stationMarkers.length > 0 && naverMap.getZoom() > 15 && (
        <>
          {stationMarkers.map((item, idx) => (
            <CustomOverlay
              key={item.stationName + idx}
              coordinate={item.coordinate}
              handleOnClick={() => handleChangeStation(item.stationId)}
              zIndex={10}
            >
              <StationMarker
                info={item}
                isActive={station.stationName === item.stationName}
                level={naverMap.getZoom()}
              />
            </CustomOverlay>
          ))}
        </>
      )}

      {/* 지하철 마커 */}
      {stationMarkers.length > 0 && naverMap.getZoom() < 16 && (
        <>
          {stationMarkers.map((item, idx) => (
            <CustomOverlay
              key={item.stationName + idx}
              coordinate={item.coordinate}
              handleOnClick={() => handleChangeStation(item.stationId)}
              zIndex={10}
            >
              <StationMarker
                info={item}
                isActive={station.stationName === item.stationName}
                level={naverMap.getZoom()}
              />
            </CustomOverlay>
          ))}
        </>
      )}

      {/* 엘리베이터 마커 */}
      {elevatorMarkers.length > 0 && naverMap.getZoom() > 15 && (
        <>
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
        </>
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
