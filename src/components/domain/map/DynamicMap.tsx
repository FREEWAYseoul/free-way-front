import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { KakaoMapContext } from '../../../hooks/useMap';
import { CoordinateProps } from '../../../types/stationType';

interface DynamicMapProps {
  coordinate: CoordinateProps;
  children: React.ReactNode;
}

const DynamicMap = ({ coordinate, children }: DynamicMapProps) => {
  const [map, setMap] = useState<kakao.maps.Map | null>(null);
  const kakaoMapRef = useRef<HTMLDivElement>(null);

  const targetPoint = new kakao.maps.LatLng(coordinate.latitude, coordinate.longitude);
  const option = {
    center: targetPoint,
    minLevel: 0,
    maxLevel: 6,
    level: 3,
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
