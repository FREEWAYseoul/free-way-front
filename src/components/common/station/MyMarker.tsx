import { useEffect } from 'react';
import { useMap } from '../../../hooks/useMap';
import MyMarkerIcon from '../../../assets/icons/myMarker.png';

const MyMarker = () => {
  const { kakaoMap, myMarker, setMyMarker } = useMap();

  useEffect(() => {
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const currentPosition = new kakao.maps.LatLng(latitude, longitude);

        console.log(currentPosition, myMarker);

        if (!myMarker) {
          // 마커 생성
          console.log('생성');
          const marker = new kakao.maps.CustomOverlay({
            position: currentPosition,
            content: `<img src='${MyMarkerIcon}' alt="내 위치"/>`,
          });
          marker.setMap(kakaoMap);
          setMyMarker(marker);
        } else {
          console.log('이동');
          myMarker.setPosition(currentPosition);
        }
      },
      (error) => {
        console.error(error);
      }
    );

    return () => {
      myMarker?.setMap(null);
      setMyMarker(null);
      navigator.geolocation.clearWatch(watchId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <></>;
};

export default MyMarker;
