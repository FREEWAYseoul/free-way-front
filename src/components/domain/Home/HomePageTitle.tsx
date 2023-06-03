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
  position: absolute;
  left: 5.33%;
  right: 5.33%;
  top: 15.16%;
  bottom: 61.97%;
`;
