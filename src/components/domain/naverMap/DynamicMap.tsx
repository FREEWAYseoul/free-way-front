import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { CoordinateProps } from '../../../types/stationType';
import { NaverMapContext } from '../../../hooks/useMap';

interface DynamicMapProps {
  children: React.ReactNode;
  coordinate: CoordinateProps;
}

const DynamicMap = ({ children, coordinate }: DynamicMapProps) => {
  const [map, setMap] = useState<naver.maps.Map | null>(null);
  const naverMapRef = useRef<HTMLDivElement>(null);

  const targetPoint = new naver.maps.LatLng(coordinate.latitude, coordinate.longitude);
  const option = {
    center: targetPoint,
    zoom: 17,
    minZoom: 14, //지도의 최소 줌 레벨
  };
  useEffect(() => {
    const map = new naver.maps.Map('map', option);

    setMap(map);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <StyledMap ref={naverMapRef} id='map' style={{ width: '100%', height: '100%' }}>
      {map && <NaverMapContext.Provider value={map}>{children}</NaverMapContext.Provider>}
    </StyledMap>
  );
};

const StyledMap = styled.div`
  position: relative;
`;

export default DynamicMap;
