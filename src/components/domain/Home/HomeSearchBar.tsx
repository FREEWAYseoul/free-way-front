import styled from 'styled-components';
import Button from '../../common/Button';
import { ReactComponent as MicIcon } from '../../../assets/icons/home-mic-icon.svg';
import { Link } from 'react-router-dom';
import useMic from '../../../hooks/useMic';

const HomeSearchBar = () => {
  const { startListening } = useMic();

  return (
    <>
      <StyledHomeSearchBar to='/search'>
        <StyledHomeSearchBarPlaceholder>역이름을 입력해주세요.</StyledHomeSearchBarPlaceholder>
      </StyledHomeSearchBar>
      <StyledHomeSearchBarMicWrapper>
        <Button handleClick={startListening}>
          <MicIcon />
        </Button>
      </StyledHomeSearchBarMicWrapper>
    </>
  );
};

export default HomeSearchBar;

const StyledHomeSearchBar = styled(Link)`
  flex: 1;
  height: 75px;
  background: #ffffff;
  border: 1.5px solid #316bff;
  box-shadow: 0px 0px 13.3333px rgba(68, 81, 69, 0.1);
  border-radius: 80px;

  padding-left: 27px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  text-decoration: none;
  outline: none;
`;

const StyledHomeSearchBarPlaceholder = styled.span`
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 21px;

  color: #434343;
  opacity: 0.5;
  &:hover {
    color: #316bff;
  }
`;

const StyledHomeSearchBarMicWrapper = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #316bff;
  border: none;
  cursor: pointer;

  position: absolute;
  right: 18px;
  top: 12px;

  display: flex;
  justify-content: center;
  align-items: center;

  transition: transform 0.2s;
  &:hover {
    transform: scale(1.1);
  }
`;
