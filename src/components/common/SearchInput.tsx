import { ChangeEvent, PropsWithChildren, useState } from 'react';
import styled from 'styled-components';
import { useSpeechRecognition } from 'react-speech-kit';
import Button from './Button';

type SearchInputProps = {
  placeholder: string;
  listeningMessage?: string;
} & PropsWithChildren;

const SearchInput = ({ placeholder, listeningMessage }: SearchInputProps) => {
  const [keywords, setKeywords] = useState('');

  const { listen, listening, stop } = useSpeechRecognition({
    onResult: (result: string) => {
      setKeywords(result);
    },
  });

  const handleMouseDown = () => {
    listen({ lang: 'ko-KR' });
  };

  const handleTyping = (e: ChangeEvent<HTMLInputElement>) => {
    setKeywords(e.target.value);
  };

  const handleResetButton = () => {
    setKeywords('');
  };

  return (
    <>
      <StyledSearchInputWrapper>
        <StyledSearchInput
          value={keywords}
          type='text'
          placeholder={placeholder}
          onChange={handleTyping}
        />
        <Button handleMouseDown={handleMouseDown} handleMouseUp={stop}>
          🎤
        </Button>
        <Button handleClick={handleResetButton}>ⅹ</Button>
      </StyledSearchInputWrapper>
      {listening && <p>{listeningMessage}</p>}
    </>
  );
};

export default SearchInput;

const StyledSearchInputWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 8px;
  border-radius: 4px;
  font-size: 20px;
  width: 90%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

const StyledSearchInput = styled.input`
  padding: 8px;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  width: 90%;
  max-width: 300px;
  outline: none;
`;
