import { PropsWithChildren } from 'react';
import styled from 'styled-components';

type ButtonType = {
  handleClick?: () => void;
  handleMouseUp?: () => void;
  handleMouseDown?: () => void;
} & PropsWithChildren;

const Button = ({ handleClick, handleMouseUp, handleMouseDown, children }: ButtonType) => {
  return (
    <StyledButton onClick={handleClick} onMouseDown={handleMouseDown} onMouseUp={handleMouseUp}>
      {children}
    </StyledButton>
  );
};
export default Button;

const StyledButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3px 6px;
  background: none;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #d4d4d4;
  }
`;
