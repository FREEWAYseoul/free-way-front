import styled from 'styled-components';

type PageTitleProps = {
  upperLine: string;
  lowerLine: string;
};

const PageTitle = ({ upperLine, lowerLine }: PageTitleProps) => {
  return (
    <TitleWrapper>
      <Text>{upperLine}</Text>
      <Text>{lowerLine}</Text>
    </TitleWrapper>
  );
};

export default PageTitle;

export const TitleWrapper = styled.div``;

export const Text = styled.div`
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 700;
  font-size: 1.8em;
  line-height: 30px;
  margin-bottom: 10px;
`;
