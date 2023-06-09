type StationColor = {
  [key: string]: { lineName: string | string; color: string };
};

export const STATION_LINE_COLORS: StationColor = {
  1: {
    lineName: '1호선',
    color: '#3B55AE',
  },
  2: {
    lineName: '2호선',
    color: '#3b9f37',
  },
  3: {
    lineName: '3호선',
    color: '#EF8F4C',
  },
  4: {
    lineName: '4호선',
    color: '#52B2E5',
  },
  5: {
    lineName: '5호선',
    color: '#884ED5',
  },
  6: {
    lineName: '6호선',
    color: '#A9622A',
  },
  7: {
    lineName: '7호선',
    color: '#73772B',
  },
  8: {
    lineName: '8호선',
    color: '#DD5794',
  },
  9: {
    lineName: '9호선',
    color: '#C7A54E',
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
