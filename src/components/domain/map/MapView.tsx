import DynamicMap from './DynamicMap';
import MapMarkerController from './MapMarkerController';
import { useResultContext } from '../station/ResultContext';

const MapView = () => {
  const { station } = useResultContext();

  return (
    <DynamicMap coordinate={station.stationCoordinate}>
      <MapMarkerController />
    </DynamicMap>
  );
};

export default MapView;
