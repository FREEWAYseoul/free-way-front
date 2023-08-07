import styled from 'styled-components';
import DynamicMap from './DynamicMap';
import { useResultContext } from '../station/ResultContext';
import MapMarkerController from './MapMarkerController';

const Mapview = () => {
  const { station } = useResultContext();

  return (
    <MapWrapper>
      <DynamicMap coordinate={station.stationCoordinate}>
        <MapMarkerController />
      </DynamicMap>
    </MapWrapper>
  );
};

export default Mapview;

const MapWrapper = styled.div`
  flex: 1;
  width: 100%;
  min-height: 300px;
  z-index: 0;
`;
