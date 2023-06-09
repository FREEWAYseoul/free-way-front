import styled from 'styled-components';

const AlertItem = () => {
  return (
    <StyledAlertItem>
      <div className='titleBox'>
        <h2>알림 제목 1</h2>
        <span>13:11</span>
      </div>
      <p>알린 ㅐ요잉니인이나이나이ㅏㄴ이ㅏ니아니아ㅣ나인이ㅏㅣ아ㅣ나ㅣ</p>
    </StyledAlertItem>
  );
};

export default AlertItem;

const StyledAlertItem = styled.div`
  padding: 11px 16px;
  border-bottom: 1px solid #d9d9d9;
  height: 90px;

  & > .titleBox {
    display: flex;
    justify-content: space-between;
    padding-bottom: 6px;

    & > h2 {
      margin: 0;
      font-size: 1rem;
    }

    & > span {
      font-size: 1rem;
      font-weight: 600;
    }
  }

  & > p {
    margin: 0;
  }
`;
