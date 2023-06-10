import styled from 'styled-components';
import { ReactComponent as MicIcon } from '../../../assets/icons/home-mic-icon.svg';
import useMic from '../../../hooks/useMic';
import { useNavigate } from 'react-router-dom';

const HomeSearchBar = () => {
  const { startListening } = useMic();
  const navigate = useNavigate();

  return (
    <Wrapper>
      <StyledHomeSearchBarWrapper>
        <TypingSearchSection onClick={() => navigate('/search')}>
          역이름을 입력해주세요.
        </TypingSearchSection>
        <VoiceSearchSection id='mic'>
          <VoiceSearchButton onClick={startListening}>
            <MicIcon />
          </VoiceSearchButton>
        </VoiceSearchSection>
      </StyledHomeSearchBarWrapper>
    </Wrapper>
  );
};

export default HomeSearchBar;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledHomeSearchBarWrapper = styled.div`
  width: 90%;

  display: grid;
  grid-template-columns: 3fr 1fr;

  height: 75px;
  background: #ffffff;
  border: 1.5px solid #316bff;
  box-shadow: 0px 0px 13.3333px rgba(68, 81, 69, 0.1);
  border-radius: 80px;
`;

const TypingSearchSection = styled.section`
  grid: 1;

  padding-left: 27px;
  display: flex;
  justify-content: flex-start;
  align-items: center;

  text-decoration: none;
  outline: none;
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  color: #434343;
  opacity: 0.5;
  &:hover,
  &:active {
    color: #316bff;
    cursor: text;
  }
`;

const VoiceSearchSection = styled.div`
  grid: 2;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const VoiceSearchButton = styled.button`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #316bff;
  border: none;

  display: flex;
  justify-content: center;
  align-items: center;

  transition: transform 0.2s;
  &:hover {
    transform: scale(1.1);
  }
  cursor: pointer;
`;
