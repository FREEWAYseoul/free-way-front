import styled from 'styled-components';
import PageTitle from '../../common/PageTitle';

const HomePageTitle = () => {
  return (
    <StyledHomePageTitleWrapper id='homepage-title-container'>
      <PageTitle upperLine='엘레베이터가' lowerLine='궁금한 지하철역은?' />
    </StyledHomePageTitleWrapper>
  );
};

export default HomePageTitle;

const StyledHomePageTitleWrapper = styled.div`
  width: 85%;
`;
