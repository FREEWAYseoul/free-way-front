import styled from 'styled-components';
import NotFoundIcon from '../../../assets/icons/not-found.svg';

const MapDetailView = ({ src }: { src: string }) => {
  return (
    <StyledMapDetailView>
      {src ? (
        <StyledImageWrapper>
          <img src={src} alt='내부지도' width={'100%'} />
        </StyledImageWrapper>
      ) : (
        <StyledNotFound>
          <img src={NotFoundIcon} alt='not-found' />
          <p>역사 지도 정보가 없습니다.</p>
        </StyledNotFound>
      )}
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
  height: 45%;

  -ms-overflow-style: none; /* 인터넷 익스플로러 */
  scrollbar-width: none; /* 파이어폭스 */

  &::-webkit-scrollbar {
    display: none; /* 크롬, 사파리, 오페라, 엣지 */
  }

  & > img {
    width: 220%;
  }
`;

const StyledNotFound = styled.div`
  position: absolute;
  top: 30%;
  left: 50%;
  width: 100%;
  text-align: center;
  transform: translateX(-50%);

  & > img {
    height: 48px;
    width: 53px;
  }

  & > p {
    color: #96a1b2;
    font-size: 1.25rem;
    font-weight: 600;
  }
`;
