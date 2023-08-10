import styled from 'styled-components';
import ElevatorIcon1 from '../../../assets/icons/elevator.svg';
import ElevatorIcon2 from '../../../assets/icons/elevator2.svg';

interface ElevatorMarkerProps {
  text: number;
  status: '사용 가능' | '공사 중' | '보수 중' | '확인 불가';
}

const ElevatorMarker = ({ text, status }: ElevatorMarkerProps) => {
  const iconSrc = status === '사용 가능' || status === '확인 불가' ? ElevatorIcon1 : ElevatorIcon2;
  const newText = status === '확인 불가' ? '확인불가' : `${text}번 출구`;
  return (
    <StyledElevatorMarker $status={status}>
      <StyledElevator $status={status}>
        <img src={iconSrc} />
        {newText}
      </StyledElevator>
      <div className='triangle'>
        <svg
          width='11'
          height='14'
          viewBox='0 0 11 14'
          fill='currentColor'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M7.27588 12.1259C6.78377 13.6033 4.69402 13.6033 4.20191 12.1259L0.477791 0.945202L8.7529 0.945203C9.85849 0.945203 10.6393 2.02822 10.2899 3.07715L7.27588 12.1259Z'
            fill='currentColor'
          />
        </svg>
      </div>
    </StyledElevatorMarker>
  );
};

export default ElevatorMarker;

const StyledElevatorMarker = styled.div<{ $status: string }>`
  z-index: 10;
  filter: drop-shadow(0px 0px 10.8px rgba(68, 81, 69, 0.3));

  & > .triangle {
    position: absolute;
    bottom: -47px;
    left: 50%;
    color: ${({ $status }) => {
      if ($status === '사용 가능') {
        return '#0EB000';
      } else if ($status === '확인 불가') {
        return '#565656';
      } else {
        return '#DB3535';
      }
    }};
    transform: translateX(-50%);
    z-index: -90;
  }
`;

const StyledElevator = styled.div<{ $status: string }>`
  position: absolute;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  left: 50%;
  padding: 6px 13px;
  border-radius: 30px;
  color: #fff;
  font-size: 15px;
  font-weight: 500;
  background-color: ${({ $status }) => {
    if ($status === '사용 가능') {
      return '#0EB000';
    } else if ($status === '확인 불가') {
      return '#565656';
    } else {
      return '#DB3535';
    }
  }};
  transform: translateX(-50%);
  white-space: nowrap;

  & > img {
    height: 20px;
    min-width: 20px;
  }

  & > div {
    color: #fff;
  }
`;
