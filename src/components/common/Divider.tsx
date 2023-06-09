import styled from 'styled-components';

const Divider = () => {
  return <StyledDivider />;
};

export default Divider;

const StyledDivider = styled.div`
  width: 375px;
  height: 0px;

  opacity: 0.5;
  border: 1px solid #d9d9d9;
`;
