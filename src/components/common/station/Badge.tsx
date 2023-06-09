import React from 'react';
import styled, { css } from 'styled-components';
import { STATION_LINE_COLORS } from '../../../constants/color';

interface BadgeProps {
  lineId: string | number;
  isActive: boolean;
  handleOnClick?: () => void;
  children: React.ReactNode;
}

const Badge = ({ lineId, isActive, handleOnClick, children }: BadgeProps) => {
  console.log(lineId, 'line id');
  const color = STATION_LINE_COLORS[lineId];

  return (
    <StyledBadge $isActive={isActive} $color={color.color} onClick={handleOnClick}>
      {children}
    </StyledBadge>
  );
};

export default Badge;

const StyledBadge = styled.span<{ $isActive: boolean; $color: string }>`
  cursor: pointer;
  padding: 1px 2px 0;
  min-width: 20px;
  height: 20px;
  border-radius: 10px;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  background-color: #fff;

  ${({ $isActive, $color }) => {
    return $isActive
      ? css`
          color: #fff;
          background-color: ${$color};
        `
      : css`
          color: ${$color};
          border: 1px solid ${$color};
        `;
  }}
`;
