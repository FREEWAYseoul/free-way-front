type StationColor = {
  [key: string]: { lineId: number | string; color: string };
};

export const STATION_LINE_COLORS: StationColor = {
  1: {
    lineId: 1,
    color: '#3B55AE',
  },
  2: {
    lineId: 2,
    color: '#3b9f37',
  },
  3: {
    lineId: 3,
    color: '#EF8F4C',
  },
  4: {
    lineId: 4,
    color: '#52B2E5',
  },
  5: {
    lineId: 5,
    color: '#884ED5',
  },
  6: {
    lineId: 6,
    color: '#A9622A',
  },
  7: {
    lineId: 7,
    color: '#73772B',
  },
  8: {
    lineId: 8,
    color: '#DD5794',
  },
  9: {
    lineId: 9,
    color: '#C7A54E',
  },
  D1: {
    lineId: '신분당',
    color: '#BE4049',
  },
  K1: {
    lineId: '수인분당',
    color: '#F7D055',
  },
  K4: {
    lineId: '경의 중앙',
    color: '#82C9CB',
  },
} as const;
