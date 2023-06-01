import styled from 'styled-components';

const SubwayMap = () => {
  return (
    <StyledSubWayMap>
      <span>역삼</span>
      <div>
        <span>2</span> 강남
      </div>
      <span>교대</span>
    </StyledSubWayMap>
  );
};

export default SubwayMap;

const StyledSubWayMap = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;

  & > div {
    position: absolute;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 4px;
    left: 50%;
    padding: 15px 40px;
    border-radius: 30px;
    border: 5px solid #60b157;
    background-color: #fff;
    transform: translateX(-50%);
    z-index: 99;

    & > span {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      font-size: 14px;
      color: #fff;
      background-color: #60b157;
    }
  }

  & > span {
    flex: 1;
    padding: 8px 30px;
    color: #fff;
    background-color: #60b157;

    &:first-child {
      border-radius: 16px 0 0 16px;
    }

    &:last-child {
      text-align: end;
      border-radius: 0 16px 16px 0;
    }
  }
`;
