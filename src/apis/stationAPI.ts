import axios from 'axios';

const KAKAO_REST_KEY = 'af61b95c8bffb045cb0d212e309d64cd';

/**
 * station list
 */
export const fetchSearchStations = async () => {
  const res = await axios({
    method: 'get',
    url: '/api/stations/search',
  }).catch((e) => console.log(e));

  return res;
};

/**
 * local station list
 */
export const fetchLocalStation = async (x: number, y: number) => {
  const res = await axios({
    method: 'get',
    url: 'https://dapi.kakao.com/v2/local/search/category.json',
    headers: {
      Authorization: `KakaoAK ${KAKAO_REST_KEY}`,
    },
    params: {
      category_group_code: 'SW8',
      radius: 1500,
      x: x,
      y: y,
    },
  }).catch((e) => console.log(e));

  return res;
};

/**
 * station elevator list
 */
export const fetchElevators = async () => {
  const res = await axios({
    method: 'get',
    url: `/api/elevators`,
  }).catch((e) => console.log(e));

  return res;
};

/**
 * station detail
 */
export const fetchStation = async (title: string) => {
  const res = await axios({
    method: 'post',
    url: `/api/stations`,
    params: {
      stationName: title,
    },
  }).catch((e) => console.log(e));

  return res;
};
