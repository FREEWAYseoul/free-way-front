import { useEffect, useRef } from 'react';
import { PositionProps } from '../../../types/stationType';
import { useMap } from '../../../hooks/useMap';

interface CustomOverlayProps {
  position: PositionProps;
  onClick: () => void;
  children: React.ReactNode;
}

const CustomOverlay = ({ position, onClick, children }: CustomOverlayProps) => {
  const { kakaoMap } = useMap();

  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const markerPosition = new kakao.maps.LatLng(position.lat, position.lng);

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
