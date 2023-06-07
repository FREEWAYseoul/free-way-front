import styled from 'styled-components';

const ConvenienceView = () => {
  return (
    <StyledConvenienceView>
      <div className='updateDate'>0/00 0요일 00:00 업데이트 완료</div>
      <StyledConvenienceBox>
        <li>
          <span className='checkBox'></span>휠체어 리프트<span className='status'>사용가능</span>
        </li>
        <li>
          <span className='checkBox'></span>유아수유방<span className='status'>사용가능</span>
        </li>
        <li>
          <span className='checkBox'></span>환전키오스크<span className='status'>사용가능</span>
        </li>
        <li>
          <span className='checkBox'></span>무인민원발급기<span className='status'>사용가능</span>
        </li>
        <li>
          <span className='checkBox'></span>환승주차장<span className='status'>사용가능</span>
        </li>
      </StyledConvenienceBox>
    </StyledConvenienceView>
  );
};

export default ConvenienceView;

const StyledConvenienceView = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: #fff;
  z-index: 99;

  & > .updateDate {
    height: 36px;
    padding: 11px 0;
    color: #cbd0d9;
    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 600;
    font-size: 12px;
    line-height: 14px;
    text-align: center;
  }
`;

const StyledConvenienceBox = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;

  & > li {
    box-sizing: content-box;
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 15px 20px;
    border-bottom: 1px solid #d9d9d9;

    &:first-child {
      padding-top: 8px;
    }

    & > .checkBox {
      width: 24px;
      height: 24px;
      border-radius: 50%;
      background-color: #d9d9d9;
    }

    & > .status {
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      align-items: flex-start;
      padding: 5px 8px 4px;
      color: #4aa570;
      font-size: 12px;
      font-weight: bold;
      background: rgba(96, 208, 132, 0.3);
      border-radius: 30px;
    }
  }
`;
