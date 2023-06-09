import styled, { css } from 'styled-components';
import Badge from './Badge';
import { StationTitleProps } from '../../../types/stationType';

// eslint-disable-next-line react-refresh/only-export-components
export const titleEclipse = (title: string) => {
  if (title.length > 6) {
    return [...title].splice(0, 6).join('') + '...';
  }
  return title;
};

const StationTitle = ({ line, title, color, type }: StationTitleProps) => {
  return (
    <StyledStationTitleWrapper $color={color} $type={type || ''}>
      <Badge lineId={line} isActive={true} />
      {type !== 'marker' ? titleEclipse(title) : title}
    </StyledStationTitleWrapper>
  );
};

export default StationTitle;

const StyledStationTitleWrapper = styled.div<{ $color: string; $type: string }>`
  position: absolute;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  left: 50%;
  height: 40px;
  line-height: 19px;
  border-radius: 30px;
  border: 5px solid ${({ $color }) => $color};
  background-color: #fff;
  transform: translateX(-50%);
  white-space: nowrap;
  z-index: 99;
  ${({ $type }) => {
    return $type === 'marker'
      ? css`
          padding: 7px 9px 7px 6px;
        `
      : css`
          padding: 5px 16px;
          min-width: 113px;
        `;
  }}
`;
