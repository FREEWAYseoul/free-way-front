import MapView from '../map/MapView';
import { useResultContext } from './ResultContext';
import FacilitiesView from './FacilitiesView';
import MapDetailView from './MapDetailView';

const ContentsView = () => {
  const { station, activeTab, isDrag } = useResultContext();

  const src = station.stationImageUrl.replace('http', 'https');

  return (
    <>
      <MapView />
      {activeTab === '역사지도' && <MapDetailView src={src} isDrag={isDrag} />}
      {activeTab === '편의시설' && <FacilitiesView facilities={station.facilities} />}
    </>
  );
};

export default ContentsView;
