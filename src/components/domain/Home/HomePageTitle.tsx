import styled from 'styled-components';
import PageTitle from '../../common/PageTitle';

const HomePageTitle = () => {
  return (
    <StyledHomePageTitleWrapper>
      <PageTitle upperLine='엘리베이터가' lowerLine='궁금한 지하철역은?' />
    </StyledHomePageTitleWrapper>
  );
};

export default HomePageTitle;

const StyledHomePageTitleWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  padding: 0 24px;
`;
