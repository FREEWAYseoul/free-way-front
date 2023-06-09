import { PropsWithChildren } from 'react';
import { ReactComponent as NotFoundIcon } from '../../../assets/icons/not-found.svg';
import SkeletonText from '../../common/SkeletonText';
import styled from 'styled-components';

const NotFound = ({ children }: PropsWithChildren) => {
  return (
    <Wrapper>
      <IconWrapper>
        <NotFoundIcon />
      </IconWrapper>
      <SkeletonText fontSize='20px'>{children}</SkeletonText>
    </Wrapper>
  );
};

export default NotFound;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
