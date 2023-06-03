import styled from 'styled-components';
import SearchBar from '../Search/SearchBar';

const HomeSearchBar = () => {
  return (
    <StyledHomeSearchBarWrapper>
      <SearchBar placeholder='역이름을 입력해주세요.' listeningMessage='듣고 있어요' />
    </StyledHomeSearchBarWrapper>
  );
};

export default HomeSearchBar;

export const StyledHomeSearchBarWrapper = styled.div`
  width: 90%;
  display: flex;
  justify-content: center;
  align-content: center;
  margin: 125px 0px;
`;
