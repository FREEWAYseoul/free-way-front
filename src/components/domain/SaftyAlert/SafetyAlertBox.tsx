import styled from 'styled-components';
import AlertItem from './AlertItem';

const SafetyAlertBox = () => {
  return (
    <StyledSafetyAlrertBox>
      <h1>6/8 목요일</h1>
      <AlertItem />
      <AlertItem />
      <AlertItem />
    </StyledSafetyAlrertBox>
  );
};

export default SafetyAlertBox;

const StyledSafetyAlrertBox = styled.div`
  & > h1 {
    display: flex;
    align-items: center;
    margin: 0;
    padding-left: 16px;
    height: 40px;
    color: rgba(0, 0, 0, 0.5);
    font-size: 1.125rem;
    border-bottom: 1px solid #d9d9d9;
  }
`;
