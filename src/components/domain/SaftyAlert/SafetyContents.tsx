import styled from 'styled-components';
import SafetyAlertBox from './SafetyAlertBox';
import { SafetyAlertProps } from '../../../types/alertType';

const alertDatas: SafetyAlertProps[] = [
  {
    date: '2023년 6월 8일 목요일',
    contents: [
      {
        date: '오후 13:11',
        title: '[6월 8일 서울월드컵경기장 대규모 종교행사, 지하철 혼잡 주의]',
        description:
          '6월 8일(목) 서울월드컵경기장에서 대규모 종교행사가 예정되어 있습니다. 6호선 월드컵경기장역, 마포구청역, 디지털미디어시티역 주변이 다소 혼잡할 수 있으니 이 점 참고하여 열차를 이용해 주시기 바랍니다.',
      },
      {
        date: '오전 10:27',
        title: '[5호선 왕십리역 신호장애 양방향 지연]',
        description:
          '현재 5호선 왕십리역 신호장애로 양방향 지연이 발생할 수 있습니다. 빠르게 조치하도록 노력하겠습니다. 열차 이용에 불편을 드려 대단히 죄송합니다.',
      },
    ],
  },
  {
    date: '2023년 6월 7일 수요일',
    contents: [
      {
        date: '오후 16:49',
        title: '[4호선 당고개역 상선(진접) 신호장애 서행 운전]',
        description:
          '현재 4호선 당고개역 상선(진접 방향) 신호장애로 서행 운전 중입니다. 오늘 영업 종료 후 조치 예정으로 내일 첫차 이용부터는 불편이 없도록 조치하겠습니다. 열차 이용에 불편을 드려 대단히 죄송합니다.',
      },
    ],
  },
];

const SafetyContents = () => {
  return (
    <StyledContents>
      {alertDatas.map((info) => (
        <SafetyAlertBox key={info.date} info={info} />
      ))}
    </StyledContents>
  );
};

export default SafetyContents;

const StyledContents = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  height: calc(100% - 50px);
  padding-bottom: 80px;
  overflow: auto;

  &::-webkit-scrollbar {
    display: none;
  }
`;
