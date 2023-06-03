import styled from 'styled-components';
import Button from '../../common/Button';
import { ReactComponent as MicIcon } from '../../../assets/icons/home-mic-icon.svg';
import { useSearchContext } from '../Search/SearchContext';
import { Link } from 'react-router-dom';

const HomeSearchBar = () => {
  const { handleMouseDown, handleMouseUp } = useSearchContext();

  return (
    <StyledHomeSearchBarWrapper>
      <StyledHomeSearchBar to='/search'>
        <ButtonText>역이름을 입력해주세요.</ButtonText>
      </StyledHomeSearchBar>
      <StyledHomeSearchBarMicWrapper>
        <Button handleMouseDown={handleMouseDown} handleMouseUp={handleMouseUp}>
          <MicIcon />
        </Button>
      </StyledHomeSearchBarMicWrapper>
    </StyledHomeSearchBarWrapper>
  );
};

export default HomeSearchBar;

const StyledHomeSearchBarWrapper = styled.div`
  width: 90%;
  display: flex;
  justify-content: center;
  align-content: center;
  margin: 125px 0px;
  position: inherit;
  top: -15%;
`;

const StyledHomeSearchBar = styled(Link)`
  flex: 1;
  height: 75px;
  background: #ffffff;
  border: 1.5px solid #316bff;
  box-shadow: 0px 0px 13.3333px rgba(68, 81, 69, 0.1);
  border-radius: 80px;

  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  outline: none;
`;

const ButtonText = styled.span`
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 21px;

  color: #434343;
  opacity: 0.5;
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
