import styled from 'styled-components';
import SkeletonItem from '../../common/SkeletonItem';
import SkeletonText from '../../common/SkeletonText';
import Divider from '../../common/Divider';

const SearchLoading = () => {
  return (
    <LoadingWrapper id='search-loading-wrapper'>
      <SkeletonText>검색결과를 가져오고 있어요.</SkeletonText>
      <Divider />
      {temp.map((_, idx) => (
        <SkeletonItem key={idx} />
      ))}
    </LoadingWrapper>
  );
};

export default SearchLoading;

const temp = [1, 2, 3, 4, 5];

const LoadingWrapper = styled.div`
  width: 100%;
  min-height: 275px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
