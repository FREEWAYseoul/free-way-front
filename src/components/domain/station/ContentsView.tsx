import MapView from '../map/MapView';
import { useResultContext } from './ResultContext';
import ConvenienceView from './ConvenienceView';
import MapDetailView from './MapDetailView';

const ContentsView = () => {
  const { activeTab } = useResultContext();

  return (
    <>
      <MapView />
      {activeTab === '역사 지도' && <MapDetailView />}
      {activeTab === '편의시설' && <ConvenienceView />}
    </>
  );
};

export default ContentsView;
