import styled, { css } from 'styled-components';
import { FacilitiesProps } from '../../../types/stationType';

const FacilitiesView = ({ facilities }: { facilities: FacilitiesProps }) => {
  console.log(facilities);

  const facilitiesData = [
    {
      title: '휠체어 리프트',
      name: 'wheelchairLift',
    },
    {
      title: '유아수유방',
      name: 'feedingRoom',
    },
    {
      title: '환전키오스크',
      name: 'currencyExchangeKiosk',
    },
    {
      title: '무인민원발급기',
      name: 'unmannedCivilApplicationIssuingMachine',
    },
    {
      title: '환승주차장',
      name: 'transitParkingLot',
    },
  ];

  return (
    <StyledFacilitiesView>
      <div className='updateDate'>0/00 0요일 00:00 업데이트 완료</div>
      <StyledFacilitiesBox>
        {facilitiesData.map((item) => (
          <StyledFacilitiesItem key={item.name} $isActive={facilities[item.name]}>
            <span className='checkBox'></span>
            {item.title}
            <span className='status'>{facilities[item.name] ? '사용가능' : '사용불가'}</span>
          </StyledFacilitiesItem>
        ))}
      </StyledFacilitiesBox>
    </StyledFacilitiesView>
  );
};

export default FacilitiesView;

const StyledFacilitiesView = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  padding-top: 60px;
  width: 100%;
  height: 100%;
  background-color: #fff;
  z-index: 50;

  & > .updateDate {
    height: 36px;
    padding: 11px 0;
    color: #cbd0d9;
    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 600;
    font-size: 12px;
    line-height: 14px;
    text-align: center;
  }
`;

const StyledFacilitiesBox = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const StyledFacilitiesItem = styled.li<{ $isActive: boolean }>`
  box-sizing: content-box;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 15px 20px;
  border-bottom: 1px solid #d9d9d9;

  &:first-child {
    padding-top: 8px;
  }

  & > .checkBox {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background-color: #d9d9d9;
  }

  & > .status {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: flex-start;
    padding: 5px 8px 4px;
    font-size: 12px;
    font-weight: bold;
    border-radius: 30px;

    ${({ $isActive }) => {
      return $isActive
        ? css`
            color: #4aa570;
            background: rgba(96, 208, 132, 0.3);
          `
        : css`
            color: #e56e73;
            background: rgba(229, 110, 115, 0.2);
          `;
    }}
  }
`;
