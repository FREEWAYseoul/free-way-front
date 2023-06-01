import SubwayInfoBox from '../components/domain/SubwayInfoBox';
import MapPreview from '../components/domain/map/MapPreview';

const Result = () => {
  return (
    <div style={{ width: '100%' }}>
      <MapPreview />
      <SubwayInfoBox />
    </div>
  );
};

export default Result;
