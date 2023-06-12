import { ReactComponent as Line1 } from '../assets/lines/line-1.svg';
import { ReactComponent as Line2 } from '../assets/lines/line-2.svg';
import { ReactComponent as Line3 } from '../assets/lines/line-3.svg';
import { ReactComponent as Line4 } from '../assets/lines/line-4.svg';
import { ReactComponent as Line5 } from '../assets/lines/line-5.svg';
import { ReactComponent as Line6 } from '../assets/lines/line-6.svg';
import { ReactComponent as Line7 } from '../assets/lines/line-7.svg';
import { ReactComponent as Line8 } from '../assets/lines/line-8.svg';
import { ReactComponent as Line9 } from '../assets/lines/line-9.svg';
import { ReactComponent as LineK1 } from '../assets/lines/line-K1.svg';
import { ReactComponent as LineK4 } from '../assets/lines/line-K4.svg';
import { ReactComponent as LineD1 } from '../assets/lines/line-D1.svg';

export const modifyStatus = (status: string) => {
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

export const convertStationIdToSVG = (line: string | undefined) => {
  switch (line) {
    case '1':
      return Line1;
    case '2':
      return Line2;
    case '3':
      return Line3;
    case '4':
      return Line4;
    case '5':
      return Line5;
    case '6':
      return Line6;
    case '7':
      return Line7;
    case '8':
      return Line8;
    case '9':
      return Line9;
    case 'K1':
      return LineK1;
    case 'K4':
      return LineK4;
    case 'D1':
      return LineD1;
    default:
      return;
  }
};
