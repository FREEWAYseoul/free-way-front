import styled, { css } from 'styled-components';
import { ReactComponent as Line1 } from '../../../assets/lines/line-1.svg';
import { ReactComponent as Line2 } from '../../../assets/lines/line-2.svg';
import { ReactComponent as Line3 } from '../../../assets/lines/line-3.svg';
import { ReactComponent as Line4 } from '../../../assets/lines/line-4.svg';
import { ReactComponent as Line5 } from '../../../assets/lines/line-5.svg';
import { ReactComponent as Line6 } from '../../../assets/lines/line-6.svg';
import { ReactComponent as Line7 } from '../../../assets/lines/line-7.svg';
import { ReactComponent as Line8 } from '../../../assets/lines/line-8.svg';
import { ReactComponent as Line9 } from '../../../assets/lines/line-9.svg';
import { ReactComponent as LineK1 } from '../../../assets/lines/line-K1.svg';
import { ReactComponent as LineK4 } from '../../../assets/lines/line-K4.svg';
import { ReactComponent as LineD1 } from '../../../assets/lines/line-D1.svg';

import useAutofill from '../../../hooks/useAutofill';
import { useEffect, useState } from 'react';

type SearchItemProps = {
  id?: string;
  name: string;
  status: string;
  line?: string;
  isFocus?: boolean;
};

type StyledStatusProps = {
  status: string;
};

const SearchItem = ({ name, status, id, line, isFocus }: SearchItemProps) => {
  const { handleAutofillClick } = useAutofill();
  // const [svg, setSVG] = useState<FC<SVGProps<SVGSVGElement>>>();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [svg, setSVG] = useState<any>();

  useEffect(() => {
    switch (line) {
      case '1':
        setSVG(Line1);
        return;
      case '2':
        setSVG(Line2);
        return;
      case '3':
        setSVG(Line3);
        return;
      case '4':
        setSVG(Line4);
        return;
      case '5':
        setSVG(Line5);
        return;
      case '6':
        setSVG(Line6);
        return;
      case '7':
        setSVG(Line7);
        return;
      case '8':
        setSVG(Line8);
        return;
      case '9':
        setSVG(Line9);
        return;
      case 'K1':
        setSVG(LineK1);
        return;
      case 'K4':
        setSVG(LineK4);
        return;
      case 'D1':
        setSVG(LineD1);
        return;
      default:
        throw new Error(`Invalid Line Id ${line}`);
    }
  }, [line]);

  const modifyStatus = (status: string) => {
    switch (status) {
      case '모두 사용 가능':
        return '사용가능';
      case '일부 사용 가능':
        return '일부가능';
      case '확인 불가':
        return '확인불가';
      case '모두 사용 불가능':
        return '사용불가능';
      default:
        console.error('Invalid station status');
    }
  };

  return (
    <SearchItemWrapper id={id} onClick={handleAutofillClick} isFocus={isFocus}>
      <SearchItemLeftSection>
        <Text>{name}</Text>
        <Status status={status}>{modifyStatus(status)}</Status>
      </SearchItemLeftSection>
      <SearchItemRightSection>
        <StyledLineSVG>{svg}</StyledLineSVG>
      </SearchItemRightSection>
    </SearchItemWrapper>
  );
};

export default SearchItem;

const SearchItemWrapper = styled.li<{ isFocus?: boolean }>`
  margin-bottom: 5px;

  width: 100%;
  height: 43px;
  padding: 10px 20px;

  display: grid;
  grid-template-columns: 3fr 1fr;

  cursor: pointer;
  &:hover {
    background-color: #edf5f5;
    cursor: pointer;
  }
  background-color: ${(props) => (props.isFocus ? '#edf5f5' : 'transparent')};
`;

const SearchItemLeftSection = styled.section`
  display: flex;
  align-items: center;
`;

const Text = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  color: #495074;
  margin-right: 6px;
`;

const Status = styled.div<StyledStatusProps>`
  width: max-content;
  padding: 4px 8px;
  height: 21px;
  border-radius: 30px;
  font-size: 12px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  ${(props) => {
    switch (props.status) {
      case '모두 사용 가능':
        return css`
          color: #4aa570;
          background-color: rgba(96, 208, 132, 0.3);
        `;
      case '일부 사용 가능':
        return css`
          color: #eda54b;
          background-color: rgba(237, 165, 75, 0.3);
        `;
      case '확인 불가':
        return css`
          color: #96a1b2;
          background-color: rgba(203, 208, 217, 0.4);
        `;
      case '모두 사용 불가능':
        return css`
          color: #e56e73;
          background-color: rgba(229, 110, 115, 0.2);
        `;
      default:
        console.error('Invalid station status');
    }
  }}
`;

const SearchItemRightSection = styled.section`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const StyledLineSVG = styled.div``;
