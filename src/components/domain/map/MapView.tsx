import DynamicMap from './DynamicMap';
import KakaoMapScriptLoader from './KakaoMapScriptLoader';
import MapMarkerController from './MapMarkerController';
import { useResultContext } from '../station/ResultContext';

const MapView = () => {
  const { station } = useResultContext();

  return (
    <KakaoMapScriptLoader>
      <DynamicMap position={station.position}>
        <MapMarkerController />
      </DynamicMap>
    </KakaoMapScriptLoader>
  );
};

export default MapView;
