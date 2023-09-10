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
    document.location.href = `tel:${tel}`;
  };

  return (
    <>
      {title === '안내전화' ? (
        <StyledButton onClick={() => handleChangeTab(title)} disabled={!tel}>
          <StyledWrapper $isActive={isActive} $isDisabled={!tel} onClick={handleTelLinkClick}>
            <div className='iconWrapper'>{children}</div>
            <p>{title}</p>
          </StyledWrapper>
        </StyledButton>
      ) : (
        <StyledButton onClick={() => handleChangeTab(title)}>
          <StyledWrapper $isActive={isActive}>
            <div className='iconWrapper'>{children}</div>
            <p>{title}</p>
          </StyledWrapper>
        </StyledButton>
      )}
    </>
  );
};

export default StationButton;

const StyledButton = styled.button`
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

  &:not(:first-child) {
    & .iconWrapper {
      &:before {
        content: '';
        position: absolute;
        top: 0;
        left: -5.5px;
        width: 1px;
        height: 90%;
        background-color: #000;
        opacity: 0.25;
        z-index: 99;
      }
    }
  }
`;

const StyledWrapper = styled.div<{ $isActive?: boolean; $isDisabled?: boolean }>`
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
      font-weight: 600;
      color: #316bff;
    `}

  ${({ $isDisabled }) =>
    $isDisabled &&
    css`
      cursor: default;
      color: rgba(0, 0, 0, 0.25);
    `}

  & > .iconWrapper {
    position: relative;
    width: 100%;

    & > svg {
      max-height: 34px;
      width: 34px;
    }
  }

  & > P {
    margin: 0;
  }
`;
