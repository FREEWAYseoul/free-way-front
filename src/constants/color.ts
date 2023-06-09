type StationColor = {
  [key: string]: { lineName: string; color: string };
};

export const STATION_LINE_COLORS: StationColor = {
  1: {
    lineName: '1호선',
    color: '#0d347f',
  },
  2: {
    lineName: '2호선',
    color: '#3b9f37',
  },
  3: {
    lineName: '3호선',
    color: '#DD5C32',
  },
  4: {
    lineName: '4호선',
    color: '#3165a8',
  },
  5: {
    lineName: '5호선',
    color: '#703e8c',
  },
  6: {
    lineName: '6호선',
    color: '#904d23',
  },
  7: {
    lineName: '7호선',
    color: '#5b692e',
  },
  8: {
    lineName: '8호선',
    color: '#c82363',
  },
  9: {
    lineName: '9호선',
    color: '#b39627',
  },
  D1: {
    lineName: '신분당선',
    color: '#BE4049',
  },
  K1: {
    lineName: '수인분당선',
    color: '#F7D055',
  },
  K4: {
    lineName: '경의중앙선',
    color: '#82C9CB',
  },
} as const;
