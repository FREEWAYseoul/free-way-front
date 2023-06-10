import MapView from '../map/MapView';
import { useResultContext } from './ResultContext';
import FacilitiesView from './FacilitiesView';
import MapDetailView from './MapDetailView';

const ContentsView = () => {
  const { station, activeTab, isDrag } = useResultContext();

  return (
    <>
      <MapView />
      {activeTab === '역사지도' && <MapDetailView src={station.stationImageUrl} isDrag={isDrag} />}
      {activeTab === '편의시설' && <FacilitiesView facilities={station.facilities} />}
    </>
  );
};

export default ContentsView;
