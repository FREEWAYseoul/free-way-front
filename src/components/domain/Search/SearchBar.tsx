import { PropsWithChildren } from 'react';
import styled from 'styled-components';
import Button from '../../common/Button';
import { useSearchContext } from './SearchContext';
import { ReactComponent as MicIcon } from '../../../assets/icons/mic-icon.svg';
import { useNavigate } from 'react-router-dom';
import useMic from '../../../hooks/useMic';
import useSearchBar from '../../../hooks/useSearchBar';

type SearchBarProps = {
  placeholder: string;
  listeningMessage?: string;
} & PropsWithChildren;

const SearchBar = ({ placeholder, listeningMessage }: SearchBarProps) => {
  const { keywords, inputRef } = useSearchContext();
  const { handleSubmit, handleTyping } = useSearchBar();
  const { startListening, endListening, isListening } = useMic();
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate('/');
  };
  return (
    <>
      <StyledSearchBarWrapper>
        <StyledLeftSection>
          <Button handleClick={handleGoBack}>{'<'}</Button>
        </StyledLeftSection>
        <form
          onSubmit={handleSubmit}
          style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
          <StyledSearchBarInput
            id='search-bar'
            value={keywords || ''}
            type='text'
            placeholder={placeholder}
            onChange={handleTyping}
            // onKeyDown={handleKeydown}
            ref={inputRef}
          />
        </form>
        <StyledRightSection>
          <Button handleMouseDown={startListening} handleMouseUp={endListening}>
            <MicIcon />
          </Button>
        </StyledRightSection>
      </StyledSearchBarWrapper>
      {isListening() && <p>{listeningMessage}</p>}
    </>
  );
};

export default SearchBar;

const StyledSearchBarWrapper = styled.div`
  height: 55px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);

  display: grid;
  grid-template-columns: 1fr 4fr 1fr;
  grid-gap: 10px;

  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
`;

const StyledLeftSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledSearchBarInput = styled.input`
  border-radius: 4px;
  width: 100%;
  max-width: 300px;
  border: none;
  outline: none;
  padding-left: 5%;
`;

const StyledRightSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;
