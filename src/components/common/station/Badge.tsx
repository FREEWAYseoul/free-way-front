import styled, { css } from 'styled-components';
import { STATION_LINE_COLORS } from '../../../constants/color';

interface BadgeProps {
  lineId: string | number;
  isActive: boolean;
  handleOnClick?: () => void;
}

const Badge = ({ lineId, isActive, handleOnClick }: BadgeProps) => {
  const color = STATION_LINE_COLORS[lineId];

  return (
    <StyledBadge
      $isActive={isActive}
      $isText={isNaN(Number(lineId))}
      $color={color?.color}
      onClick={handleOnClick}
    >
      {isNaN(Number(lineId)) ? color.lineName : lineId}
    </StyledBadge>
  );
};

export default Badge;

const StyledBadge = styled.span<{ $isActive: boolean; $isText: boolean; $color: string }>`
  cursor: pointer;
  padding: 0 6px;
  min-width: 20px;
  height: 20px;
  border-radius: 10px;
  font-size: 0.875rem;
  line-height: 20px;
  text-align: center;
  background-color: #fff;
  border: 1.5px solid ${({ $color }) => $color};

  ${({ $isText }) => {
    return !$isText
      ? css`
          padding: 0 2px;
          width: 20px;
        `
      : css`
          font-size: 0.75rem;
          font-weight: 600;
          line-height: 1.2rem;
        `;
  }}

  ${({ $isActive, $color }) => {
    return $isActive
      ? css`
          color: #fff;
          background-color: ${$color};
        `
      : css`
          color: ${$color};
        `;
  }}
`;
