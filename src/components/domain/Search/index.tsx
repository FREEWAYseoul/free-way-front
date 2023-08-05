import { useEffect, useState } from 'react';
import styled from 'styled-components';
import SearchBar from './SearchBar';
import { useSearchContext } from './SearchContext';
import { useStation } from '../../../api/stations';
import useSearchBar from '../../../hooks/useSearchBar';
import SearchLoading from './SearchLoading';
import ProgressBar from '../../common/ProgressBar';
import useMic from '../../../hooks/useMic';
import useLocalStorage from '../../../hooks/useLocalStorage';

const Search = () => {
  const { keywords, setFilteredStations } = useSearchContext();
  const { getFilteredStations, focusOnSearchInput, convertKeywordsToContent } = useSearchBar();
  const { data, isLoading } = useStation();
  const { startListening, endListening } = useMic();
  const { displaySearchHistoryInOrder } = useLocalStorage();

  const [isListening, setIsListening] = useState(false);
  const content = convertKeywordsToContent(keywords, isListening);

  const handleClick = () => {
    if (isListening) {
      setIsListening((prev) => !prev);
      endListening();
    } else {
      setIsListening((prev) => !prev);
      startListening();
    }
  };

  useEffect(() => {
    displaySearchHistoryInOrder();

    if (keywords) {
      const filteredStations = getFilteredStations(keywords);
      setFilteredStations(filteredStations);
    }

    focusOnSearchInput();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keywords, data, displaySearchHistoryInOrder]);

  return (
    <SearchWrapper id='search-container'>
      <SearchBar
        placeholder='역이름을 입력해주세요.'
        listeningMessage='듣고 있습니다! 역이름을 말해주세요.'
        handleClick={handleClick}
      />
      <DropdownBox>
        {isLoading ? (
          <SkeletonWrapper>
            <ProgressBar />
            <SearchLoading />
          </SkeletonWrapper>
        ) : (
          <>{content}</>
        )}
      </DropdownBox>
    </SearchWrapper>
  );
};

export default Search;

const SearchWrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: #f2f4f6;
`;

const DropdownBox = styled.div`
  margin-top: 15px;
  max-height: 50%;
  padding-right: 16px;
  padding-left: 20px;

  width: 100%;
`;

const SkeletonWrapper = styled.div`
  margin-top: -15px;
`;
