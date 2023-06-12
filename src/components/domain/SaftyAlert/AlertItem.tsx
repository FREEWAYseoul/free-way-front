import styled from 'styled-components';

const AlertItem = () => {
  return (
    <StyledAlertItem>
      <span>오후 13:11</span>
      <h2>{`[6월 3일 서울월드컵경기장 대규모 종교행사, 지하철 혼잡 주의]`}</h2>
      <p>{`6월 3일(토) 서울월드컵경기장에서 대규모 종교행사가 예정되어 있습니다. 6호선 월드컵경기장역, 마포구청역, 디지털미디어시티역 주변이 다소 혼잡 할 수 있으니 이 점 참고하여 열차를 이용해 주시기 바랍니다.`}</p>
    </StyledAlertItem>
  );
};

export default AlertItem;

const StyledAlertItem = styled.div`
  padding: 10px 0 20px;
  color: #434343;
  font-size: 1rem;
  line-height: 24px;
  & > span {
    color: #808080;
    font-weight: 400;
  }

  & > h2 {
    margin: 0;
    font-size: 1rem;
  }

  & > p {
    margin: 0;
  }
`;
