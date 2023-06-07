type StationColor = {
  [key: string]: { lineId: number; color: string };
};

export const STATION_LINE_COLORS: StationColor = {
  1: {
    lineId: 1,
    color: '#0d347f',
  },
  2: {
    lineId: 2,
    color: '#3b9f37',
  },
  3: {
    lineId: 3,
    color: '#DD5C32',
  },
  4: {
    lineId: 4,
    color: '#3165a8',
  },
  5: {
    lineId: 5,
    color: '#703e8c',
  },
  6: {
    lineId: 6,
    color: '#904d23',
  },
  7: {
    lineId: 7,
    color: '#5b692e',
  },
  8: {
    lineId: 8,
    color: '#c82363',
  },
  9: {
    lineId: 9,
    color: '#b39627',
  },
} as const;
