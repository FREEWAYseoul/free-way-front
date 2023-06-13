import MapView from '../map/MapView';
import { useResultContext } from './ResultContext';
import FacilitiesView from './FacilitiesView';
import MapDetailView from './MapDetailView';

const ContentsView = () => {
  const { station, activeTab, tabPosition } = useResultContext();

  return (
    <>
      <MapView />
      {activeTab === '역사지도' && (
        <MapDetailView src={station.stationImageUrl} tabPosition={tabPosition} />
      )}
      {activeTab === '편의시설' && <FacilitiesView facilities={station.facilities} />}
    </>
  );
};

export default ContentsView;
