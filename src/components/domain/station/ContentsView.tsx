import MapView from '../map/MapView';
import { useResultContext } from './ResultContext';
import FacilitiesView from './FacilitiesView';
import MapDetailView from './MapDetailView';

const ContentsView = () => {
  const { station, activeTab } = useResultContext();

  return (
    <>
      <MapView />
      {activeTab === '역사 지도' && <MapDetailView src={station.stationImageUrl} />}
      {activeTab === '편의시설' && <FacilitiesView facilities={station.facilities} />}
    </>
  );
};

export default ContentsView;
