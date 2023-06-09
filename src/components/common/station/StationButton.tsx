import styled, { css } from 'styled-components';

interface StationButtonProps {
  title: string;
  isActive?: boolean;
  children: React.ReactNode;
  handleChangeTab: (arg1: string) => void;
  onClick?: () => void;
  tel?: string;
}

const StationButton = ({ title, isActive, children, handleChangeTab, tel }: StationButtonProps) => {
  const handleTelLinkClick = () => {
    window.open(`tel:${tel}`, '_blank');
  };

  return (
    <>
      {tel ? (
        <StyledButton $isActive={isActive} onClick={() => handleChangeTab(title)}>
          <div className='wrapper' onClick={handleTelLinkClick}>
            {children}
            <p>{title}</p>
          </div>
        </StyledButton>
      ) : (
        <StyledButton $isActive={isActive} onClick={() => handleChangeTab(title)}>
          <div className='wrapper'>
            {children}
            <p>{title}</p>
          </div>
        </StyledButton>
      )}
    </>
  );
};

export default StationButton;

const StyledButton = styled.button<{ $isActive?: boolean }>`
  cursor: pointer;
  position: relative;
  padding: 0;
  width: 100%;
  background: none;
  border: none;

  &:after {
    content: '';
    display: block;
    padding-bottom: 100%;
  }

  &:not(:first-child)::before {
    content: '';
    position: absolute;
    top: 0;
    left: -4px;
    width: 1px;
    height: 60%;
    background-color: #d9d9d9;
    z-index: 99;
  }

  & .wrapper {
    cursor: pointer;
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 16px;
    width: 100%;
    height: 100%;
    font-size: 1rem;
    color: #808080;
    background-color: #fff;

    ${({ $isActive }) =>
      $isActive &&
      css`
        color: #316bff;
      `}

    & > svg {
      max-height: 34px;
      width: 34px;
      /* height: auto; */
    }

    & > P {
      margin: 0;
    }
  }
`;
