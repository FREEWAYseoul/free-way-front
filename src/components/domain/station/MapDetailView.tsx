import styled from 'styled-components';

const MapDetailView = () => {
  return (
    <StyledMapDetailView>
      <StyledImageWrapper>
        <img
          src='http://data.seoul.go.kr/contents/stn_img/image_5_19.jpg'
          alt='내부지도'
          width={'100%'}
        />
      </StyledImageWrapper>
    </StyledMapDetailView>
  );
};

export default MapDetailView;

const StyledMapDetailView = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: #f2f4f6;
  z-index: 99;
`;

const StyledImageWrapper = styled.div`
  position: absolute;
  top: 10%;
  overflow: auto;
  height: 60%;

  & > img {
    width: 220%;
  }
`;
