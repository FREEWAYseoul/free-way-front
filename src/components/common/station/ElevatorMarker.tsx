import styled from 'styled-components';
import ElevatorIcon1 from '../../../assets/icons/elevator.svg';
import ElevatorIcon2 from '../../../assets/icons/elevator2.svg';

interface ElevatorMarkerProps {
  text: string;
  status: '사용 가능' | '공사 중' | '알 수 없음';
}

const ElevatorMarker = ({ text, status }: ElevatorMarkerProps) => {
  const iconSrc = status === '사용 가능' ? ElevatorIcon1 : ElevatorIcon2;

  return (
    <StyledElevatorMarker $status={status}>
      <StyledElevator $status={status}>
        <img src={iconSrc} />
        {text}
      </StyledElevator>
      <div className='triangle'></div>
    </StyledElevatorMarker>
  );
};

export default ElevatorMarker;

const StyledElevatorMarker = styled.div<{ $status: string }>`
  cursor: pointer;
  position: absolute;
  top: -45px;
  z-index: 88;
  filter: drop-shadow(0px 0px 10.8px rgba(68, 81, 69, 0.3));

  & > .triangle {
    position: absolute;
    bottom: -35px;
    left: 50%;
    height: 15px;
    width: 15px;
    background-color: ${({ $status }) => {
      if ($status === '사용 가능') {
        return '#0EB000';
      } else {
        return '#DB3535';
      }
    }};
    transform: translateX(-50%) rotate(-45deg);
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
  padding: 6px 12px;
  border-radius: 30px;
  color: #fff;
  font-size: 15px;
  font-weight: 500;
  background-color: ${({ $status }) => {
    if ($status === '사용 가능') {
      return '#0EB000';
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
