import { useEffect } from 'react';
import { CoordinateProps } from '../../../types/stationType';
import { useMap } from '../../../hooks/useMap';
import ReactDOMServer from 'react-dom/server';

interface CustomOverlayProps {
  coordinate: CoordinateProps;
  handleOnClick?: () => void;
  children: React.ReactElement;
  zIndex?: number;
}

const CustomOverlay = ({ coordinate, handleOnClick, children, zIndex }: CustomOverlayProps) => {
  const { naverMap } = useMap();
  const componentHTML = ReactDOMServer.renderToString(children);

  useEffect(() => {
    const markerPosition = new naver.maps.LatLng(coordinate.latitude, coordinate.longitude);

    const marker = new naver.maps.Marker({
      position: markerPosition,
      map: naverMap,
      clickable: true,
      icon: {
        content: `${componentHTML}`,
        anchor: zIndex ? new naver.maps.Point(0, 35) : new naver.maps.Point(0, 50),
      },
      zIndex: zIndex,
    });

    if (handleOnClick) {
      naver.maps.Event.addListener(marker, 'click', handleOnClick);
    }

    return () => {
      marker.setMap(null);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <></>;
};

export default CustomOverlay;
