import { PropsWithChildren } from 'react';
import styled from 'styled-components';
import Button from '../../common/Button';
import { useSearchContext } from './SearchContext';
import { ReactComponent as MicIcon } from '../../../assets/icons/mic-icon.svg';

type SearchBarProps = {
  placeholder: string;
  listeningMessage?: string;
} & PropsWithChildren;

const SearchBar = ({ placeholder, listeningMessage }: SearchBarProps) => {
  const {
    keywords,
    handleSubmit,
    handleTyping,
    startListening,
    endListening,
    resetKeywords,
    isListening,
  } = useSearchContext();

  return (
    <>
      <StyledSearchBarForm onSubmit={handleSubmit}>
        <StyledSearchBar
          id='search-bar'
          value={keywords}
          type='text'
          placeholder={placeholder}
          onChange={handleTyping}
        />
        <Button handleMouseDown={startListening} handleMouseUp={endListening}>
          <MicIcon />
        </Button>
        <Button handleClick={resetKeywords}>ⅹ</Button>
      </StyledSearchBarForm>
      {isListening() && <p>{listeningMessage}</p>}
    </>
  );
};

export default SearchBar;

const StyledSearchBarForm = styled.form`
  display: flex;
  align-items: center;
  padding: 8px;
  border-radius: 4px;
  font-size: 20px;
  width: 100%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

const StyledSearchBar = styled.input`
  padding: 8px;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  width: 100%;
  max-width: 300px;
  outline: none;
`;
