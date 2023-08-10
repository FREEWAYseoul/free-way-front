import { useResultContext } from './ResultContext';
import FacilitiesView from './FacilitiesView';
import MapDetailView from './MapDetailView';
import Mapview from '../naverMap/Mapview';

const ContentsView = () => {
  const { station, activeTab, tabPosition } = useResultContext();

  return (
    <>
      <Mapview />
      {activeTab === '역사지도' && (
        <MapDetailView src={station.stationImageUrl} tabPosition={tabPosition} />
      )}
      {activeTab === '편의시설' && <FacilitiesView facilities={station.facilities} />}
    </>
  );
};

export default ContentsView;
