import styled from 'styled-components';

const MapDetailView = ({ src }: { src: string }) => {
  return (
    <StyledMapDetailView>
      <StyledImageWrapper>
        <img src={src} alt='내부지도' width={'100%'} />
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
  z-index: 50;
`;

const StyledImageWrapper = styled.div`
  position: absolute;
  top: 100px;
  overflow: auto;
  height: 40%;

  -ms-overflow-style: none; /* 인터넷 익스플로러 */
  scrollbar-width: none; /* 파이어폭스 */

  &::-webkit-scrollbar {
    display: none; /* 크롬, 사파리, 오페라, 엣지 */
  }

  & > img {
    width: 220%;
  }
`;
