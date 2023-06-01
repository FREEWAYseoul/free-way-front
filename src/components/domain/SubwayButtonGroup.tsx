import styled, { css } from 'styled-components';
import ElevatorIcon from '../../assets/icons/elevator.svg';
import CallIcon from '../../assets/icons/call.svg';
import MapIcon from '../../assets/icons/map.svg';
import ConvenienceIcon from '../../assets/icons/convenience.svg';

const buttonDatas = [
  { title: '엘리베이터', src: ElevatorIcon, isActive: true },
  { title: '안내 전화', src: CallIcon, isActive: false },
  { title: '역사 지도', src: MapIcon, isActive: false },
  { title: '편의시설', src: ConvenienceIcon, isActive: false },
];

interface SubwayButtonProps {
  title: string;
  src: string;
  isActive?: boolean;
}

const SubwayButtonGroup = () => {
  return (
    <StyledButtonBox>
      {buttonDatas.map((item) => (
        <SubwayButton key={item.title} title={item.title} src={item.src} isActive={item.isActive} />
      ))}
    </StyledButtonBox>
  );
};

const SubwayButton = ({ title, src, isActive }: SubwayButtonProps) => {
  return (
    <StyledButton $isActive={isActive}>
      <div className='wrapper'>
        <img src={src} alt={title} />
        <p>{title}</p>
      </div>
    </StyledButton>
  );
};

export default SubwayButtonGroup;

const StyledButtonBox = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  padding-top: 16px;
`;

const StyledButton = styled.div<{ $isActive?: boolean }>`
  cursor: pointer;
  position: relative;
  width: 100%;

  &:after {
    content: '';
    display: block;
    padding-bottom: 100%;
  }

  & > .wrapper {
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 4px;
    width: 100%;
    height: 100%;
    border-radius: 12.5px;
    font-size: 1rem;
    color: #000;
    border: 1px solid #50a0ff;
    background-color: #d9eaff;

    ${({ $isActive }) =>
      $isActive &&
      css`
        background-color: #50a0ff;
        color: #fff;
      `}

    & > img {
      width: 20px;
      height: 20px;
    }

    & > P {
      margin: 0;
    }
  }
`;
