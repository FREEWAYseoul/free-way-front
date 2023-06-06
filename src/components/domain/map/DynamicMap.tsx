import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { KakaoMapContext } from '../../../hooks/useMap';

interface DynamicMapProps {
  position: {
    lat: number;
    lng: number;
  };
  children: React.ReactNode;
}

const DynamicMap = ({ position, children }: DynamicMapProps) => {
  const [map, setMap] = useState<kakao.maps.Map | null>(null);
  const kakaoMapRef = useRef<HTMLDivElement>(null);

  const targetPoint = new kakao.maps.LatLng(position.lat, position.lng);
  const option = {
    center: targetPoint,
    minLevel: 0,
    maxLevel: 7,
    level: 2,
  };

  useEffect(() => {
    if (!kakaoMapRef.current) return;
    const map = new window.kakao.maps.Map(kakaoMapRef.current, option);

    setMap(map);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <MapWrapper>
      <StyledMap ref={kakaoMapRef} id='map' style={{ width: '100%', height: '100%' }}>
        {map && <KakaoMapContext.Provider value={map}>{children}</KakaoMapContext.Provider>}
      </StyledMap>
    </MapWrapper>
  );
};

const MapWrapper = styled.div`
  flex: 1;
  width: 100%;
  min-height: 300px;
`;

const StyledMap = styled.div`
  position: relative;
`;

export default DynamicMap;
