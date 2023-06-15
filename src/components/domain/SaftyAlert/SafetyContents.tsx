import styled from 'styled-components';
import SafetyAlertBox from './SafetyAlertBox';

import { SafetyAlertProps } from '../../../types/alertType';
import { useAlert } from '../../../hooks/useAlert';

const SafetyContents = () => {
  const { alerts } = useAlert();

  return (
    <StyledContents>
      {alerts.map((info: SafetyAlertProps) => (
        <SafetyAlertBox key={info.date} info={info} />
      ))}
    </StyledContents>
  );
};

export default SafetyContents;

const StyledContents = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  height: calc(100% - 50px);
  padding-bottom: 80px;
  overflow: auto;

  &::-webkit-scrollbar {
    display: none;
  }
`;
