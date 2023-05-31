import DynamicMap from './DynamicMap';
import KakaoMapScriptLoader from './KakaoMapScriptLoader';
import MapMarkerController from './MapMarkerController';

const MapPreview = () => {
  const title = '쌍문';
  const position = { lat: 37.65323939675669, lng: 127.04766306716449 };

  return (
    <KakaoMapScriptLoader>
      <DynamicMap position={position}>
        <MapMarkerController title={title} />
      </DynamicMap>
    </KakaoMapScriptLoader>
  );
};

export default MapPreview;
