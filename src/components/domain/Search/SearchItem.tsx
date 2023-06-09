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
import { FC, SVGProps, useEffect, useState } from 'react';

type SearchItemProps = {
  id?: string;
  name: string;
  status: string;
  line?: string;
};

type StyledElevatorStatusCircleProps = {
  status: string;
};

const SearchItem = ({ name, status, id }: SearchItemProps) => {
  const { handleAutofillClick } = useSearchContext();
  return (
    <SearchItemWrapper id={id} onClick={handleAutofillClick}>
      <Text>{name}</Text>
      <ElevatorStatusCircle status={status}>{status}</ElevatorStatusCircle>
      <StyledLineSVG />
    </SearchItemWrapper>
  );
};

export default SearchItem;

const SearchItemWrapper = styled.li`
  display: flex;
  align-items: center;
  padding-top: 12px;
  padding-bottom: 12px;
  position: relative;
  border-bottom: 1px solid rgba(217, 217, 217, 0.5);
  text-decoration: none;
  cursor: pointer;
`;

const ElevatorStatusCircle = styled.div<StyledElevatorStatusCircleProps>`
  width: 60px;
  height: 21px;
  border-radius: 30px;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  ${(props) => {
    switch (props.status) {
      case '사용 가능':
        return css`
          color: #4aa570;
          background-color: rgba(96, 208, 132, 0.3);
        `;
      case '일부 가능':
        return css`
          color: #eda54b;
          background-color: rgba(237, 165, 75, 0.3);
        `;
      case '사용 불가능':
        return css`
          color: #e56e73;
          background-color: rgba(229, 110, 115, 0.3);
        `;
    }
  }}
`;

const StyledLineSVG = styled(LineCircle)`
  position: absolute;
  right: 0;
`;

const Text = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  color: #495074;
  margin-right: 10px;
`;
