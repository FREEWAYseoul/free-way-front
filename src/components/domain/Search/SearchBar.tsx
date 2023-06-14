import { PropsWithChildren } from 'react';
import styled from 'styled-components';
import Button from '../../common/Button';
import { useSearchContext } from './SearchContext';
import { ReactComponent as MicIcon } from '../../../assets/icons/mic-icon.svg';
import { ReactComponent as ChevronIcon } from '../../../assets/icons/chevron.svg';
import { useNavigate } from 'react-router-dom';
import useSearchBar from '../../../hooks/useSearchBar';

type SearchBarProps = {
  placeholder: string;
  listeningMessage?: string;
  handleClick?: () => void;
} & PropsWithChildren;

const SearchBar = ({ placeholder, handleClick }: SearchBarProps) => {
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
        <StyledLeftSection>
          <Button handleClick={handleGoBack}>
            <ChevronIcon style={{ width: '24px', height: '24px' }} />
          </Button>
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
        </StyledLeftSection>

        <StyledRightSection>
          <Button handleClick={handleClick}>
            <MicIcon />
          </Button>
        </StyledRightSection>
      </StyledSearchBarWrapper>
    </>
  );
};

export default SearchBar;

const StyledSearchBarWrapper = styled.div`
  position: fixed;
  top: 0;

  width: 100%;
  max-width: 475px;
  height: 75px;
  /* border-radius: 4px; */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);

  display: grid;
  grid-template-columns: 8fr 2fr;
  background-color: #ffffff;

  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 600;
  font-size: 1.125rem;
`;

const StyledLeftSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding-left: 13px;
`;

const StyledSearchBarInput = styled.input`
  border-radius: 4px;
  width: 100%;
  max-width: 300px;
  border: none;
  outline: none;
  padding-top: 3px;
  padding-left: 11px;
  font-weight: 500;
  line-height: 20px;
`;

const StyledRightSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
