import styled, { css } from 'styled-components';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useSearchBar from '../../../hooks/useSearchBar';
import { convertStationIdToSVG, modifyStatus } from '../../../utils/station';

type SearchItemProps = {
  id?: string;
  name: string;
  status: string;
  line?: string;
  isFocus?: boolean;
  type?: 'homepage' | 'searchpage';
};

type StyledStatusProps = {
  status: string;
};

const SearchItem = ({ name, status, id, line, isFocus, type }: SearchItemProps) => {
  // const [svg, setSVG] = useState<FC<SVGProps<SVGSVGElement>>>();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [svg, setSVG] = useState<any>();

  const { selectStationById, saveStation } = useSearchBar();
  const navigate = useNavigate();

  const handleClick = (
    e: React.MouseEvent<HTMLLIElement, MouseEvent> | React.KeyboardEvent<HTMLLIElement>
  ) => {
    const selectedStation = selectStationById(e.currentTarget.id);
    if (!selectedStation) return;
    saveStation(selectedStation);
    navigate('/result');
  };

  useEffect(() => {
    setSVG(convertStationIdToSVG(line));
  }, [line]);

  return (
    <SearchItemWrapper id={id} onClick={handleClick} isFocus={isFocus} type={type}>
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

const SearchItemWrapper = styled.li<{ isFocus?: boolean; type?: 'homepage' | 'searchpage' }>`
  margin-bottom: 5px;

  width: 100%;
  max-width: 375px;
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

  border-bottom: ${(props) => props.type === 'searchpage' && '1px solid rgba(217, 217, 217,0.5)'};
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
