import styled from 'styled-components';
import Badge from './Badge';
import { StationTitleProps } from '../../../types/stationType';

const StationTitle = ({ line, title, color }: StationTitleProps) => {
  return (
    <StyledStationTitleWrapper $color={color}>
      <Badge lineId={line} isActive={true}>
        {line}
      </Badge>
      {title}
    </StyledStationTitleWrapper>
  );
};

export default StationTitle;

const StyledStationTitleWrapper = styled.div<{ $color: string }>`
  position: absolute;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  left: 50%;
  padding: 5px 29px;
  height: 40px;
  min-width: 113px;
  line-height: 20px;
  border-radius: 30px;
  border: 5px solid ${({ $color }) => $color};
  background-color: #fff;
  transform: translateX(-50%);
  white-space: nowrap;
  z-index: 99;
`;
