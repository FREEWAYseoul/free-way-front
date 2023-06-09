import { PropsWithChildren } from 'react';
import styled from 'styled-components';

type Props = {
  fontSize?: string;
} & PropsWithChildren;

type Text = {
  fontSize: string;
};

const SkeletonText = ({ children, fontSize = '16px' }: Props) => {
  return <Text fontSize={fontSize}>{children}</Text>;
};

export default SkeletonText;

const Text = styled.div<Text>`
  width: 375px;
  height: 50px;

  display: flex;
  justify-content: center;
  align-items: center;

  color: #96a1b2;
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 600;
  font-size: ${(props) => props.fontSize};
  line-height: 19px;
`;
