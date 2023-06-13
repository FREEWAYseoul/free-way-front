import styled from 'styled-components';
import AlertItem from './AlertItem';
import { SafetyAlertItemProps, SafetyAlertProps } from '../../../types/alertType';

const SafetyAlertBox = ({ info }: { info: SafetyAlertProps }) => {
  return (
    <StyledSafetyAlrertBox>
      <h1>{info.date}</h1>
      {info.contents.map((item: SafetyAlertItemProps) => (
        <AlertItem key={item.date} info={item} />
      ))}
    </StyledSafetyAlrertBox>
  );
};

export default SafetyAlertBox;

const StyledSafetyAlrertBox = styled.div`
  padding: 0 20px;

  & > h1 {
    display: flex;
    align-items: center;
    margin: 0;
    height: 40px;
    color: rgba(0, 0, 0, 0.5);
    font-size: 1.125rem;
    border-bottom: 1px solid #d9d9d9;
  }
`;
