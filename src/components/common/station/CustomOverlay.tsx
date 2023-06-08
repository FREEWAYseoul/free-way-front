import { useEffect, useRef } from 'react';
import { CoordinateProps } from '../../../types/stationType';
import { useMap } from '../../../hooks/useMap';

interface CustomOverlayProps {
  coordinate: CoordinateProps;
  onClick?: () => void;
  children: React.ReactNode;
}

const CustomOverlay = ({ coordinate, onClick, children }: CustomOverlayProps) => {
  const { kakaoMap } = useMap();

  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const markerPosition = new kakao.maps.LatLng(coordinate.latitude, coordinate.longitude);

    const marker = new kakao.maps.CustomOverlay({
      position: markerPosition,
      clickable: true,
      content: overlayRef?.current || '<div></div>',
    });

    marker.setMap(kakaoMap);

    return () => {
      marker.setMap(null);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div ref={overlayRef} onClick={onClick}>
        {children}
      </div>
    </div>
  );
};

export default CustomOverlay;
