import { PropsWithChildren } from 'react';
import styled from 'styled-components';
import Button from '../../common/Button';
import { useSearchContext } from './SearchContext';
import { ReactComponent as MicIcon } from '../../../assets/icons/mic-icon.svg';
import { ReactComponent as SoundWaveIcon } from '../../../assets/icons/sound-wave.svg';
import { ReactComponent as ChevronIcon } from '../../../assets/icons/chevron.svg';
import { useNavigate } from 'react-router-dom';
import useSearchBar from '../../../hooks/useSearchBar';

type SearchBarProps = {
  placeholder: string;
  listeningMessage?: string;
  handleClick?: () => void;
  isListening?: boolean;
} & PropsWithChildren;

const SearchBar = ({ placeholder, listeningMessage, handleClick, isListening }: SearchBarProps) => {
  const { keywords, inputRef, setKeywords } = useSearchContext();
  const { handleSubmit, handleTyping } = useSearchBar();
  const navigate = useNavigate();
  const handleGoBack = () => {
    setKeywords('');
    navigate('/');
  };
  return (
    <>
      <StyledSearchBarWrapper>
        <Button handleClick={handleGoBack}>
          <ChevronIcon style={{ width: '24px', height: '24px' }} />
        </Button>
        <StyledSearchForm onSubmit={handleSubmit}>
          <StyledSearchBarInput
            id='search-bar'
            value={keywords || ''}
            type='text'
            placeholder={isListening ? listeningMessage : placeholder}
            onChange={handleTyping}
            ref={inputRef}
          />
        </StyledSearchForm>
        <Button handleClick={handleClick}>
          {isListening ? <SoundWaveIcon style={{ color: '#316BFF' }} /> : <MicIcon />}
        </Button>
      </StyledSearchBarWrapper>
    </>
  );
};

export default SearchBar;

const StyledSearchBarWrapper = styled.div`
  width: 100%;
  height: 75px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);

  display: grid;
  grid-template-columns: 36px minmax(0, 1fr) 75px;
  background-color: #ffffff;

  padding-left: 13px;

  font-style: normal;
  font-weight: 600;
  font-size: 1.125rem;
`;

const StyledSearchForm = styled.form`
  margin: auto 0;
`;

const StyledSearchBarInput = styled.input`
  box-sizing: border-box;
  width: 100%;
  border-radius: 4px;
  border: none;
  outline: none;
  padding-top: 4px;
  padding-left: 11px;
  font-weight: 500;
  line-height: 20px;

  &::placeholder {
    color: rgba(150, 161, 178, 0.5);
    font-size: 18px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
  }
`;
