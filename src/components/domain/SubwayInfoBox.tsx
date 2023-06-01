import styled from 'styled-components';
import SubwayMap from './SubwayMap';
import SubwayButtonGroup from './SubwayButtonGroup';

const SubwayInfoBox = () => {
  return (
    <StyledSubwayInfoBox>
      <SubwayMap />
      <SubwayButtonGroup />
    </StyledSubwayInfoBox>
  );
};

export default SubwayInfoBox;

const StyledSubwayInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  padding: 14px 16px 62px;
  background-color: #fff;
`;
