import styled, { keyframes } from 'styled-components';
import { ReactComponent as NotiIcon } from '../../assets/icons/noti-icon.svg';

type ToastMessageProps = {
  content: string;
  onClick: () => void;
  isOpen: boolean;
};

type WrapperProps = {
  isOpen: boolean;
};

const ToastMessage = ({ content, onClick, isOpen }: ToastMessageProps) => {
  return (
    <StyledToastMessageWrapper onClick={onClick} isOpen={isOpen}>
      <StyledToastMessageLeftSection>
        <NotiIcon onClick={onClick} />
      </StyledToastMessageLeftSection>
      <StyledToastMessageRightSection>
        <StyledToastMessageContent>{content}</StyledToastMessageContent>
      </StyledToastMessageRightSection>
    </StyledToastMessageWrapper>
  );
};

export default ToastMessage;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10%);
  }
  to {
    opacity: 1;
    transform: translateY(10%);
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
    transform: translateY(10%);
  }
  to {
    opacity: 0;
    transform: translateY(-10%);
  }
`;

const StyledToastMessageWrapper = styled.div<WrapperProps>`
  position: fixed;
  z-index: 99;
  top: 0;

  transform: translate(-50%, -50%);

  width: inherit;
  max-width: 475px;
  padding: 1rem 1.2rem;
  box-shadow: 0 0 15px 0 var(--black-40);
  background: rgba(78, 89, 104, 0.95);
  border-radius: 17.3333px;
  color: #ffffff;

  display: flex;
  opacity: 0;
  animation-name: ${(props) => (props.isOpen ? fadeIn : fadeOut)};
  animation-duration: 2s;
  animation-fill-mode: forwards;
`;

const StyledToastMessageLeftSection = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin-right: 10px;
  padding-top: 10px;
`;
const StyledToastMessageRightSection = styled.section``;
const StyledToastMessageContent = styled.div`
  line-height: 1.2;
  letter-spacing: 0.29px;
  margin-top: 0.6rem;
`;
