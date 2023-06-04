import React from 'react';
import styled from 'styled-components';

interface BadgeProps {
  lineId: number;
  children: React.ReactNode;
}

const Badge = ({ children }: BadgeProps) => {
  return <StyledBadge>{children}</StyledBadge>;
};

export default Badge;

const StyledBadge = styled.span`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  min-width: 20px;
  height: 20px;
  border-radius: 10px;
  font-size: 14px;
  line-height: 14px;
  color: #fff;
  background-color: #60b157;
`;
