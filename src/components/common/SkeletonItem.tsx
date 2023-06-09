import styled, { keyframes } from 'styled-components';
import Divider from './Divider';

const SkeletonItem = () => {
  return (
    <>
      <Wrapper>
        <Rectangle />
        <Circle />
      </Wrapper>
      <Divider />
    </>
  );
};

export default SkeletonItem;

const Wrapper = styled.div`
  width: 100%;
  height: 50px;

  display: flex;
  justify-content: space-around;
  align-items: center;

  opacity: 0.5;
`;

const SkeletonLoading = keyframes`
  0% {
    background-color: hsl(200, 20%, 70%);
  }
  100% {
    background-color: hsl(200, 20%, 95%);
  }
`;

const Rectangle = styled.div`
  width: 200px;
  height: 28px;
  opacity: 0.7;
  animation: ${SkeletonLoading} 1s linear infinite alternate;
`;
const Circle = styled.div`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  opacity: 0.7;
  animation: ${SkeletonLoading} 1s linear infinite alternate;
`;
